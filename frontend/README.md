# Task Manager — Frontend

React + Vite + Supabase + Tailwind frontend for the Task Manager app.

## 1. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run the SQL files from `../../db/` (schema.sql → rls.sql → seed.sql) in the Supabase SQL editor. See `../../db/README.md` for detailed steps.

## 2. Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Find the values in your Supabase project: **Settings → API**

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Run Locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## 4. Netlify Deployment

1. Push this repo to GitHub.
2. Connect the repo in the Netlify dashboard.
3. Set build command to `npm run build` and publish directory to `dist` (already configured in `netlify.toml`).
4. Add environment variables in **Netlify → Site settings → Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy. The `netlify.toml` handles SPA redirects automatically.
