# Nyaya — Legal Awareness Platform (Frontend)

React frontend for a public legal-information platform. Connects to the
companion Django REST API (`nyaya-backend/`) for live data, and gracefully
falls back to local sample data if that backend isn't running.

## Stack

React 18 · Vite · JavaScript · React Router 6 · Tailwind CSS · Lucide React

## Getting started

```bash
npm install
cp .env.example .env   # optional — only needed if your backend runs somewhere else
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Running with the backend

This frontend expects the Django backend (see `nyaya-backend/README.md`) at
`http://127.0.0.1:8000/api` by default. Run both at the same time, in two
separate terminal windows:

```bash
# Terminal 1 — backend
cd nyaya-backend
venv\Scripts\Activate.ps1     # or: source venv/bin/activate
python manage.py runserver

# Terminal 2 — frontend
cd nyaya
npm run dev
```

**If the backend isn't running**, pages don't break — each one falls back to
its local sample data (from `src/data/*.js`) and shows a small "offline"
notice. This means you can always run the frontend on its own for layout
work, even without the backend up.

To point the frontend at a different backend URL (e.g. once deployed),
copy `.env.example` to `.env` and change `VITE_API_BASE_URL`. Vite needs a
restart after adding or editing `.env`.

## Project structure

```
src/
├── api/            client.js — all fetch calls to the Django backend
├── hooks/          useApi.js — data-fetching hook with offline fallback
├── components/     Reusable UI: Navbar, Footer, Hero, cards, forms, etc.
├── pages/          One file per route (see src/App.jsx for the route map)
├── data/           Sample/fallback content — used when the backend is offline
└── index.css       Design tokens applied as Tailwind base/component layers
```

## Design system

Colors, type, and the "article tab" signature motif are defined in
`tailwind.config.js` (color tokens) and `src/index.css` (`.article-tab`,
`.rule-divider`, `.card-surface` utility classes). See the theme.extend block
in `tailwind.config.js` for the full palette and rationale.

## The "I Have Been Harmed" flow

`SituationForm` submits to the backend's `POST /api/situations/analyze/`,
which currently returns a fixed, clearly-labelled **placeholder** result —
there is no AI or legal-matching engine behind it yet. The result travels to
`/harmed/result` via React Router navigation state, not a URL, so refreshing
that page (or linking to it directly) redirects back to the form.

## Notes

- All legal content (laws, sections, articles, glossary terms) is placeholder
  content — it is not verified legal information and should not be treated
  as authoritative. Edit real content via the backend's Django admin panel.
- No `localStorage`/`sessionStorage` is used; all state is in-memory React state.
- CORS is only opened for `localhost:5173` / `127.0.0.1:5173` on the backend
  side — update `CORS_ALLOWED_ORIGINS` there if you run the frontend elsewhere.
