# MarvelComics (Desafio Técnico) – Documentação

## 1. Visão Geral
Aplicação Next.js(App Router) para listar HQs da Marvel(Referências 13), visualizar detalhes e um carrinho simples de compras:
- `/`: lista HQs com paginação (25 por página). Dados via Marvel API usando RTK Query.
- `/comic/[id]`: detalhe de um quadrinho e ações de adicionar, aumentar, reduzir quantidade no carrinho.
- `/cart`: exibe itens do carrinho, permite alterar quantidades, remover, limpar carrinho e simular checkout apenas um alerta "Compra realizada".

Fluxo: Usuário navega, seleciona HQs, adiciona ao carrinho e finaliza (estado é resetado ao recarregar a página por que não há persistência dos dados do carrinho).

Acesse a aplicação aqui -> [https://marvelcomics-nu.vercel.app](https://marvelcomics-nu.vercel.app).

## 2. Dependências/Bibliotecas
- `next`: Framework React, roteamento via App Router.
- `typescript`: Tipagem da aplicação.
- `styled-components`: Estilização.
- `@reduxjs/toolkit` & `react-redux`: Estado global (cart) e RTK Query para chamadas à API Marvel.
- `cypress`: Testes end-to-end.

## 3. Variáveis de Ambiente
`.env`:
```
NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY=<chave>
```

`NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY` (chave pública Marvel).
- No Docker use `--build-arg NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY=<chave>` no momento do build para a aplicação visualizar a variável.

## 4. Comandos Principais
Antes instale as dependências: usando `npm install`
```powershell
# Executa projeto localmente na rota: http://localhost:3000, certifique-se de ter criado o arquivo .env (3. Variáveis de Ambiente)
npm run dev

# Lint
npm run lint

# Build de produção
npm run build

# Executa ambiente de produção
npm run start

# Visualizar/executar Testes E2E
npm run cy:open
```

## 5. Estrutura de Pastas
```
src/app          # Roteamento de páginas do Next(App Router)
src/components   # Componentes UI reutilizáveis
src/layouts      # Layouts básicos
src/lib/redux    # Store, slices e hooks
src/model        # Tipos
src/util         # Helpers (imagem / formatação de moeda)
cypress          # Testes e fixtures e2e
```

## 6. Docker
Dockerfile (Node 20). A variável precisa ser passada no momento do build!.
Na raiz do projeto, execute:
Build:
```powershell
docker build --build-arg NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY=<chave> -t marvel-comics:latest .
```
Executa um container:
```powershell
docker run -p 3000:3000 marvel-comics:latest
```

## 7. Melhorias / Próximos Passos
- Persistir carrinho em `localStorage` ou `IndexedDB`.
- Testes unitários.
- Melhorar Lint utilizando Prettier.
- SSR/ISR da lista inicial para performance e SEO.
- Feature de busca e filtros.
- Internacionalização (i18n Next) en/pt..

## 8. Referências
- Marvel Developer Portal: https://developer.marvel.com
- Next.js Docs: https://nextjs.org/docs
- Redux Toolkit: https://redux-toolkit.js.org
- Cypress: https://docs.cypress.io