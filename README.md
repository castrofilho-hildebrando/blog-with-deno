# Blog About Architecture

Um blog técnico construído com **Deno + Fresh** usando **Clean Architecture** de forma explícita, pragmática e testável.

Este projeto não é um “exemplo de framework”.  
Ele existe para **estudar e demonstrar arquitetura de software na prática**.

---

## Objetivo

- Aplicar **Clean Architecture** em um projeto web real
- Manter **frameworks como detalhe**
- Usar **TypeScript estrito**
- Ter **casos de uso testáveis**, sem HTTP, banco ou mocks mágicos
- Evitar overengineering e dependências desnecessárias

---

## Stack

- **Runtime:** Deno
- **Framework web:** Fresh (SSR)
- **Linguagem:** TypeScript
- **Banco:** SQLite
- **Arquitetura:** Clean Architecture
- **Editor:** Zed (com limitações conhecidas de JSX)

Sem Tailwind.  
Sem React no cliente.  
Sem `node_modules`.

---

## Estrutura do Projeto

routes/ # Adaptadores Fresh (HTTP / SSR)
static/ # CSS e assets estáticos

src/
├── domain/ # Entidades puras
├── application/ # Casos de uso e contratos
│ ├── usecases/
│ ├── ports/
│ └── errors/
├── infrastructure/ # Banco, e-mail, detalhes técnicos
└── interfaces/ # Controllers HTTP, i18n, adapters


### Regra fundamental

> **Dependências sempre apontam para dentro.**

Frameworks conhecem a aplicação.  
A aplicação **não conhece frameworks**.

---

## Camadas (Clean Architecture)

### Domain
- Entidades puras (`Article`, `Subscriber`)
- Nenhuma dependência externa
- Nenhum framework
- Nenhum detalhe técnico

### Application
- Casos de uso (`CreateArticle`, `ListArticles`, `SubscribeUser`, etc.)
- Portas (`ArticleRepository`, `EmailService`)
- Erros semânticos (ex.: `MissingArticleDataError`)
- Totalmente testável

### Infrastructure
- Implementações concretas (SQLite, SMTP)
- Detalhes “sujos”
- Substituíveis sem impacto no domínio

### Interfaces
- Controllers HTTP
- Tradução de erros
- i18n
- Adaptação para o mundo externo

### Routes (Fresh)
- Apenas roteamento e SSR
- Nenhuma regra de negócio
- Chamam controllers ou use cases

---

## Casos de Uso Implementados

- Criar artigo
- Listar artigos
- Assinar o blog
- Notificar assinantes
- Todos com testes unitários puros

---

## Testes

Os testes:
- Ficam próximos aos casos de uso (`tests/`)
- Não usam HTTP
- Não usam banco
- Não usam mocks de framework
- Testam **comportamento**, não implementação

Exemplo:

```ts
SubscribeUser.test.ts
NotifySubscribers.test.ts
CreateArticle.test.ts
```

## Internacionalização (i18n)

Casos de uso não retornam mensagens
Erros são semânticos, não textuais
Tradução acontece na camada de interface

Exemplo de código de erro:
TITLE_AND_CONTENT_ARE_MANDATORY

A interface decide como apresentar isso ao usuário.

Sobre JSX, Fresh e o Editor

Este projeto usa JSX moderno com Fresh + Preact.

⚠️ Nota importante sobre o editor (Zed):

O runtime, build e deno check funcionam corretamente
O Zed pode apresentar falsos positivos em arquivos .tsx

Em alguns casos usamos:

// @ts-nocheck

Isso não afeta:

runtime
build
testes
arquitetura

É apenas uma limitação atual do editor.

Como rodar o projeto
deno task start

Acesse:

http://localhost:8000

Motivação

Este projeto foi criado para:

aprendizado profundo
escrita de artigos técnicos
estudo de trade-offs reais
evitar exemplos artificiais

Se algo aqui parece “mais complexo do que o normal”,
provavelmente é intencional.

Licença

Uso educacional e experimental.
