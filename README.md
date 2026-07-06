# Formula LAM — Team Website

Self-hosted website for the **Lycée des Arts et Métiers** Shell Eco-marathon team
(Electric Autonomous Prototype). Handles team representation, recruitment, news,
sponsors, and vehicle presentation, with a built-in admin panel for editing all content.

## Stack

- **Next.js 15** (App Router) — public site + admin panel
- **PostgreSQL 16** + **Prisma** — content storage
- Image uploads stored on a Docker volume
- Everything runs via **Docker Compose**

## Features

Public site:

- **Home** — team intro, latest news, links to car & sponsors
- **Team** — member roster with photos
- **Car** — vehicle description, specs, and photo gallery
- **News** — posts with cover images
- **Sponsors** — grouped by tier (platinum/gold/silver/supporter)
- **Join Us** — all 10 open positions with full descriptions and an **Open/Closed** status,
  plus a recruitment application form that saves submissions to the database

Admin panel (`/admin`):

- Manage team members, news posts, positions, sponsors, and the vehicle page
- Review and triage incoming applications
- Edit global site settings (team name, tagline, about text, contact email)

## First-time setup

1. Copy the env template and fill in real values:

   ```bash
   cp .env.example .env
   ```

   Set a strong `DB_PASS`, a random `SESSION_SECRET` (`openssl rand -base64 32`),
   and a strong `ADMIN_PASSWORD`.

2. Start the stack:

   ```bash
   docker compose up -d
   ```

   On first start the app runs database migrations and seeds an admin account
   (from `ADMIN_USER` / `ADMIN_PASSWORD`) plus placeholder content.

3. Open <http://localhost:3000> for the public site, and <http://localhost:3000/admin>
   to log in and start editing.

## Replacing placeholder content

The seed data is all placeholder — swap it from the admin panel (no code changes needed):

- Team member names, roles, photos
- Sponsor names, logos, links, tiers
- Vehicle description, specs, and gallery photos
- About text, tagline, and contact email under **Settings**

The 10 recruitment positions are pre-loaded with real role descriptions and can be
edited, opened/closed, or removed from **Admin → Positions**.

## Data & backups

- App data persists in the `db-data` (Postgres) and `uploads-data` (uploaded images) volumes.
- `docker compose down` stops the stack; data is kept.
- `docker compose down -v` **deletes all content** — only run this to wipe the site.

## Branding assets

- `public/brand/logo.png` — Formula LAM logo
- `public/fonts/Formula1-Wide.ttf` — display font, used only for large headings

> Note: the Formula 1 "Wide" typeface is proprietary. Confirm you have the right to
> use/redistribute it before making this repository public.
