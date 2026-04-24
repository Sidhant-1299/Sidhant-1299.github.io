import mePoster from '../assets/me.jpg'

function Home() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-[1fr_0.82fr] md:px-10 md:py-24 lg:px-16">
      <section className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Data science / analytics / systems</p>
        <h1
          aria-label="Sidhant Raj Khati"
          className="mt-6 max-w-[9.4ch] text-[clamp(4rem,12.5vw,9rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[var(--text-0)]"
        >
          <span className="block">Sidhant</span>
          <span className="block pl-[0.08em] text-[var(--text-1)]">Raj Khati</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[var(--text-1)] md:text-lg md:leading-8">
          Building a cinematic portfolio for data-led projects, academic proof, and carefully composed technical work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">
          <span>Toronto Area</span>
          <span className="text-[var(--line-1)]">/</span>
          <span>Updated 2026</span>
          <span className="text-[var(--line-1)]">/</span>
          <span>Open to focused work</span>
        </div>
      </section>

      <aside className="relative mx-auto w-full max-w-md md:max-w-none" aria-label="Portrait poster">
        <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_20%,rgba(140,56,54,0.26),transparent_62%)] blur-2xl" />
        <figure className="relative overflow-hidden rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)] shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
          <img
            alt="Sidhant Raj Khati seated in a warm low-light interior"
            className="aspect-[4/5] h-full w-full object-cover saturate-[0.85]"
            decoding="async"
            fetchPriority="high"
            src={mePoster}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(18,16,16,0.72))]" />
          <figcaption className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[var(--bg-0)]/50 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--text-1)] backdrop-blur-md">
            <span>Poster Study</span>
            <span>01</span>
          </figcaption>
        </figure>
      </aside>
    </main>
  )
}

export default Home
