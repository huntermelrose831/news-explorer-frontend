# News Explorer Frontend

A React + Vite application for searching news, saving articles, and managing saved items.

## Live demo

https://huntermelrose831.github.io/news-explorer-frontend/

---

## Table of contents

- [Overview](#overview)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Development workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Stage 1 checklist](#stage-1-checklist)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

News Explorer is a simple news aggregation front-end built with React and Vite. Users can search the News API for articles, save favorites, and view saved articles on a dedicated page.

Key features:

- Search news by keyword (News API)
- Save and remove articles (mock backend via localStorage)
- Authentication flows (signup / sign-in mocks)
- Responsive design for desktop, tablet, and mobile

---

## Getting started

### Prerequisites

- Node.js (v16+ recommended)
- npm (or yarn / pnpm)

### Install

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd news-explorer-frontend
npm ci --legacy-peer-deps
```

Create an environment file and add any required API keys:

```bash
cp .env.example .env
# Edit .env: VITE_NEWS_API_KEY, VITE_BACKEND_URL
```

### Run (development)

```bash
npm run dev
# Open http://localhost:5173
```

### Build / Preview (production)

```bash
npm run build
npm run preview
# Preview server runs locally to validate production output
```

---

## Available scripts

- `npm run dev` — start the dev server
- `npm run build` — create production build in `dist/`
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint
- `npm run test` — run unit tests (Vitest)
- `npm run test:ci` — run tests once (CI)

---

## Project structure

```
src/
├── components/      # React components (App, Header, Navigation, NewsCard, etc.)
├── contexts/        # React context providers (Auth)
├── utils/           # API and helper functions
├── assets/          # Images and fonts
└── main.jsx         # App entry (Router setup)
```

---

## Deployment

This project uses GitHub Actions to build and deploy to GitHub Pages. The site is published at:

https://huntermelrose831.github.io/news-explorer-frontend/

Workflow files:

- `.github/workflows/ci.yml` — lint & tests for pushes/PRs
- `.github/workflows/pages-deploy.yml` — builds and deploys to `gh-pages`

To force a rebuild and deploy, push changes to the `main` branch or run the `Pages Deploy` workflow manually from the Actions tab.

---

## Configuration

- Vite picks up env vars from `.env*` files (prefix with `VITE_` to expose to the client)
- Base path for production may be set via `vite.config.js` when hosting under a subpath

---

## Development workflow

- Use feature branches and open PRs against `main`
- Run lint and tests before creating a PR
- Follow BEM-like CSS conventions and keep components small and focused

---

## Troubleshooting

- If the live site shows 404s for assets (e.g., `src/main.jsx`), verify that GitHub Pages is serving the `gh-pages` branch (not the repo root) and that the deploy workflow completed successfully.
- If Node or Vite warns about Node versions, upgrade local Node or pin a compatible version in CI.

---

## Stage 1 checklist

Ensure all items below are addressed before submission:

- [ ] A PR link is included when requesting review
- [ ] The project builds and runs without errors
- [ ] News API search integration works
- [ ] `/saved-news` route exists and is accessible
- [ ] Frontend is deployed to a remote host (GitHub Pages is acceptable for Stage 1)

Acceptance criteria highlights:

- Responsive layout matches design on target resolutions (desktop / tablet / mobile)
- Semantic HTML and accessible markup are used
- Components are reusable and follow best practices
- No blocking ESLint warnings or failing tests

---

## Contributing

1. Fork the repo
2. Create a feature branch `git checkout -b feature/your-feature`
3. Commit changes and open a PR against `main`

---

## License

This project is part of a training curriculum. All rights reserved.
