import { Suspense, lazy, startTransition, useEffect, useState } from 'react'

const Home = lazy(() => import('./pages/Home.jsx'))
const Work = lazy(() => import('./pages/Work.jsx'))
const Academic = lazy(() => import('./pages/Academic.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/academic', label: 'Academic' },
  { href: '/about', label: 'About' },
]

const routeOrder = ['/', '/work', '/academic', '/about']
const routeTransitionDuration = 560

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

function createRouteFrame(currentFrame, nextPathname) {
  if (nextPathname === currentFrame.pathname) {
    return currentFrame
  }

  return {
    pathname: nextPathname,
    exitingPathname: currentFrame.pathname,
    direction: getRouteDirection(currentFrame.pathname, nextPathname),
    transitionId: currentFrame.transitionId + 1,
  }
}

function isNavItemActive(href, pathname) {
  if (href === '/work') {
    return pathname === '/work' || pathname.startsWith('/projects/')
  }

  return pathname === href
}

function App() {
  const [routeFrame, setRouteFrame] = useState(() => ({
    pathname: getPathname(),
    exitingPathname: null,
    direction: 'forward',
    transitionId: 0,
  }))

  const pathname = routeFrame.pathname
  const activeNavIndex = navItems.findIndex((item) => isNavItemActive(item.href, pathname))

  useEffect(() => {
    function handlePopState() {
      startTransition(() => {
        setRouteFrame((currentFrame) => createRouteFrame(currentFrame, getPathname()))
      })
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

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
    }, routeTransitionDuration)

    return () => window.clearTimeout(timeoutId)
  }, [routeFrame.exitingPathname, routeFrame.transitionId])

  function navigateTo(href) {
    if (href === pathname) {
      return
    }

    window.history.pushState({}, '', href)
    startTransition(() => {
      setRouteFrame((currentFrame) => createRouteFrame(currentFrame, href))
    })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

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
    <div className="min-h-screen bg-[var(--bg-0)] text-[var(--text-0)] selection:bg-[var(--accent-red)]/40 selection:text-[var(--text-0)]" onClickCapture={handleRouteClick}>
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
      </header>

      <nav className="fixed inset-x-3 z-50 sm:hidden bottom-[calc(0.75rem+env(safe-area-inset-bottom))]" aria-label="Primary mobile navigation">
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

      <div className="route-stage pb-[calc(5.75rem+env(safe-area-inset-bottom))] sm:pb-0" data-direction={routeFrame.direction}>
        {routeFrame.exitingPathname ? (
          <div className="route-layer route-layer-exit" key={`exit-${routeFrame.exitingPathname}-${routeFrame.transitionId}`}>
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
    </div>
  )
}

function RouteContent({ pathname }) {
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
