# ARCHITECTURE.md

## High-Level Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│  PostgreSQL +    │────▶│  File Storage   │
│  (Vercel)       │     │  Prisma          │     │  (S3/Uploadthing)│
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                        │
         │                        ▼
         │               ┌──────────────────┐
         └──────────────▶│  Meilisearch /   │
                         │  Postgres FTS    │
                         └──────────────────┘
```

## Key Decisions
- **Monolith first**: Next.js App Router with Server Actions + API routes
- **Database**: PostgreSQL (with PostGIS later for advanced geo queries)
- **Auth**: Clerk (handles Google + email magic links + college domain verification)
- **Maps**: Mapbox (cheaper at scale) or Google Maps
- **Search**: Start with Prisma + Postgres full-text, migrate to Meilisearch when needed
- **Realtime**: Optional later (Pusher/Ably for chat)

## Folder Strategy
- Route groups: `(auth)`, `(main)`
- Feature folders under `(main)`
- Shared UI in `components/ui`
- Business logic in `lib/`

## Data Flow
1. User selects College/City → stored in profile + cookie
2. All listing queries filtered by city/college + distance
3. Server Components fetch data → pass to Client Components for interactivity
4. Mutations via Server Actions

## Future Scalability
- Multi-city support from day one (city_id foreign key)
- Soft delete + moderation flags
- Caching with React Cache + Vercel KV later