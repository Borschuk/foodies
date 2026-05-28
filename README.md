# NextLevel Food (foodies)

A community recipe platform built with Next.js where food lovers browse meals, read full recipes, and share their own dishes with images and instructions.

## Why this project is useful

- Demonstrates the Next.js App Router with nested routes, layouts, loading UI, and error boundaries in a real mini-app.
- Shows server-side data access (SQLite), Server Actions for forms, and client components where interactivity is needed.
- Works well as a portfolio piece or learning reference for full-stack patterns in a single Next.js codebase.

## Implemented features

- **App Router pages** — Home (`app/page.jsx`), community (`app/community`), meals list (`app/meals`), meal detail (`app/meals/[slug]`), and share form (`app/meals/share`).
- **Global layout and navigation** — Shared header with logo and active-route highlighting via `components/main-header/NavLink.jsx` and `usePathname`.
- **Meals catalog** — Grid of recipes loaded from SQLite with `Suspense` and a route-level loading state (`app/meals/loading.jsx`).
- **Meal details** — Dynamic pages by slug with `notFound()` when a meal does not exist (`app/meals/[slug]/page.jsx`).
- **Share a recipe** — Multi-field form with image picker preview, validation, and redirect after save (`app/meals/share/page.js`, `lib/actions.js`).
- **Server Actions** — `shareMeal` in `lib/actions.js` validates input and calls `saveMeal`.
- **Persistence** — `better-sqlite3` database (`meals.db`) with seed script `initdb.js`; images stored under `public/images/`.
- **Input safety** — Instruction HTML sanitized with `xss`; slugs generated with `slugify` in `lib/meals.js`.
- **UX polish** — Home image slideshow (`components/main-header/images/image-slideshow.jsx`), custom `app/not-found.jsx`, and meals segment error UI (`app/meals/error.jsx`).
- **Styling** — CSS Modules per page and component (for example `app/globals.css`, `*.module.css`).

Not implemented in this repo: Tailwind, dark/light theme toggle, i18n, Zustand, or TanStack Query.

## Tech stack

| Layer     | Technology                                                                |
| --------- | ------------------------------------------------------------------------- |
| Framework | [Next.js](https://nextjs.org/) 14 (App Router)                            |
| UI        | React 18, CSS Modules                                                     |
| Database  | [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (`meals.db`) |
| Utilities | `slugify`, `xss`                                                          |
| Tooling   | ESLint (`eslint-config-next`), Prettier                                   |

## Getting started

### Prerequisites

- Node.js 18+ (recommended for Next.js 14)
- npm (or another package manager)

### Install dependencies

```bash
npm install
```

### Initialize the database

Seed SQLite with sample meals (creates `meals.db` in the project root). Run this once on a fresh clone:

```bash
node initdb.js
```

### Start the development server

There is no separate backend service; the Next.js server reads and writes SQLite directly.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

## Scripts

| Command                | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start Next.js in development mode         |
| `npm run build`        | Create an optimized production build      |
| `npm start`            | Run the production server (after `build`) |
| `npm run lint`         | Run ESLint (Next.js config)               |
| `npm run format`       | Format the codebase with Prettier         |
| `npm run format:check` | Check formatting without writing files    |

## Project structure

```text
foodies/
├── app/                          # App Router routes and UI
│   ├── layout.js                 # Root layout, metadata, MainHeader
│   ├── page.jsx                  # Home (slideshow, CTAs)
│   ├── community/page.jsx        # Community perks page
│   ├── meals/
│   │   ├── page.jsx              # Meals list (Suspense + getMeals)
│   │   ├── [slug]/page.jsx       # Single meal detail
│   │   ├── share/page.js         # Share meal form (client + Server Action)
│   │   ├── loading.jsx           # Route loading UI
│   │   └── error.jsx             # Meals segment error boundary
│   ├── not-found.jsx             # Global 404 UI
│   └── globals.css               # Global styles
├── components/
│   ├── main-header/              # Header, nav, background, slideshow
│   └── meals/                    # Grid, item, form submit, image picker
├── lib/
│   ├── meals.js                  # SQLite access, saveMeal, getMeals, getMeal
│   └── actions.js                # Server Action: shareMeal
├── public/images/                # Meal images (seed + user uploads)
├── assets/icons/                 # Static icons (community page)
├── initdb.js                     # Create table and insert sample meals
├── meals.db                      # SQLite database (created by initdb.js)
├── jsconfig.json                 # Path alias: @/* → project root
└── next.config.js
```

Path alias: import from `@/components/...`, `@/lib/...`, etc. (see `jsconfig.json`).

## Usage example

1. Start the app (`npm run dev`) after installing dependencies and running `node initdb.js`.
2. Open **Meals** in the header to browse recipes (the list uses a deliberate delay in `getMeals` to demonstrate `Suspense` loading).
3. Click **View Details** on a card to open `/meals/<slug>`.
4. Use **Share your favorite recipe** on the meals page to submit a new meal; valid submissions are saved to SQLite and the image is written to `public/images/`.

Example share flow (Server Action):

```js
// lib/actions.js — called from the share form via formAction
export async function shareMeal(prevState, formData) {
  // validates fields, then saveMeal(meal) and redirect('/meals')
}
```

## Where to get help

- [Next.js documentation](https://nextjs.org/docs) — App Router, Server Actions, and deployment.
- [React documentation](https://react.dev/) — components, `Suspense`, and forms.
- Open an issue in this repository for bugs or questions specific to this project.
