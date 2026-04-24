import { aboutHighlights, profile, profileLinks, resumeLink } from '../Data/ProfileData.jsx'
import { Eyebrow, PageShell } from '../components/ui.jsx'

const statusItems = [
  { label: 'Current role', value: profile.role },
  { label: 'Based in', value: profile.location },
]

function About() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <PageShell>
      <section className="grid gap-8 md:grid-cols-[1.04fr_0.96fr] md:items-end">
        <div>
          <Eyebrow>About / contact / signal</Eyebrow>
          <h1 className="mt-6 text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-[var(--text-0)]">
            Sidhant<br />Raj Khati
          </h1>
        </div>
        <div className="rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/76 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] md:p-6">
          <p className="text-lg leading-8 text-[var(--text-1)]">{profile.intro}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {statusItems.map((item) => (
              <div className="rounded-2xl border border-[var(--line-0)] bg-[var(--bg-2)]/45 p-4" key={item.label}>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-2)]">{item.label}</p>
                <p className="mt-2 text-sm font-medium leading-5 text-[var(--text-0)]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-[0.86fr_1.14fr] md:gap-8" aria-label="About details and contact">
        <aside className="space-y-6">
          <a
            className="group block overflow-hidden rounded-[2rem] border border-[var(--line-1)] bg-[radial-gradient(circle_at_20%_0%,rgba(234,226,215,0.14),transparent_16rem),linear-gradient(135deg,rgba(140,56,54,0.28),rgba(26,21,21,0.88)_50%,rgba(35,29,28,0.92))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.36)] outline-none transition duration-300 hover:-translate-y-1 active:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-0)] md:p-7"
            href={resumeLink.href}
            rel="noreferrer"
            target="_blank"
          >
            <Eyebrow className="tracking-[0.2em]">{resumeLink.label}</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.92] tracking-[-0.055em] text-[var(--text-0)] md:text-5xl">Open the formal record</h2>
            <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[var(--bg-0)]/36 px-4 py-3 backdrop-blur-md">
              <span className="text-sm font-medium text-[var(--text-1)]">{resumeLink.value}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-2)] transition group-hover:text-[var(--text-0)] group-active:text-[var(--text-0)]">Open</span>
            </div>
          </a>

          <section className="rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/76 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-7">
            <Eyebrow className="tracking-[0.2em]">Contact paths</Eyebrow>
            <div className="mt-6 space-y-3">
              {profileLinks.map((link) => (
                <a
                  className="group flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-[var(--line-0)] bg-[var(--bg-2)]/45 px-4 py-3 outline-none transition duration-300 hover:-translate-y-0.5 hover:border-[var(--line-1)] active:-translate-y-0.5 active:border-[var(--line-1)] focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-1)]"
                  href={link.href}
                  key={link.label}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                >
                  <span>
                    <span className="block text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">{link.label}</span>
                    <span className="mt-1 block text-sm font-medium text-[var(--text-0)]">{link.value}</span>
                  </span>
                  <span className="text-sm text-[var(--text-2)] transition group-hover:text-[var(--text-0)] group-active:text-[var(--text-0)]" aria-hidden="true">Open</span>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[var(--line-0)] bg-[linear-gradient(135deg,rgba(140,56,54,0.16),rgba(26,21,21,0.82)_48%,rgba(35,29,28,0.82))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-7">
            <Eyebrow className="tracking-[0.2em]">Current focus</Eyebrow>
            <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.035em] text-[var(--text-0)]">{profile.focus}</p>
          </section>
        </aside>

        <div className="space-y-6">
          <section className="grid gap-6 lg:grid-cols-3" aria-label="Credibility highlights">
            {aboutHighlights.map((item) => (
              <article className="rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/72 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)]" key={item.label}>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">{item.label}</p>
                <h2 className="mt-5 text-2xl font-semibold leading-none tracking-[-0.04em] text-[var(--text-0)]">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-1)]">{item.body}</p>
              </article>
            ))}
          </section>

          <section className="rounded-[2rem] border border-[var(--line-0)] bg-[var(--bg-1)]/76 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-8" aria-labelledby="contact-form-title">
            <div className="flex flex-col gap-6">
              <div className="max-w-2xl">
                <Eyebrow className="tracking-[0.2em]">Contact form</Eyebrow>
                <h2 className="mt-4 text-3xl font-semibold leading-none tracking-[-0.045em] text-[var(--text-0)] md:text-4xl" id="contact-form-title">Reach out</h2>
              </div>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <label className="block" htmlFor="contact-name">
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">Name</span>
                  {/* Placeholder copy: Your name */}
                  <input
                    className="mt-2 min-h-14 w-full rounded-2xl border border-[var(--line-0)] bg-[var(--bg-2)]/70 px-4 text-base text-[var(--text-0)] outline-none transition focus:border-[var(--line-1)] focus:ring-2 focus:ring-[var(--accent-red)]/45"
                    id="contact-name"
                    name="name"
                    type="text"
                  />
                </label>
                <label className="block" htmlFor="contact-email">
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">Email</span>
                  {/* Placeholder copy: you@example.com */}
                  <input
                    className="mt-2 min-h-14 w-full rounded-2xl border border-[var(--line-0)] bg-[var(--bg-2)]/70 px-4 text-base text-[var(--text-0)] outline-none transition focus:border-[var(--line-1)] focus:ring-2 focus:ring-[var(--accent-red)]/45"
                    id="contact-email"
                    name="email"
                    type="email"
                  />
                </label>
                <label className="block" htmlFor="contact-message">
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">Message</span>
                  {/* Placeholder copy: Tell me what you are building or hiring for. */}
                  <textarea
                    className="mt-2 min-h-[17rem] w-full resize-y rounded-2xl border border-[var(--line-0)] bg-[var(--bg-2)]/70 px-4 py-4 text-base leading-7 text-[var(--text-0)] outline-none transition focus:border-[var(--line-1)] focus:ring-2 focus:ring-[var(--accent-red)]/45"
                    id="contact-message"
                    name="message"
                  />
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line-1)] bg-[var(--accent-red-deep)]/70 px-8 text-sm font-medium text-[var(--text-0)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-red)]/55 active:-translate-y-0.5 active:bg-[var(--accent-red)]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-1)]" type="submit">
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  )
}

export default About
