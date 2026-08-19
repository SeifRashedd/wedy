# Wedy — Premium Digital Wedding Invitations

A complete wedding digital invitation platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Beautiful landing page with template browsing
- Isolated, code-based wedding invitation templates
- Multi-step invitation creation form with live preview
- Manual payment flow (InstaPay / Vodafone Cash)
- Admin dashboard with approvals, sales analytics, and invitation management
- Unique invitation URLs (`/i/ahmed-nour`)
- Demo mode for local development without Supabase

## Requirements

- Node.js 18+
- npm
- Supabase account (optional for demo mode)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Mode

Without Supabase configured, the app runs with mock data:

- **Admin login:** `admin@wedy.eg` / `admin123`
- **Sample invitations:** `/i/ahmed-nour`, `/i/omar-salma`, `/i/youssef-jana`

## Environment Variables

See `.env.example` for all required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only service role key |
| `NEXT_PUBLIC_APP_URL` | App URL for invitation links |

## Supabase Setup

1. Create a Supabase project
2. Run `supabase/schema.sql` in the SQL Editor
3. Create storage buckets:
   - `payment-screenshots` (private)
   - `wedding-images` (public)
4. Copy your project URL and keys to `.env.local`

### Creating an Admin Account

1. Go to Supabase Dashboard → Authentication → Users
2. Create a new user with email/password
3. Run in SQL Editor:

```sql
INSERT INTO profiles (id, email, role)
VALUES ('YOUR_USER_UUID', 'admin@wedy.eg', 'admin');
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── templates/        # Wedding invitation templates (isolated)
├── components/       # Shared UI components
├── services/         # Business logic
├── lib/              # Utilities, Supabase, mock store
└── types/            # TypeScript types
docs/                 # Documentation
supabase/             # Database schema
```

## Adding a New Template

See [docs/template-development.md](docs/template-development.md) for the full guide.

Quick version:

1. Create `src/templates/template-04/` with `Template04.tsx` and `config.ts`
2. Register in `src/templates/registry.ts`
3. Done — no other files need changing

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/templates` | Browse templates |
| `/create/[id]` | Create invitation |
| `/preview/[id]` | Preview template |
| `/checkout` | Payment & order |
| `/i/[slug]` | Live invitation |
| `/login` | Admin login |
| `/admin` | Admin dashboard |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase PostgreSQL
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Icons:** Lucide React
- **Charts:** Recharts
- **Animation:** Framer Motion

## License

Private — All rights reserved.
