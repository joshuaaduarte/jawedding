Wedding website built with [Next.js](https://nextjs.org).

## Getting Started

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Routes

- `/` public landing page with generic wedding information
- `/login` invite-code guest login
- `/portal` protected page with personalized timeline and RSVP content
- `/portal/registry` protected registry page
- `/portal/stay` protected places-to-stay page
- `/portal/things-to-do` protected local activities page
- `/portal/carpool` protected ride-share board for SFO/OAK/SJC arrivals
- `/admin/login` admin login
- `/admin` admin dashboard for RSVP submissions

## Environment Variables

- `AUTH_SESSION_SECRET`: reserved for future auth hardening/custom secrets
- `ADMIN_PORTAL_PASSWORD`: password for admin dashboard access

## Notes

- Guest records and invite codes live in `/Users/joshuaduarte/Documents/projects/jawedding/jandawedding/lib/guest-data.ts`.
- The `/portal` route is protected by `/Users/joshuaduarte/Documents/projects/jawedding/jandawedding/proxy.ts` and a secure HTTP-only cookie.
- RSVP submissions are saved to `/Users/joshuaduarte/Documents/projects/jawedding/jandawedding/data/rsvps.json`.
- Carpool posts are saved to `/Users/joshuaduarte/Documents/projects/jawedding/jandawedding/data/carpool.json`.

## Temporary Login Info (for testing)

- Guest login page: `/login`
- Guest test accounts:
  - Invite code `JAX-2401` + last name `Rivera`
  - Invite code `JAX-2402` + last name `Chen`
  - Invite code `JAX-2403` + last name `Parker`
  - Invite code `JAX-2404` + last name `Lewis`
- Admin login page: `/admin/login`
- Default admin password: `admin-temp-2026` (override in `.env.local`)
