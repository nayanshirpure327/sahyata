# AGENTS.md – Instructions for AI Coding Agents

You are an AI coding agent working on **CampusLocal** – a location-based student life platform that helps students discover everything nearby: PG, tiffin, jobs, notes, books, laundry, events, medical stores, and more.

## Project Vision
Help new and existing students (especially those new to a city/college) quickly understand and navigate their local area with verified, student-focused information and community features.

## Tech Stack (Locked)
- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: Clerk (preferred) or NextAuth.js
- **Maps**: Mapbox GL JS or Google Maps
- **Search**: Meilisearch or PostgreSQL full-text (start with Postgres)
- **Storage**: Uploadthing or AWS S3
- **State**: Zustand (client) + React Server Components
- **Validation**: Zod
- **Deployment**: Vercel + Supabase (or Neon)

## Coding Rules
1. Always use TypeScript. Strict mode.
2. Prefer Server Components. Use `"use client"` only when necessary.
3. Use Prisma for all database access. Never write raw SQL unless needed for PostGIS.
4. All forms must use Zod + React Hook Form (or Server Actions).
5. Location is core – every major listing should support lat/lng + city/college filtering.
6. Keep components small and focused.
7. Write meaningful commit messages.
8. Never commit `.env` files.
9. Add loading.tsx and error.tsx where appropriate.
10. Prioritize mobile-first design.

## Folder Conventions
- `src/app/(main)/` → Protected student area
- `src/components/ui/` → shadcn components only
- `src/lib/` → Pure utilities, db client, validations
- Feature-specific components go inside their route folders when possible

## Priority Order for Development
1. Auth + User onboarding (select college/city)
2. Location-based Explore page
3. Core modules: Stay (PG), Food (Tiffin), Jobs
4. Marketplace (Buy/Sell)
5. Resources (Notes, PYQs, Books)
6. Services, Events, Health, Skills

## When Generating Code
- Always check existing files before creating new ones.
- Follow the design system in `docs/DESIGN.md`.
- Update `docs/FEATURES.md` and `docs/DATABASE.md` when adding new entities.
- Prefer Server Actions over API routes for mutations.
- Use optimistic updates for better UX where it makes sense.

## Current Status
This is a fresh scaffold. Start by implementing authentication and the location/college selector.