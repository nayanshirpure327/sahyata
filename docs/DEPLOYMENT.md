# DEPLOYMENT.md

## Recommended Stack
- **Frontend + API**: Vercel
- **Database**: Supabase or Neon (PostgreSQL)
- **Auth**: Clerk
- **Storage**: Uploadthing or Supabase Storage
- **Maps**: Mapbox

## Environment Variables
See `.env.example`

## Steps
1. Create Vercel project → Import repo
2. Create Supabase / Neon project
3. Create Clerk application
4. Add all env vars in Vercel
5. Run `npx prisma db push` (or migrate)
6. Deploy

## Domains
- Production: campuslocal.in / campuslocal.app (example)
- Preview deployments automatic on Vercel

## Monitoring
- Vercel Analytics
- Sentry (optional later)