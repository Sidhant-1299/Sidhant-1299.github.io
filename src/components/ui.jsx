function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

const shellSpacing = {
  default: 'px-3 py-16 sm:px-4 md:px-10 md:py-24 lg:px-16',
  compact: 'px-3 py-14 sm:px-4 md:px-10 md:py-20 lg:px-16',
  home: 'px-3 py-14 sm:px-4 md:px-10 md:py-20 lg:px-16 lg:py-6 xl:py-8',
}

export function PageShell({ children, className, spacing = 'default' }) {
  return (
    <main className={cx('mx-auto max-w-7xl', shellSpacing[spacing], className)}>
      {children}
    </main>
  )
}

export function Eyebrow({ children, className }) {
  return (
    <p className={cx('text-xs uppercase tracking-[0.22em] text-[var(--text-2)]', className)}>
      {children}
    </p>
  )
}

export function Tag({ children }) {
  return (
    <span className="rounded-full border border-[var(--line-0)] bg-[var(--bg-2)]/70 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-[var(--text-2)]">
      {children}
    </span>
  )
}
