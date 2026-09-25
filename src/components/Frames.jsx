// Molduras de navegador e de celular para os screenshots dos projetos.

export function BrowserFrame({ src, alt, url, className = '' }) {
  const dominio = url ? url.replace(/^https?:\/\//, '') : 'acesso privado'
  return (
    <div className={`overflow-hidden rounded-xl bg-[#e9e5de] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] ring-1 ring-black/10 ${className}`}>
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex gap-1.5">
          <i className="block size-2.5 rounded-full bg-[#ec6a5e]" />
          <i className="block size-2.5 rounded-full bg-[#f4bf4f]" />
          <i className="block size-2.5 rounded-full bg-[#61c554]" />
        </span>
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/80 px-3 py-0.5 font-mono text-[10px] text-[#6d655a]">
          {dominio}
        </span>
        <span className="w-[42px]" />
      </div>
      <img src={src} alt={alt} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  )
}

export function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div className={`rounded-[1.6rem] bg-[#141210] p-1.5 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="block aspect-[390/844] w-full rounded-[1.25rem] object-cover object-top" />
    </div>
  )
}
