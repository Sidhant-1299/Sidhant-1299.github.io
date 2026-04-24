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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pathname = routeFrame.pathname
  const activeNavIndex = navItems.findIndex((item) => isNavItemActive(item.href, pathname))

  useEffect(() => {
    function handlePopState() {
      startTransition(() => {
        setRouteFrame((currentFrame) => createRouteFrame(currentFrame, getPathname()))
      })
      setIsMobileMenuOpen(false)
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

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  function navigateTo(href) {
    if (href === pathname) {
      setIsMobileMenuOpen(false)
      return
    }

    window.history.pushState({}, '', href)
    startTransition(() => {
      setRouteFrame((currentFrame) => createRouteFrame(currentFrame, href))
    })
    setIsMobileMenuOpen(false)
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

  function toggleMobileMenu() {
    setIsMobileMenuOpen((isOpen) => !isOpen)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-0)] text-[var(--text-0)] selection:bg-[var(--accent-red)]/40 selection:text-[var(--text-0)]" onClickCapture={handleRouteClick}>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(140,56,54,0.18),transparent_34rem),linear-gradient(180deg,rgba(35,29,28,0.72),transparent_24rem)]" />
      <header className="sticky top-0 z-50 border-b border-[var(--line-0)] bg-[var(--bg-0)]/72 shadow-[0_12px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-[background,border-color,box-shadow] duration-300">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-10 lg:px-16" aria-label="Primary navigation">
          <button
            aria-controls="mobile-primary-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="group flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--line-0)] bg-[var(--bg-1)]/78 text-[var(--text-0)] shadow-[0_10px_30px_rgba(0,0,0,0.24)] outline-none transition-[transform,border-color,background,box-shadow] duration-300 active:scale-95 active:border-[var(--line-1)] active:bg-[var(--bg-2)] focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)] sm:hidden"
            onClick={toggleMobileMenu}
            type="button"
          >
            <span className="relative h-3.5 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-5 rounded-full bg-current transition duration-300 ${isMobileMenuOpen ? 'translate-y-[6px] rotate-45' : 'group-active:translate-y-0.5'}`} />
              <span className={`absolute left-0 top-[6px] h-px w-5 rounded-full bg-current transition duration-200 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute bottom-0 left-0 h-px w-5 rounded-full bg-current transition duration-300 ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : 'group-active:-translate-y-0.5'}`} />
            </span>
          </button>
          <a
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-full text-sm font-semibold tracking-tight text-[var(--text-0)] outline-none transition-[color,transform] duration-300 hover:text-[var(--accent-ivory)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)] sm:flex sm:min-w-0 sm:justify-start"
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
        <div
          aria-hidden={!isMobileMenuOpen}
          className={`mobile-menu-panel mx-3 overflow-hidden rounded-[1.5rem] border border-[var(--line-0)] bg-[var(--bg-1)]/88 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-[opacity,transform,max-height,margin-bottom] duration-300 sm:hidden ${
            isMobileMenuOpen ? 'mb-3 max-h-80 opacity-100' : 'pointer-events-none mb-0 max-h-0 -translate-y-2 opacity-0'
          }`}
          id="mobile-primary-navigation"
          role="navigation"
        >
          <div className="grid gap-1 p-1.5">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.href, pathname)

              return (
                <a
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-12 items-center justify-between rounded-[1.15rem] px-4 text-sm font-medium outline-none transition-[background,color,transform,border-color] duration-300 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-1)] ${
                    isActive
                      ? 'bg-[var(--bg-2)] text-[var(--text-0)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
                      : 'text-[var(--text-2)] hover:bg-[var(--bg-2)]/60 hover:text-[var(--text-0)] active:bg-[var(--bg-2)] active:text-[var(--text-0)]'
                  }`}
                  href={item.href}
                  key={item.href}
                  tabIndex={isMobileMenuOpen ? undefined : -1}
                >
                  <span>{item.label}</span>
                  <span className={`h-1.5 w-1.5 rounded-full transition duration-300 ${isActive ? 'bg-[var(--accent-red)]' : 'bg-[var(--line-1)] opacity-50'}`} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>
      </header>

      <div className="route-stage" data-direction={routeFrame.direction}>
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
