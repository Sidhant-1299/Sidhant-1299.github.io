import { projects } from '../Data/ProjectData.jsx'
import { getSkillLabels } from '../Data/SkillData.jsx'
import { Eyebrow, PageShell, Tag } from '../components/ui.jsx'

function ProjectDetail({ slug }) {
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <ProjectNotFound slug={slug} />
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const tools = getSkillLabels(project.skillIds)
  const sections = project.sections ?? []

  return (
    <PageShell spacing="compact">
      <a className="inline-flex min-h-11 items-center rounded-full border border-[var(--line-0)] bg-[var(--bg-1)]/70 px-4 text-sm text-[var(--text-1)] transition hover:border-[var(--line-1)] hover:text-[var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)]" href="/work">
        Back to work
      </a>

      <section className="grid gap-10 pt-12 md:grid-cols-[0.92fr_1.08fr] md:items-end md:pt-16">
        <div>
          <Eyebrow>{project.client} / {project.year}</Eyebrow>
          <h1 className="mt-5 text-[clamp(3.2rem,8vw,7.8rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-[var(--text-0)]">
            {project.title}
          </h1>
        </div>
        <div className="rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/76 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] md:p-6">
          <p className="text-lg leading-8 text-[var(--text-1)]">{project.thesis ?? project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <Tag key={tool}>
                {tool}
              </Tag>
            ))}
          </div>
        </div>
      </section>

      <figure className="mt-12 overflow-hidden rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)] shadow-[0_28px_90px_rgba(0,0,0,0.42)] md:mt-16">
        <img alt="" className="aspect-[16/10] w-full object-cover saturate-[0.88]" decoding="async" fetchPriority="high" src={project.image} />
      </figure>

      <section className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8" aria-label="Project metadata">
        <InfoCard label="Role" value={project.role ?? 'Independent project'} />
        <InfoCard label="Focus" value={project.client} />
        <InfoCard label="Year" value={project.year} />
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:gap-12">
        <div>
          <Eyebrow className="sticky top-24">Case notes</Eyebrow>
        </div>
        <div className="space-y-6">
          <article className="rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/72 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-0)]">Project thesis</h2>
            <p className="mt-4 leading-7 text-[var(--text-1)]">{project.summary}</p>
          </article>

          {sections.map((section) => (
            <article className="rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/72 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-8" key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-0)]">{section.heading}</h2>
              <p className="mt-4 leading-7 text-[var(--text-1)]">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 border-t border-[var(--line-0)] pt-8 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow className="tracking-[0.2em]">Next project</Eyebrow>
          <a className="mt-3 inline-flex min-h-11 items-center text-3xl font-semibold tracking-[-0.04em] text-[var(--text-0)] transition hover:text-[var(--text-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)] md:text-4xl" href={`/projects/${nextProject.slug}`}>
            {nextProject.title}
          </a>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          {project.url ? (
            <a className="inline-flex min-h-11 items-center rounded-full border border-[var(--line-1)] bg-[var(--bg-2)]/70 px-5 text-sm font-medium text-[var(--text-0)] transition hover:-translate-y-0.5 hover:bg-[var(--bg-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)]" href={project.url} rel="noreferrer" target="_blank">
              Open repository
            </a>
          ) : null}
          <a className="inline-flex min-h-11 items-center rounded-full border border-[var(--line-0)] px-5 text-sm font-medium text-[var(--text-1)] transition hover:-translate-y-0.5 hover:border-[var(--line-1)] hover:text-[var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)]" href="/work">
            All work
          </a>
        </div>
      </section>
    </PageShell>
  )
}

function InfoCard({ label, value }) {
  return (
    <article className="rounded-3xl border border-[var(--line-0)] bg-[var(--bg-1)]/72 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.28)]">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">{label}</p>
      <p className="mt-3 leading-7 text-[var(--text-1)]">{value}</p>
    </article>
  )
}

function ProjectNotFound({ slug }) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-3 py-20 sm:px-4 md:px-10 lg:px-16">
      <section className="max-w-xl rounded-3xl border border-[var(--line-0)] bg-[var(--bg-1)]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Missing project</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-0)]">{slug || 'Unknown'} is not in the project index.</h1>
        <p className="mt-4 leading-7 text-[var(--text-1)]">Add this slug to `src/Data/ProjectData.jsx` or return to the work page.</p>
        <a className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[var(--line-0)] px-5 text-sm font-medium text-[var(--text-1)] transition hover:border-[var(--line-1)] hover:text-[var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)]" href="/work">
          Back to work
        </a>
      </section>
    </main>
  )
}

export default ProjectDetail
