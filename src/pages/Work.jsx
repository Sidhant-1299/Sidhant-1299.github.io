import { projects } from '../Data/ProjectData.jsx'

function createWorkSections(items) {
  const sections = []

  if (items.length > 0) {
    sections.push({ variant: 'lead', projects: [items[0]] })
  }

  let index = 1
  let pairRowsBeforeAsymmetric = 0

  while (index < items.length) {
    const remaining = items.length - index

    if (remaining >= 3 && pairRowsBeforeAsymmetric >= 1) {
      sections.push({ variant: 'asymmetric', projects: items.slice(index, index + 3) })
      index += 3
      pairRowsBeforeAsymmetric = 0
      continue
    }

    const rowProjects = items.slice(index, index + 2)
    sections.push({ variant: 'pair', projects: rowProjects })
    index += rowProjects.length
    pairRowsBeforeAsymmetric += 1
  }

  return sections
}

function Work() {
  const sections = createWorkSections(projects)

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <section className="mx-auto min-h-[54vh] max-w-5xl text-center md:min-h-[62vh]">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-2)]">Projects / systems / visual studies</p>
        <h1 className="mt-8 text-[clamp(4rem,12vw,11rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-[var(--text-0)]">
          Recent<br />work
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-sm uppercase leading-6 tracking-[0.16em] text-[var(--text-2)] md:text-base md:leading-7">
          A selected field of data products, machine learning studies, and technical interfaces built with an eye for clarity.
        </p>
      </section>

      <section className="space-y-6 md:space-y-8" aria-label="Selected project cards">
        {sections.map((section, index) => (
          <WorkSection key={`${section.variant}-${section.projects.map((project) => project.slug).join('-')}`} priority={index === 0} section={section} />
        ))}
      </section>
    </main>
  )
}

function WorkSection({ section, priority }) {
  if (section.variant === 'lead') {
    return <ProjectCard project={section.projects[0]} size="lead" priority={priority} />
  }

  if (section.variant === 'asymmetric') {
    const [first, second, feature] = section.projects

    return (
      <div className="grid gap-6 md:grid-cols-[0.82fr_1.18fr] md:gap-8">
        <div className="grid gap-6 md:gap-8">
          {first && <ProjectCard project={first} size="small" />}
          {second && <ProjectCard project={second} size="small" />}
        </div>
        {feature && <ProjectCard project={feature} size="feature" />}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      {section.projects.map((project) => (
        <ProjectCard project={project} key={project.slug} size="medium" />
      ))}
    </div>
  )
}

function ProjectCard({ project, size, priority = false }) {
  const sizeClass = {
    lead: 'min-h-[30rem] md:min-h-[42rem]',
    feature: 'min-h-[30rem] md:min-h-[42rem]',
    medium: 'min-h-[24rem] md:min-h-[31rem]',
    small: 'min-h-[20rem] md:min-h-[19rem]',
  }[size]

  return (
    <a
      className={`group relative flex overflow-hidden rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)] shadow-[0_24px_70px_rgba(0,0,0,0.36)] outline-none transition duration-300 hover:-translate-y-1 hover:border-[var(--line-1)] focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)] ${sizeClass}`}
      href={`/projects/${project.slug}`}
    >
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-86 saturate-[0.82] transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        src={project.image}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#120f0f]/10 via-[#120f0f]/25 to-[#120f0f]/92" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(234,226,215,0.10),transparent_26rem)] opacity-70" />
      <div className="absolute inset-0 z-10 flex items-end p-4 text-[var(--text-0)] md:p-6">
        <div className="w-full translate-y-1 rounded-[1.6rem] border border-white/10 bg-[var(--bg-0)]/62 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 group-hover:translate-y-0 md:p-5">
          <div className="mb-3 flex items-center justify-between gap-4 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-2)]">
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>
          <h2 className="max-w-2xl text-3xl font-semibold leading-none tracking-[-0.035em] md:text-5xl">{project.title}</h2>
          {size !== 'small' && <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--text-1)] opacity-90 md:text-base md:leading-7">{project.summary}</p>}
          <div className="mt-5 text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
            View project
          </div>
        </div>
      </div>
    </a>
  )
}

export default Work
