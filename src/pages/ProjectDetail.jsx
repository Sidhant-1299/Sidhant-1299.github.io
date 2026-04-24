function ProjectDetail({ slug }) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6 py-20 md:px-10 lg:px-16">
      <section className="max-w-2xl rounded-3xl border border-[var(--line-0)] bg-[var(--bg-1)]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Project detail</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-0)]">{slug || 'Untitled project'}</h1>
        <p className="mt-4 leading-7 text-[var(--text-1)]">
          The editorial case-study template will be built after the Work card system defines the project data.
        </p>
      </section>
    </main>
  )
}

export default ProjectDetail
