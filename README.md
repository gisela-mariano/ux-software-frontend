# UX Software Frontend

Este projeto é o frontend de uma aplicação e-commerce, desenvolvido para proporcionar uma interface intuitiva, modular e escalável, seguindo boas práticas de arquitetura e design de componentes.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Principais Ferramentas Utilizadas](#️principais-ferramentas-utilizadas)
- [Como rodar o projeto](#️principais-ferramentas-utilizadas)
  - [Online](#️principais-ferramentas-utilizadas)
  - [Localmente](#️principais-ferramentas-utilizadas)
- [Conceitos Apresentados](#conceitos-apresentados)

## Sobre o Projeto

O **UX Software Frontend** foi construído utilizando **Next.js** e **TypeScript**, com foco em usabilidade, performance e manutenção. Next.js traz recursos importantes como Server Side Rendering (SSR) e geração estática, tornando o projeto mais rápido e otimizado para SEO.

O desenvolvimento seguiu o conceito de **Atomic Design** para a organização dos componentes e a metodologia **BEM (Block Element Modifier)** para padronização dos estilos CSS e reusabilidade. Foram adotadas ferramentas modernas para UI, gerenciamento de estado, validação de formulários e internacionalização.

## Principais Ferramentas Utilizadas

- **Next.js**: Framework React para aplicações modernas, com SSR e geração estática.
- **React**: Biblioteca principal para construção da interface.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Tailwind CSS**: Utilitário CSS para estilização rápida e responsiva.
- **PrimeReact**: Biblioteca de componentes UI avançados e acessíveis.
- **Yup**: Validação de dados de formulários.
- **Formik**: Gerenciamento de formulários complexos.
- **next-intl**: Internacionalização da aplicação, facilitando múltiplos idiomas.
- **Atomic Design**: Organização dos componentes em átomos, moléculas, organismos, templates e páginas.
- **BEM CSS**: Convenção de nomenclatura para manter o CSS escalável e fácil de entender.
- **Fetch API**: Comunicação com a API backend.
- **ESLint e Prettier**: Padronização de código e estilo.

### Atomic Design

Documentação: https://atomicdesign.bradfrost.com/chapter-2/

Os componentes são organizados em cinco níveis:

- **Átomos:** Elementos básicos, como botões e inputs.
- **Moléculas:** Combinação de átomos, formando pequenas unidades funcionais.
- **Organismos:** Seções complexas compostas por moléculas e átomos.
- **Templates:** Estruturas de layout reutilizáveis.
- **Páginas:** Componentes de tela completos.

### 🎨 BEM CSS

Documentação: https://getbem.com/

A padronização dos estilos segue o padrão BEM, facilitando o entendimento e manutenção do CSS. Exemplo:

```css
.header__logo--large {
  ...;
}
.button--primary {
  ...;
}
```

### 🌍 Internacionalização

Utilizamos **next-intl** para oferecer suporte a múltiplos idiomas, tornando a aplicação adaptável a diferentes regiões.

## Como rodar o projeto

### Online:

Esse projeto foi publicado na vercel e está disponível no link: https://ux-software-frontend.vercel.app/

- ### Informações importantes:

  O usuário administrador padrão é:

  - email: john@doe.com
  - senha: 123456

### Localmente:

1. **Configure a API:**

   A API utilizada nesse projeto foi essa: [Marketplace API](https://github.com/gisela-mariano/ux-software-marketplace-api)

2. **Clone esse repositório:**

   ```bash
   git clone https://github.com/gisela-mariano/ux-software-frontend.git
   cd ux-software-frontend
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Crie e configure o .env com as seguintes chaves:**

   Essas chaves são o link onde a API do passo 1 [Marketplace API](https://github.com/gisela-mariano/ux-software-marketplace-api) está rodando.

   ```.env
   API_BASE_URL="http://localhost:3000"
   NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
   ```

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. **Acesse no navegador:**
   ```
   http://localhost:3000   -> ou se a API estiver rodando nessa porta, o next aponta para a porta 3001 (no terminal será exibido o link correto)
   ```

- ### Informações importantes:

  Na API apenas administradores (role ADMIN) podem criar produtos e não há uma rota que permita a alteração da role, então ela tem que ser modificada manualmente no banco de dados.

## Conceitos Apresentados

- **Componentização** e reutilização de UI.
- **Atomic Design** para escalabilidade.
- **BEM CSS** para organização de estilos.
- **Tailwind CSS** para estilização ágil.
- **PrimeReact** para UI avançada.
- **Formik & Yup** para gerenciamento e validação de formulários.
- **Zustand** para gerenciamento de estado.
- **Internacionalização com next-intl**.
- **Integração com API REST**.
- **Boas práticas de desenvolvimento frontend**.
- **Next.js** para SSR, rotas e otimização.

---

Made with ❤️ by [gisela-mariano](https://github.com/gisela-mariano)
