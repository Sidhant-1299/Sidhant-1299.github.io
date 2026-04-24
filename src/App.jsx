function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-emerald-300">
            React + Tailwind CSS
          </p>
          <h1 className="text-4xl font-semibold text-white">Hello World!</h1>
          <p className="mt-3 text-base text-slate-300">
            Tailwind is loaded correctly through <code>src/index.css</code>.
          </p>
        </section>
      </div>
    </main>
  )
}

export default App
