# NLW Agents

Este projeto foi desenvolvido durante o evento NLW da Rocketseat.

## Tecnologias e Bibliotecas Principais

- **React**: Biblioteca principal para construção da interface.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Vite**: Ferramenta de build e desenvolvimento rápido.
- **React Router DOM**: Gerenciamento de rotas SPA.
- **React Query**: Gerenciamento de estado assíncrono e cache de dados.
- **TailwindCSS**: Utilitário para estilização rápida e responsiva.
- **Radix UI**: Componentes acessíveis e semânticos.
- **Lucide React**: Ícones SVG para React.
- **Class Variance Authority, clsx, tailwind-merge**: Utilitários para manipulação de classes CSS.
- **@biomejs/biome**: Linter e formatter para o código.

## Padrões de Projeto

- **Componentização**: Interface dividida em componentes reutilizáveis.
- **Hooks**: Uso extensivo de hooks do React e custom hooks.
- **Atomic Design** (opcional, se aplicável): Organização dos componentes por nível de complexidade.
- **Gerenciamento de estado**: React Query para dados assíncronos e hooks para estado local.

## Setup e Configuração

1. **Clone o repositório**

   ```bash
   git clone <url-do-repo>
   cd nlw-agents/web
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Rode o projeto em modo desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Build para produção**

   ```bash
   npm run build
   ```

5. **Preview do build**
   ```bash
   npm run preview
   ```

## Observações

- Certifique-se de ter o Node.js instalado (recomendado versão 18+).
- O projeto utiliza Vite, então as variáveis de ambiente podem ser configuradas em um arquivo `.env` na raiz, se necessário.
- Para garantir a qualidade do código, utilize o Biome:
  ```bash
  npx biome check .
  ```
