import { useState } from 'react'
import { ArrowRight, Download } from 'lucide-react'
import { PERFIL, PROJETOS, SOBRE, TIPOS } from '../data.js'
import { textoSobre } from '../lib.js'
import { BrowserFrame, PhoneFrame } from './Frames.jsx'
import Reveal from './Reveal.jsx'

const ETAPAS = [
  ['01', 'Escuta', 'Conversa sobre o negócio, o público e o que o site precisa resolver — agendar, vender, receber pedidos.'],
  ['02', 'Identidade', 'Cores, fontes e elementos visuais tirados da própria marca, não de um template.'],
  ['03', 'Construção', 'Site rápido, responsivo e com os botões certos: WhatsApp, agenda, catálogo.'],
  ['04', 'No ar', 'Publicação com link próprio, ajustes finais e apoio depois da entrega.'],
]

// Brilho verde de fundo + grade discreta, usados no topo e no contato.
export function Brilho() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_70%_20%,#000,transparent_70%)]" />
    </div>
  )
}

function Hero() {
  const noAr = PROJETOS.filter((p) => p.url).length
  return (
    <div className="relative isolate overflow-hidden">
      <Brilho />
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
            {PERFIL.nome} — {PERFIL.titulo} · {PERFIL.cidade}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.9rem,8vw,6.5rem)] leading-[0.95] tracking-tight">
            Sites que parecem <em className="text-accent">feitos</em> para a marca — porque foram.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{PERFIL.bio}</p>
        </Reveal>
        <Reveal delay={240} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition hover:gap-3"
          >
            Ver projetos <ArrowRight className="size-4" />
          </a>
          <dl className="flex gap-8 text-sm">
            <div>
              <dt className="text-muted">Projetos</dt>
              <dd className="font-display text-3xl">{PROJETOS.length}</dd>
            </div>
            <div>
              <dt className="text-muted">No ar</dt>
              <dd className="font-display text-3xl">{noAr}</dd>
            </div>
          </dl>
          {/* Assinatura: a cor principal de cada marca atendida */}
          <div className="flex -space-x-2" aria-label="Cores das marcas atendidas">
            {PROJETOS.map((p) => (
              <span
                key={p.slug}
                title={p.nome}
                className="size-8 rounded-full ring-2 ring-bg outline-1 outline-offset-2 outline-ink/20"
                style={{ background: p.cor }}
              />
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  )
}

function Card({ p, i }) {
  const texto = textoSobre(p.fundo)
  return (
    <Reveal delay={(i % 2) * 90} className="min-w-0">
      <a href={`#/projeto/${p.slug}`} className="group block">
        <div
          className="relative overflow-hidden rounded-2xl px-6 pt-8 pb-0 transition duration-500 group-hover:-translate-y-1 sm:px-10 sm:pt-10"
          style={{ background: p.fundo }}
        >
          <div className="flex items-center justify-between font-mono text-[11px] tracking-wider uppercase" style={{ color: texto }}>
            <span className="opacity-70">{p.tipo}</span>
            <span className="flex gap-1">
              {p.paleta.map((c) => (
                <i key={c} className="block size-3 rounded-full ring-1 ring-black/15" style={{ background: c }} />
              ))}
            </span>
          </div>
          <div className="relative mt-8">
            <BrowserFrame
              src={`/shots/${p.slug}.webp`}
              alt={`Página inicial de ${p.nome}`}
              url={p.url}
              className="translate-y-3 transition duration-500 group-hover:translate-y-0"
            />
            <PhoneFrame
              src={`/shots/${p.slug}-mobile.webp`}
              alt={`${p.nome} no celular`}
              className="absolute -right-2 -bottom-2 w-[24%] transition duration-500 group-hover:-translate-y-3 sm:right-[-4%]"
            />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl leading-tight">{p.nome}</h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">{p.resumo}</p>
          </div>
          <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line transition group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
            <ArrowRight className="size-4 transition group-hover:-rotate-45" />
          </span>
        </div>
      </a>
    </Reveal>
  )
}

function Projetos() {
  const [filtro, setFiltro] = useState('Todos')
  const lista = filtro === 'Todos' ? PROJETOS : PROJETOS.filter((p) => p.tipo === filtro)
  return (
    <section id="projetos" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl md:text-6xl">Projetos</h2>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por tipo">
            {TIPOS.map((t) => {
              const n = t === 'Todos' ? PROJETOS.length : PROJETOS.filter((p) => p.tipo === t).length
              const ativo = filtro === t
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={ativo}
                  onClick={() => setFiltro(t)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    ativo ? 'border-ink bg-ink text-bg' : 'border-line text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  {t} <span className="ml-1 font-mono text-xs opacity-60">{n}</span>
                </button>
              )
            })}
          </div>
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {lista.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Sobre() {
  return (
    <section id="sobre" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <Reveal className="md:sticky md:top-28 md:self-start">
            <h2 className="font-display text-5xl md:text-6xl">Sobre</h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted">{SOBRE.texto}</p>
            <a
              href={PERFIL.curriculo}
              download
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold transition hover:border-accent hover:bg-accent hover:text-on-accent"
            >
              Baixar currículo (PDF) <Download className="size-4" />
            </a>
          </Reveal>

          <div className="grid gap-12">
            <Reveal delay={80}>
              <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Experiência</h3>
              <ol className="mt-5 grid gap-7">
                {SOBRE.experiencia.map((x) => (
                  <li key={x.titulo} className="border-t border-line pt-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-display text-2xl">{x.titulo}</span>
                      <span className="font-mono text-xs text-accent">{x.periodo}</span>
                    </div>
                    <ul className="mt-3 grid gap-1.5 text-sm leading-relaxed text-muted">
                      {x.itens.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={120}>
              <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Formação</h3>
              <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                {SOBRE.formacao.map((f) => (
                  <li key={f.titulo} className="rounded-2xl border border-line bg-surface p-5">
                    <span className="font-display text-2xl leading-tight">{f.titulo}</span>
                    <p className="mt-1 text-sm text-muted">{f.lugar}</p>
                    <p className="mt-3 font-mono text-xs text-accent">{f.periodo}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={160}>
              <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Competências</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {SOBRE.competencias.map((c) => (
                  <li key={c} className="rounded-full border border-line px-3.5 py-1.5 text-sm">{c}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{SOBRE.idiomas}</p>
            </Reveal>

            <Reveal delay={200}>
              <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Certificações</h3>
              <ul className="mt-5 grid gap-2 text-sm">
                {SOBRE.certificacoes.map((c) => <li key={c} className="border-b border-line pb-2">{c}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Processo() {
  return (
    <section id="processo" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="font-display text-5xl md:text-6xl">Como eu trabalho</h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map(([n, t, d], i) => (
            <Reveal as="li" key={n} delay={i * 80} className="border-t border-ink pt-5">
              <span className="font-mono text-xs text-accent">{n}</span>
              <h3 className="mt-2 font-display text-3xl">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Projetos />
      <Sobre />
      <Processo />
    </>
  )
}
