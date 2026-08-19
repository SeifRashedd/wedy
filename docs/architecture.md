# Architecture

## Overview

Wedy is a single Next.js application that serves both the marketing site and all customer wedding invitations. There is **one deployment** — invitations are rendered dynamically at `/i/[slug]`.

```
Customer Flow:
  Landing → Templates → Create Form → Checkout → Admin Approval → /i/[slug]

Admin Flow:
  Login → Dashboard → Approvals → Invitation Active
```

## Directory Structure

```
src/
├── app/
│   ├── (site)/          # Marketing site + admin (with header/footer)
│   │   ├── page.tsx     # Landing page
│   │   ├── templates/
│   │   ├── create/[templateId]/
│   │   ├── preview/[templateId]/
│   │   ├── checkout/
│   │   ├── login/
│   │   └── admin/       # Protected admin dashboard
│   ├── i/[slug]/        # Public invitation URLs (no site chrome)
│   └── api/             # REST API routes
│
├── templates/           # Isolated wedding templates
│   ├── template-01/
│   ├── template-02/
│   ├── template-03/
│   └── registry.ts      # Template registration
│
├── components/          # Shared UI components
├── services/            # Business logic (orders, invitations)
├── lib/                 # Utilities, Supabase clients, mock store
└── types/               # TypeScript interfaces
```

## Key Architectural Decisions

### 1. Template Isolation

Each template lives in its own folder with:
- `TemplateXX.tsx` — main component
- `config.ts` — fields, price, steps
- `components/` — template-specific UI
- `assets/` — template-specific assets
- `styles/` — template-specific styles (if needed)

Templates receive `InvitationData` as props. Each template decides which fields to render.

### 2. Dynamic Invitation Rendering

```
URL: /i/ahmed-nour
  ↓
slug lookup (database or mock store)
  ↓
invitation record (template_id + data)
  ↓
registry.getTemplate(template_id)
  ↓
<TemplateComponent data={invitation.data} />
```

### 3. Demo Mode

When Supabase env vars are missing, the app uses `lib/mock-store.ts` with seed data. This allows local development without database setup.

### 4. Payment Architecture

Manual payment flow (InstaPay / Vodafone Cash):
1. Customer uploads payment screenshot
2. Order status → `pending`
3. Admin reviews and approves/rejects
4. On approval → invitation activated with 30-day expiry

Designed to be extensible — a payment gateway can be added via a `PaymentProvider` interface later.

### 5. Admin Authentication

- **Production:** Supabase Auth with admin profiles table
- **Demo:** Cookie-based auth (`wedy_admin_demo`) with hardcoded credentials

Admin routes are protected in `admin/layout.tsx` and API routes use `verifyAdmin()`.

### 6. Storage

| Bucket | Access | Purpose |
|--------|--------|---------|
| `payment-screenshots` | Private | Payment proof uploads |
| `wedding-images` | Public | Couple photos, gallery |

Images are stored in Supabase Storage, not in PostgreSQL JSONB.

## Database Schema

See `supabase/schema.sql` for full schema.

Core tables:
- `templates` — template metadata
- `orders` — customer orders with payment info
- `invitations` — active/expired invitations
- `profiles` — admin users linked to Supabase Auth

## Security

- Service role key is server-only (API routes)
- Admin routes require authentication
- File uploads validated (type + size)
- RLS policies on all Supabase tables
- No public admin registration

## URL Structure

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/templates` | Browse templates |
| `/create/[templateId]` | Multi-step invitation form |
| `/preview/[templateId]` | Full template preview |
| `/checkout` | Payment + order submission |
| `/i/[slug]` | Live invitation |
| `/login` | Admin login |
| `/admin/*` | Admin dashboard |
