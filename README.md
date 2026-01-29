# Blog About Architecture

Este projeto é um blog técnico construído com **Deno + Fresh**
utilizando **Clean Architecture** de forma rigorosa e prática.

## Objetivo

Demonstrar como aplicar:
- Clean Architecture
- TypeScript forte
- Casos de uso testáveis
- Framework como detalhe

## Estrutura

src/
├── domain # Entidades puras
├── application # Casos de uso e contratos
├── infrastructure # Banco, e-mail, detalhes técnicos
└── interfaces # Controllers, i18n, adaptação HTTP


O diretório `routes/` pertence exclusivamente ao Fresh
e atua apenas como adaptador.

## Regras Arquiteturais

- Use cases não conhecem framework
- Domínio não conhece idioma
- Infra depende de portas
- Erros são semânticos, não textuais

## Testes

Os testes validam comportamento de casos de uso,
sem HTTP, sem banco e sem mocks mágicos.

## Motivação

Este projeto existe para estudo e escrita
sobre arquitetura de software na prática.
