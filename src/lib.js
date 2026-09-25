import { useEffect, useState } from 'react'

// Roteamento por hash (#/projeto/<slug>) — funciona em qualquer hospedagem
// estática sem precisar configurar rewrites.
export function useHashRoute() {
  const ler = () => window.location.hash.replace(/^#/, '') || '/'
  const [rota, setRota] = useState(ler)
  useEffect(() => {
    const aoMudar = () => setRota(ler())
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [])
  return rota
}

// Decide se o texto sobre uma cor de fundo deve ser claro ou escuro.
export function textoSobre(hex) {
  const n = parseInt(hex.slice(1), 16)
  const canal = (c) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  const lum = 0.2126 * canal(n >> 16) + 0.7152 * canal((n >> 8) & 255) + 0.0722 * canal(n & 255)
  return lum > 0.35 ? '#1d1a16' : '#f6f1e7'
}
