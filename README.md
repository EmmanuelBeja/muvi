# Movies App

A React + TypeScript application built with Vite, TailwindCSS, shadcn/ui, Zustand, TanStack React Router, and React Query.  
This project demonstrates a modern frontend stack with clean state management, routing, and API integration (TMDB).

---

## 🎨 Design Documentation

The UI/UX designs were created in **Figma**.  
👉 [View full Figma file](https://www.figma.com/proto/uOhjpyhNqxcMKZHh0sww4T/Movies?node-id=13-21&t=fre0YNCmw8fqB5Jt-1&scaling=contain&content-scaling=fixed&page-id=0%3A1)

For exported design screenshots, see [`/docs/designs/`](./docs/designs/README.md).

---

## Tech Stack

- **React + TypeScript** (via Vite)
- **TailwindCSS** for styling
- **shadcn/ui** for accessible, reusable UI components
- **TanStack React Router** for routing
- **TanStack React Query** for data fetching/caching
- **Zustand** for state management
- **Cypress** for end-to-end testing

---

## Node.js Version

This project uses a specific Node.js version managed via [nvm](https://github.com/nvm-sh/nvm).  
The version is pinned in the [`.nvmrc`](./.nvmrc) file.

```
# Use the correct version
nvm use
```

## Getting Started

```

Copy code

# Clone repo

git clone git@github.com:EmmanuelBeja/movies.git

# Install dependencies

npm install

# Run dev server

npm run dev

```

## Environment Variables

This project requires environment variables (e.g., TMDB API keys).
Use the provided .env.example as a template:

```
# Copy example env file

cp .env.example .env
```

Fill in the required values before running the app.

## Testing

This project uses Cypress for end-to-end (E2E) testing.

### Run Cypress in Interactive Mode

Launch the Cypress Test Runner UI to run and debug E2E tests interactively:

```
npm run cypress:open
```

### Run Cypress in Headless Mode

Run all E2E tests in the terminal (useful for CI/CD):

```
npm test
```

## Architecture Decision Records (ADRs)

This project documents key technical decisions using ADRs.
You can find them in /docs/adrs.

NOTE: Don’t manually edit routeTree.gen.ts.
