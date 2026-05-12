# jandawedding
Wedding website for Ana Lima and Joshua Duarte, built with Next.js.

## What this app includes

- Public landing page with wedding details and photos
- Guest login with invite code + last name
- Protected guest portal with itinerary, RSVP, travel info, and more
- Honeymoon fund page
- Admin dashboard for guests, events, messages, RSVPs, and travel posts
- English and Spanish support

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with the required values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PORTAL_PASSWORD=your_admin_password
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Main routes

### Public
- `/` landing page
- `/login` guest login

### Guest portal
- `/portal`
- `/portal/rsvp`
- `/portal/itinerary`
- `/portal/our-story`
- `/portal/bridal-party`
- `/portal/honeymoon-fund`
- `/portal/stay`
- `/portal/things-to-do`
- `/portal/travel-board`

### Admin
- `/admin/login`
- `/admin`
- `/admin/guests`
- `/admin/groups`
- `/admin/events`
- `/admin/messages`
- `/admin/travel`

## Authentication

- Guest login uses invite code + last name, then stores a secure HTTP-only cookie with the authenticated guest ID.
- `/portal/*` routes are protected by `proxy.ts` plus server-side auth checks.
- Admin login uses `ADMIN_PORTAL_PASSWORD` and an admin auth cookie.

## Data storage

This app uses Supabase for application data, including:

- `guests`
- `groups`
- `events`
- `rsvps`
- `messages`
- `travel_posts`

## Notes

- `AUTH_SESSION_SECRET` is mentioned in older docs/comments but is not currently required by the active code.
- `resend` is installed as a dependency, but email flows are not documented in this README yet.
