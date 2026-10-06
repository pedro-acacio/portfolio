import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, Moon, Sun } from 'lucide-react'
import { PERFIL } from './data.js'
import { useHashRoute } from './lib.js'
import Home, { Brilho } from './components/Home.jsx'
import Projeto from './components/Projeto.jsx'
import Reveal from './components/Reveal.jsx'

function lerTema() {
  try {
    return localStorage.getItem('tema')
  } catch {
    return null
  }
}

function useTema() {
  const [tema, setTema] = useState(lerTema)
  useEffect(() => {
    if (tema) document.documentElement.dataset.theme = tema
    try {
      if (tema) localStorage.setItem('tema', tema)
    } catch {
      /* navegação privada: segue só nesta visita */
    }
  }, [tema])
  const escuroAgora = () =>
    tema ? tema === 'dark' : true
  return [escuroAgora, () => setTema(escuroAgora() ? 'light' : 'dark')]
}

function Nav() {
  const [escuro, alternar] = useTema()
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#/" className="flex items-center gap-2.5">
          <span className="relative grid size-8 place-items-center rounded-lg bg-ink font-display text-lg text-bg italic">
            pa
            <i className="absolute -top-1 -right-1 size-2.5 rounded-full bg-accent" />
          </span>
          <span className="font-semibold tracking-tight">{PERFIL.nome}</span>
        </a>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <a href="#projetos" className="hidden rounded-full px-3 py-1.5 text-muted hover:text-ink sm:block">Projetos</a>
          <a href="#sobre" className="hidden rounded-full px-3 py-1.5 text-muted hover:text-ink sm:block">Sobre</a>
          <a href="#processo" className="hidden rounded-full px-3 py-1.5 text-muted hover:text-ink sm:block">Processo</a>
          <a href="#contato" className="rounded-full px-3 py-1.5 text-muted hover:text-ink">Contato</a>
          <button
            onClick={alternar}
            aria-label="Alternar tema claro/escuro"
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:text-ink"
          >
            {escuro() ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </nav>
      </div>
    </header>
  )
}

// mailto: não faz nada em quem não tem app de e-mail configurado (comum no
// Windows com Gmail no navegador), então o botão copia o endereço.
function BotaoEmail() {
  const [copiado, setCopiado] = useState(false)
  async function copiar() {
    try {
      await navigator.clipboard.writeText(PERFIL.email)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      window.location.href = `mailto:${PERFIL.email}`
    }
  }
  return (
    <button
      type="button"
      onClick={copiar}
      className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition hover:border-ink"
    >
      {copiado ? <>E-mail copiado! <Check className="size-4 text-accent" /></> : <>E-mail <Copy className="size-4" /></>}
    </button>
  )
}

function Contato() {
  const links = [
    PERFIL.whatsapp && ['WhatsApp', PERFIL.whatsapp],
    PERFIL.linkedin && ['LinkedIn', PERFIL.linkedin],
    PERFIL.instagram && ['Instagram', PERFIL.instagram],
    ['GitHub', PERFIL.github],
  ].filter(Boolean)
  return (
    <section id="contato" className="relative isolate scroll-mt-20 overflow-hidden border-t border-line bg-surface">
      <Brilho />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase opacity-60">Contato</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95]">
            Vamos construir algo <em className="text-accent">juntos</em>?
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">
            Aberto a vagas de Desenvolvedor Full-Stack e a projetos freelance.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-10 flex flex-wrap gap-3">
          {links.map(([rotulo, href], n) => (
            <a
              key={rotulo}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:gap-3 ${
                n === 0 ? 'bg-accent text-on-accent' : 'border border-line hover:border-ink'
              }`}
            >
              {rotulo} <ArrowUpRight className="size-4" />
            </a>
          ))}
          {PERFIL.email && <BotaoEmail />}
        </Reveal>
        {PERFIL.email && (
          <p className="mt-6 font-mono text-sm text-muted select-all">{PERFIL.email}</p>
        )}
      </div>
    </section>
  )
}

export default function App() {
  const rota = useHashRoute()
  const slug = rota.match(/^\/projeto\/([\w-]+)/)?.[1]

  // Âncoras como #projetos ou #contato: rola até a seção (inclusive vindo
  // de uma página de projeto, que primeiro volta para a home).
  useEffect(() => {
    if (slug || rota.startsWith('/')) return
    requestAnimationFrame(() => document.getElementById(rota)?.scrollIntoView())
  }, [rota, slug])

  useEffect(() => {
    if (!slug) document.title = `${PERFIL.nome} | ${PERFIL.titulo}`
  }, [slug])

  return (
    <>
      <Nav />
      <main>{slug ? <Projeto key={slug} slug={slug} /> : <Home />}</main>
      <Contato />
      <footer className="bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-line px-4 py-6 font-mono text-xs text-muted sm:px-6">
          <span>© {new Date().getFullYear()} {PERFIL.nome}</span>
          <span>{PERFIL.cidade}</span>
        </div>
      </footer>
    </>
  )
}
