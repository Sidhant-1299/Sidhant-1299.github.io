import { Suspense, lazy, useEffect, useState } from 'react'

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

function getPathname() {
  return window.location.pathname || '/'
}

function App() {
  const [pathname, setPathname] = useState(getPathname)

  useEffect(() => {
    function handlePopState() {
      setPathname(getPathname())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(event, href) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()

    if (href !== pathname) {
      window.history.pushState({}, '', href)
      setPathname(href)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-0)] text-[var(--text-0)] selection:bg-[var(--accent-red)]/40 selection:text-[var(--text-0)]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(140,56,54,0.18),transparent_34rem),linear-gradient(180deg,rgba(35,29,28,0.72),transparent_24rem)]" />
      <header className="sticky top-0 z-50 border-b border-[var(--line-0)] bg-[var(--bg-0)]/72 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-10 lg:px-16" aria-label="Primary navigation">
          <a
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-sm font-semibold tracking-tight text-[var(--text-0)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)] sm:min-w-0 sm:justify-start"
            href="/"
            onClick={(event) => navigate(event, '/')}
          >
            <span className="sm:hidden">SRK</span>
            <span className="hidden sm:inline">Sidhant Raj Khati</span>
          </a>
          <div className="flex items-center gap-1 rounded-full border border-[var(--line-0)] bg-[var(--bg-1)]/70 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <a
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-11 items-center rounded-full px-2.5 py-2 text-xs font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-1)] md:px-4 ${
                    isActive
                      ? 'bg-[var(--bg-2)] text-[var(--text-0)]'
                      : 'text-[var(--text-2)] hover:text-[var(--text-0)]'
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={(event) => navigate(event, item.href)}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </nav>
      </header>

      <Suspense fallback={<RouteLoading />}>
        {pathname === '/' && <Home />}
        {pathname === '/work' && <Work />}
        {pathname === '/academic' && <Academic />}
        {pathname === '/about' && <About />}
        {pathname.startsWith('/projects/') && <ProjectDetail slug={pathname.replace('/projects/', '')} />}
        {!['/', '/work', '/academic', '/about'].includes(pathname) && !pathname.startsWith('/projects/') && <NotFound />}
      </Suspense>
    </div>
  )
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
