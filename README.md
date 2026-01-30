# BlogAboutArchitecture

Blog minimalista construído com **Deno**, **Deno KV** e **HTML/CSS/JS puro**, focado em simplicidade, clareza arquitetural e baixo custo operacional.

O projeto utiliza:
- API própria em Deno
- Persistência com Deno KV
- Front-end estático sem framework
- Publicação de posts via Markdown
- Preview local com auto-reload
- Deploy direto no Deno Deploy

---

## Funcionalidades

- Listagem de posts com paginação
- Post individual
- Sanitização básica de HTML
- Persistência com Deno KV
- Front e API no mesmo domínio (sem CORS)
- Preview local de Markdown
- Auto-reload ao salvar (`watch`)
- Slug automático
- Suporte a `draft: true`
- Pronto para Deno Deploy

---

## Arquitetura

.
├── main.ts # Servidor HTTP (API + front)
├── kv.ts # Acesso ao Deno KV
├── deps.ts # Dependências centralizadas
├── public/ # Front-end estático
│ ├── index.html
│ ├── post.html
│ ├── css/
│ └── js/
├── posts/ # Posts em Markdown
├── scripts/
│ ├── publish.ts # Publicação Markdown → KV
│ └── preview.ts # Preview local com auto-reload
└── README.md


---

## Modelo de dados (KV)

### Post individual
```ts
["post", id]

{
  "id": 1,
  "slug": "meu-primeiro-post",
  "title": "Meu primeiro post",
  "summary": "Resumo curto",
  "content": "<p>HTML do post</p>",
  "createdAt": "2026-01-01"
}

Índice para listagem

["posts_by_date", createdAt, id]

Formato do post (Markdown)

---
id: 1
title: Meu primeiro post
summary: Um resumo curto
date: 2026-01-01
draft: true
---

# Meu primeiro post

Conteúdo em **Markdown**.

Regras

    draft: true → não publica

    draft: false ou ausente → publica

    slug é gerado automaticamente a partir do título

👀 Preview local (Markdown)

Preview local com:

    mesmo parser de produção

    mesmo CSS do blog

    auto-reload ao salvar

deno run --allow-read scripts/preview.ts posts/2026-01-01-meu-post.md

Acesse:

http://localhost:8080

Publicar um post

Publica o Markdown no Deno KV (ignora drafts):

deno run \
    --allow-read \
    --allow-write \
    --unstable-kv \
    scripts/publish.ts posts/2026-01-01-meu-post.md

API
Listar posts

GET /posts?page=1

Resposta:

{
  "data": [...],
  "page": 1,
  "hasNext": true
}

Post individual

GET /posts/:id

Deploy no Deno Deploy

    Suba o projeto para um repositório GitHub

    Acesse https://dash.deno.com

    Crie um novo projeto

    Configure o entry point:

    main.ts

    Deploy

O Deno KV funciona automaticamente em produção.
Objetivos do projeto

    Demonstrar uma arquitetura simples e limpa

    Evitar frameworks desnecessários

    Manter custo zero ou mínimo

    Ser fácil de entender, manter e evoluir

Próximos passos (opcionais)

    Rota por slug (/posts/:slug)

    RSS

    Sitemap

    Cache HTTP mais agressivo

    SEO básico

    Busca simples

Licença

MIT
