import { Suspense, createElement, lazy, startTransition, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useRouteGestures from './hooks/useRouteGestures.js'

const primaryPageLoaders = {
  '/': () => import('./pages/Home.jsx'),
  '/work': () => import('./pages/Work.jsx'),
  '/academic': () => import('./pages/Academic.jsx'),
  '/about': () => import('./pages/About.jsx'),
}
const loadedPrimaryPages = new Map()
const primaryPagePromises = new Map()

function loadPrimaryPage(pathname) {
  if (!primaryPagePromises.has(pathname)) {
    const promise = primaryPageLoaders[pathname]().then((module) => {
      loadedPrimaryPages.set(pathname, createElement(module.default))
      return module
    })
    primaryPagePromises.set(pathname, promise)
    // Permit a later navigation to retry a failed prefetch.
    promise.catch(() => primaryPagePromises.delete(pathname))
  }
  return primaryPagePromises.get(pathname)
}

const Home = lazy(() => loadPrimaryPage('/'))
const Work = lazy(() => loadPrimaryPage('/work'))
const Academic = lazy(() => loadPrimaryPage('/academic'))
const About = lazy(() => loadPrimaryPage('/about'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/academic', label: 'Academic' },
  { href: '/about', label: 'About' },
]

const routeOrder = ['/', '/work', '/academic', '/about']
const routeTransitionDuration = 560
const carouselTransitionDuration = 280

function getPathname() {
  return window.location.pathname || '/'
}

function getRouteRank(pathname) {
  if (pathname.startsWith('/projects/')) {
    return routeOrder.indexOf('/work') + 0.5
  }

  const routeIndex = routeOrder.indexOf(pathname)
  return routeIndex === -1 ? routeOrder.length : routeIndex
}

function getRouteDirection(fromPathname, toPathname) {
  return getRouteRank(toPathname) >= getRouteRank(fromPathname) ? 'forward' : 'back'
}

function createRouteFrame(currentFrame, nextPathname, metadata = {}) {
  if (nextPathname === currentFrame.pathname) {
    return currentFrame
  }

  return {
    pathname: nextPathname,
    exitingPathname: currentFrame.pathname,
    direction: getRouteDirection(currentFrame.pathname, nextPathname),
    transitionId: currentFrame.transitionId + 1,
    dragOffset: metadata.dragOffset || 0,
    outgoingScrollY: metadata.outgoingScrollY || 0,
    duration: routeOrder.includes(currentFrame.pathname) && routeOrder.includes(nextPathname) ? carouselTransitionDuration : routeTransitionDuration,
  }
}

function isNavItemActive(href, pathname) {
  if (href === '/work') {
    return pathname === '/work' || pathname.startsWith('/projects/')
  }

  return pathname === href
}

function App() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const hintNavigationTimeRef = useRef(-Infinity)
  const [routeFrame, setRouteFrame] = useState(() => ({
    pathname: getPathname(),
    exitingPathname: null,
    direction: 'forward',
    transitionId: 0,
    dragOffset: 0,
    outgoingScrollY: 0,
    duration: routeTransitionDuration,
  }))

  const pathname = routeFrame.pathname
  const primaryRouteIndex = routeOrder.indexOf(pathname)
  const activeNavIndex = navItems.findIndex((item) => isNavItemActive(item.href, pathname))

  useEffect(() => {
    if (primaryRouteIndex === -1) return
    // Warm the small page modules in parallel; first-time swipes should reveal
    // actual content, not spend their transition animating a loading frame.
    for (const route of routeOrder) loadPrimaryPage(route).catch(() => {})
  }, [primaryRouteIndex])

  useEffect(() => {
    function handlePopState() {
      const outgoingScrollY = window.scrollY
      startTransition(() => {
        setRouteFrame((currentFrame) => createRouteFrame(currentFrame, getPathname(), { outgoingScrollY }))
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useLayoutEffect(() => {
    if (routeFrame.transitionId) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [routeFrame.transitionId])

  useEffect(() => {
    if (!routeFrame.exitingPathname) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setRouteFrame((currentFrame) => {
        if (currentFrame.transitionId !== routeFrame.transitionId) {
          return currentFrame
        }

        return { ...currentFrame, exitingPathname: null }
      })
    }, routeFrame.duration)

    return () => window.clearTimeout(timeoutId)
  }, [routeFrame.exitingPathname, routeFrame.transitionId, routeFrame.duration])

  function navigateTo(href, metadata = {}) {
    if (href === pathname) {
      return
    }

    window.history.pushState({}, '', href)
    const transitionMetadata = { outgoingScrollY: window.scrollY, ...metadata }
    startTransition(() => {
      setRouteFrame((currentFrame) => createRouteFrame(currentFrame, href, transitionMetadata))
    })
  }

  function navigateFromHint(index) {
    if (routeFrame.exitingPathname || primaryRouteIndex === -1 || !navItems[index] || performance.now() - hintNavigationTimeRef.current < carouselTransitionDuration) {
      return
    }

    hintNavigationTimeRef.current = performance.now()
    navigateTo(navItems[index].href)
  }

  useRouteGestures({
    rootRef,
    stageRef,
    pathname,
    routes: routeOrder,
    transitioning: Boolean(routeFrame.exitingPathname),
    navigate: navigateTo,
    duration: carouselTransitionDuration,
  })

  function handleRouteClick(event) {
    if (event.defaultPrevented || event.button !== 0) {
      return
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    if (!(event.target instanceof Element)) {
      return
    }

    const anchor = event.target.closest('a[href]')

    if (!anchor || anchor.target || anchor.hasAttribute('download')) {
      return
    }

    const url = new URL(anchor.href)

    if (url.origin !== window.location.origin || url.hash) {
      return
    }

    event.preventDefault()

    navigateTo(`${url.pathname}${url.search}`)
  }

  return (
    <div ref={rootRef} data-route-gestures={primaryRouteIndex !== -1 ? 'true' : undefined} className="app-root min-h-screen bg-[var(--bg-0)] text-[var(--text-0)] selection:bg-[var(--accent-red)]/40 selection:text-[var(--text-0)]" onClickCapture={handleRouteClick}>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(140,56,54,0.18),transparent_34rem),linear-gradient(180deg,rgba(35,29,28,0.72),transparent_24rem)]" />
      <header className="sticky top-0 z-50 border-b border-[var(--line-0)] bg-[var(--bg-0)]/72 shadow-[0_12px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-[background,border-color,box-shadow] duration-300">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-10 lg:px-16" aria-label="Primary navigation">
          <a
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-sm font-semibold tracking-tight text-[var(--text-0)] outline-none transition-[color,transform] duration-300 hover:text-[var(--accent-ivory)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)] sm:min-w-0 sm:justify-start"
            href="/"
          >
            Sidhant Raj Khati
          </a>
          <div className="nav-pill relative isolate hidden w-[23rem] grid-cols-4 overflow-hidden rounded-full border border-[var(--line-0)] bg-[var(--bg-1)]/70 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.28)] sm:grid">
            <span
              className="nav-active-pill absolute bottom-1 top-1 -z-10 rounded-full border border-white/5 bg-[var(--bg-2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_24px_rgba(0,0,0,0.24)]"
              style={{ opacity: activeNavIndex === -1 ? 0 : 1, transform: `translateX(${activeNavIndex * 100}%)` }}
            />
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.href, pathname)

              return (
                <a
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative z-10 flex min-h-11 items-center justify-center rounded-full px-3 py-2 text-xs font-medium outline-none transition-[color,transform] duration-300 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-1)] ${
                    isActive
                      ? 'text-[var(--text-0)]'
                      : 'text-[var(--text-2)] hover:text-[var(--text-0)] active:text-[var(--text-0)]'
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </nav>
        {primaryRouteIndex !== -1 ? (
          <div className="route-discovery-cue mx-auto max-w-7xl px-3 sm:px-4 md:px-10 lg:px-16" aria-hidden="true">
            <p><span className="sm:hidden">← Swipe across content →</span><span className="hidden sm:inline">← Drag imagery or scroll sideways →</span></p>
          </div>
        ) : null}
      </header>

      <nav className="route-dock sm:hidden" aria-label="Primary mobile navigation">
        <div className="grid grid-cols-4 overflow-hidden rounded-full border border-[var(--line-0)] bg-[var(--bg-1)]/88 p-1 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = isNavItemActive(item.href, pathname)

            return (
              <a
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex min-h-12 items-center justify-center rounded-full px-2 text-[0.68rem] font-medium tracking-tight outline-none transition-[background,color,transform] duration-300 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-1)] ${
                  isActive
                    ? 'bg-[var(--bg-2)] text-[var(--text-0)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
                    : 'text-[var(--text-2)] hover:bg-[var(--bg-2)]/60 hover:text-[var(--text-0)] active:text-[var(--text-0)]'
                }`}
                href={item.href}
                key={item.href}
              >
                <span>{item.label}</span>
                <span className={`absolute bottom-2 h-px w-5 rounded-full transition duration-300 ${isActive ? 'bg-[var(--accent-red)] opacity-100' : 'bg-transparent opacity-0'}`} aria-hidden="true" />
              </a>
            )
          })}
        </div>
      </nav>

      <div
        ref={stageRef}
        id="route-stage"
        className="route-stage"
        data-direction={routeFrame.direction}
        data-home={pathname === '/' ? 'true' : undefined}
        data-top-level={routeOrder.includes(pathname) ? 'true' : undefined}
        data-transition={routeOrder.includes(pathname) && routeOrder.includes(routeFrame.exitingPathname) ? 'horizontal' : undefined}
        style={{ '--route-drag-start': `${routeFrame.dragOffset}px`, '--route-settle-duration': `${routeFrame.duration}ms` }}
      >
        {routeFrame.exitingPathname ? (
          <div className="route-layer route-layer-exit" style={{ top: -routeFrame.outgoingScrollY }} inert aria-hidden="true" key={`exit-${routeFrame.exitingPathname}-${routeFrame.transitionId}`}>
            <Suspense fallback={<RouteLoading />}>
              <RouteContent pathname={routeFrame.exitingPathname} />
            </Suspense>
          </div>
        ) : null}
        <div className={routeFrame.exitingPathname ? 'route-layer route-layer-enter' : 'route-layer'} key={`enter-${pathname}-${routeFrame.transitionId}`}>
          <Suspense fallback={<RouteLoading />}>
            <RouteContent pathname={pathname} />
          </Suspense>
        </div>
      </div>
      {primaryRouteIndex !== -1 ? (
        <div className="route-hint-shell">
          <RouteHint index={primaryRouteIndex} transitioning={Boolean(routeFrame.exitingPathname)} onNavigate={navigateFromHint} />
        </div>
      ) : null}
    </div>
  )
}

function RouteHint({ index, transitioning, onNavigate }) {
  // Keep unavailable end arrows focusable so reaching an endpoint does not
  // drop keyboard focus and prevent immediate reversal with the arrow keys.
  function handleKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      return
    }

    event.preventDefault()
    onNavigate(index + (event.key === 'ArrowRight' ? 1 : -1))
  }

  return (
    <section className="route-hint" aria-label="Explore portfolio pages" aria-describedby="route-hint-instructions" onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="route-hint-arrow"
        aria-label={index > 0 ? `Previous page: ${navItems[index - 1].label}` : 'Previous page (start of portfolio)'}
        aria-controls="route-stage"
        aria-disabled={transitioning || index === 0}
        onClick={() => onNavigate(index - 1)}
      >
        <span aria-hidden="true">←</span>
      </button>
      <div className="route-hint-center">
        <div className="route-hint-status" role="status" aria-live="polite" aria-atomic="true">
          <span aria-hidden="true" className="route-hint-index">{String(index + 1).padStart(2, '0')} / {String(navItems.length).padStart(2, '0')}</span>
          <span className="sr-only">Page {index + 1} of {navItems.length}: </span>
          <span className="sr-only sm:not-sr-only">{navItems[index].label}</span>
        </div>
        <div className="route-hint-marks" aria-hidden="true">
          {navItems.map((item, markIndex) => <span key={item.href} data-active={markIndex === index ? 'true' : undefined} />)}
        </div>
        <p id="route-hint-instructions" className="route-hint-instructions">
          <span className="hidden sm:inline">Drag imagery or scroll sideways</span>
          <span className="sm:hidden">Swipe across content</span>
          <span className="sr-only">. Use the previous and next buttons, or left and right arrow keys while focused here, to explore the four pages.</span>
        </p>
      </div>
      <button
        type="button"
        className="route-hint-arrow"
        aria-label={index < navItems.length - 1 ? `Next page: ${navItems[index + 1].label}` : 'Next page (end of portfolio)'}
        aria-controls="route-stage"
        aria-disabled={transitioning || index === navItems.length - 1}
        onClick={() => onNavigate(index + 1)}
      >
        <span aria-hidden="true">→</span>
      </button>
    </section>
  )
}

function RouteContent({ pathname }) {
  const loadedPage = loadedPrimaryPages.get(pathname)
  if (loadedPage) return loadedPage

  if (pathname === '/') {
    return <Home />
  }

  if (pathname === '/work') {
    return <Work />
  }

  if (pathname === '/academic') {
    return <Academic />
  }

  if (pathname === '/about') {
    return <About />
  }

  if (pathname.startsWith('/projects/')) {
    return <ProjectDetail slug={pathname.replace('/projects/', '')} />
  }

  return <NotFound />
}

function RouteLoading() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-3 py-20 sm:px-4 md:px-10 lg:px-16">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Loading frame</p>
    </main>
  )
}

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-3 py-20 sm:px-4 md:px-10 lg:px-16">
      <section className="max-w-xl rounded-3xl border border-[var(--line-0)] bg-[var(--bg-1)]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-0)]">This frame does not exist.</h1>
        <p className="mt-4 leading-7 text-[var(--text-1)]">Use the navigation to return to the portfolio routes.</p>
      </section>
    </main>
  )
}

export default App
