function Work() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Selected projects</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.07em] text-[var(--text-0)] md:text-7xl">Recent work</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-1)]">
          The project field is ready for the Kirschberg-inspired card rhythm: lead card, paired rows, and one asymmetric break.
        </p>
      </section>
      <section className="mt-16 rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/70 p-8 text-[var(--text-1)] shadow-[0_20px_60px_rgba(0,0,0,0.32)] md:p-12">
        Work cards land in the next feature slice.
      </section>
    </main>
  )
}

export default Work
