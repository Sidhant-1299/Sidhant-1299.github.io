function Academic() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">
      <section className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Education / credentials / tools</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.07em] text-[var(--text-0)] md:text-7xl">Academic</h1>
        </div>
        <p className="max-w-2xl text-base leading-7 text-[var(--text-1)] md:justify-self-end">
          This route will hold education, certifications, skills, and tools as proof of technical direction. It is not an archive page.
        </p>
      </section>
      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {['Education', 'Certifications', 'Skills + tools'].map((label) => (
          <article className="rounded-3xl border border-[var(--line-0)] bg-[var(--bg-1)]/70 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)]" key={label}>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">Coming next</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text-0)]">{label}</h2>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Academic
