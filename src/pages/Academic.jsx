import { academicData } from '../Data/AcademicData.jsx'
import { skills, tools } from '../Data/SkillData.jsx'
import { Eyebrow, PageShell, Tag } from '../components/ui.jsx'

const proofStats = [
  { label: 'Current track', value: 'Data Science' },
  { label: 'Credential focus', value: 'Analytics' },
  { label: 'Applied proof', value: '6 projects' },
]

const skillGroups = skills.reduce((groups, skill) => {
  const group = groups.get(skill.group) ?? []
  group.push(skill.label)
  groups.set(skill.group, group)
  return groups
}, new Map())

function Academic() {
  return (
    <PageShell>
      <section className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
        <div>
          <Eyebrow>Education / credentials / tools</Eyebrow>
          <h1 className="mt-6 text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-[var(--text-0)]">
            Academic<br />profile
          </h1>
        </div>
        <div className="rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/76 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] md:p-6">
          <p className="text-lg leading-8 text-[var(--text-1)]">
            A compact view of the academic path behind the project work: data science study, analytics certification, and the technical stack used to turn models into usable interfaces.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {proofStats.map((stat) => (
              <div className="rounded-2xl border border-[var(--line-0)] bg-[var(--bg-2)]/45 p-4" key={stat.label}>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-2)]">{stat.label}</p>
                <p className="mt-2 text-sm font-medium text-[var(--text-0)]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:gap-8" aria-label="Academic credentials and capability">
        <div className="space-y-6">
          {academicData.map((item, index) => (
            <CredentialCard item={item} key={item.id} priority={index === 0} />
          ))}
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/76 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-7">
            <Eyebrow className="tracking-[0.2em]">Skills map</Eyebrow>
            <div className="mt-6 space-y-5">
              {[...skillGroups.entries()].map(([group, labels]) => (
                <div key={group}>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-0)]">{group}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {labels.map((label) => (
                      <Tag key={label}>{label}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[var(--line-0)] bg-[linear-gradient(135deg,rgba(140,56,54,0.16),rgba(26,21,21,0.82)_46%,rgba(35,29,28,0.82))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-7">
            <Eyebrow className="tracking-[0.2em]">Tools in rotation</Eyebrow>
            <div className="mt-5 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className="mt-16 rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/60 p-6 text-center shadow-[0_18px_60px_rgba(0,0,0,0.26)] md:p-10 lg:p-14">
        <div className="mx-auto max-w-5xl">
          <Eyebrow>Academic direction</Eyebrow>
          <p className="mt-6 text-3xl font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--text-0)] md:text-5xl lg:text-6xl">
            The through-line is practical data work: learn the math, test it in code, then shape the result into something readable.
          </p>
        </div>
      </section>
    </PageShell>
  )
}

function CredentialCard({ item, priority }) {
  return (
    <a
      className="group grid overflow-hidden rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/80 shadow-[0_20px_70px_rgba(0,0,0,0.34)] outline-none transition duration-300 hover:-translate-y-1 hover:border-[var(--line-1)] focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)] sm:grid-cols-[13rem_1fr]"
      href={item.url}
      rel="noreferrer"
      target="_blank"
    >
      <div className="relative min-h-52 overflow-hidden bg-[var(--bg-2)] sm:min-h-full">
        <img
          alt=""
          className="h-full w-full object-contain p-8 opacity-90 saturate-[0.84] transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          src={item.img}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120f0f]/0 via-[#120f0f]/12 to-[#120f0f]/70" />
      </div>
      <div className="p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-2)]">
          <span>{item.type}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--line-1)]" />
          <span>{item.date}</span>
        </div>
        <h2 className="mt-5 text-3xl font-semibold leading-none tracking-[-0.045em] text-[var(--text-0)] md:text-4xl">{item.name}</h2>
        <p className="mt-4 text-base leading-7 text-[var(--text-1)]">{item.course}</p>
        <p className="mt-4 text-sm leading-6 text-[var(--text-2)]">{item.summary}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--text-2)] transition group-hover:text-[var(--text-1)]">Open</p>
      </div>
    </a>
  )
}

export default Academic
