# Portfólio — Pedro Acácio

Portfólio e currículo, com os projetos feitos até aqui: Mahut Arquitetura, Hifive Discos & Bar,
Amor à Palavra, FJ Barbearia, Blu Cookies Box, NestWise e Volver.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + [Tailwind CSS v4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) para ícones
- Roteamento por hash (`#/projeto/<slug>`) — funciona em qualquer hospedagem estática

## Rodando localmente

```bash
npm install
npm run dev
```

## Adicionando um projeto

1. Inclua um objeto em `PROJETOS` no arquivo `src/data.js` (nome, tipo, resumo,
   desafio, entregas, stack, paleta, fontes, cores do card, url).
2. Coloque os screenshots em `public/shots/<slug>.webp` (1440×900) e
   `public/shots/<slug>-mobile.webp` (390×844).

A grade, os filtros e a página do projeto são gerados automaticamente.

## Contato

Preencha `email`, `whatsapp`, `linkedin` e `instagram` em `PERFIL` (`src/data.js`) para os
botões aparecerem na seção de contato — campos vazios ficam ocultos.
