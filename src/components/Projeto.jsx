import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { PROJETOS } from '../data.js'
import { textoSobre } from '../lib.js'
import { BrowserFrame, PhoneFrame } from './Frames.jsx'
import Reveal from './Reveal.jsx'

export default function Projeto({ slug }) {
  const i = PROJETOS.findIndex((p) => p.slug === slug)
  const p = PROJETOS[i]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = p ? `${p.nome} | Pedro Acácio` : 'Projeto não encontrado'
  }, [p])

  if (!p) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-32 text-center sm:px-6">
        <h1 className="font-display text-5xl">Projeto não encontrado</h1>
        <a href="#/" className="mt-6 inline-block text-accent underline">Voltar ao início</a>
      </section>
    )
  }

  const proximo = PROJETOS[(i + 1) % PROJETOS.length]
  const anterior = PROJETOS[(i - 1 + PROJETOS.length) % PROJETOS.length]
  const texto = textoSobre(p.fundo)

  return (
    <article>
      <header style={{ background: p.fundo, color: texto }}>
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 md:pb-24">
          <a href="#/" className="inline-flex items-center gap-2 text-sm opacity-75 transition hover:opacity-100">
            <ArrowLeft className="size-4" /> Todos os projetos
          </a>
          <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase opacity-70">
                {p.tipo} · {p.ano}
              </p>
              <h1 className="mt-4 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.92]">{p.nome}</h1>
            </div>
            <div>
              <p className="text-lg leading-relaxed opacity-85">{p.resumo}</p>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:gap-3"
                  style={{ background: texto, color: p.fundo }}
                >
                  Visitar o site <ArrowUpRight className="size-4" />
                </a>
              ) : (
                <span className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm" style={{ borderColor: texto }}>
                  <Lock className="size-4" /> {p.status} · repositório privado
                </span>
              )}
            </div>
          </div>
          <div className="relative mt-14 md:mt-20">
            <BrowserFrame src={`/shots/${p.slug}.webp`} alt={`Página inicial de ${p.nome}`} url={p.url} />
            <PhoneFrame
              src={`/shots/${p.slug}-mobile.webp`}
              alt={`${p.nome} no celular`}
              className="absolute right-3 -bottom-10 w-[26%] max-w-[240px] md:right-10"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 md:pt-28">
        <dl className="grid gap-6 border-b border-line pb-12 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs tracking-wider text-muted uppercase">Cliente</dt>
            <dd className="mt-2">{p.cliente}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wider text-muted uppercase">Onde</dt>
            <dd className="mt-2">{p.local}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wider text-muted uppercase">Tecnologia</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs">{s}</span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="grid gap-12 py-14 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <Reveal>
            <h2 className="font-display text-4xl">O desafio</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{p.desafio}</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl">O que foi feito</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {p.entregas.map((e, n) => (
                <li key={e} className="flex gap-4 py-4 leading-relaxed">
                  <span className="font-mono text-xs text-accent pt-1">{String(n + 1).padStart(2, '0')}</span>
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-4xl">Identidade</h2>
            <p className="font-mono text-xs text-muted">{p.fontes}</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {p.paleta.map((c) => (
              <div key={c}>
                <div className="aspect-[4/3] rounded-xl ring-1 ring-black/10" style={{ background: c }} />
                <p className="mt-2 font-mono text-xs text-muted uppercase">{c}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <nav className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="Outros projetos">
          <a href={`#/projeto/${anterior.slug}`} className="group">
            <span className="flex items-center gap-2 text-sm text-muted"><ArrowLeft className="size-4" /> Anterior</span>
            <span className="mt-1 block font-display text-3xl transition group-hover:text-accent">{anterior.nome}</span>
          </a>
          <a href={`#/projeto/${proximo.slug}`} className="group sm:text-right">
            <span className="flex items-center gap-2 text-sm text-muted sm:justify-end">Próximo <ArrowRight className="size-4" /></span>
            <span className="mt-1 block font-display text-3xl transition group-hover:text-accent">{proximo.nome}</span>
          </a>
        </nav>
      </div>
    </article>
  )
}
