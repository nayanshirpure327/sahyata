# TESTING.md

## Strategy
- **Unit tests**: Utils, validations, pure functions (Vitest)
- **Integration tests**: Server Actions + Prisma (Vitest)
- **E2E tests**: Critical user flows (Playwright)
- **Manual testing**: Mobile + Desktop before every major release

## Tools
- Vitest
- Playwright
- Testing Library (if needed)
- Prisma mock or test database

## Priority Test Cases
1. User can sign up and select college
2. Explore page shows nearby listings
3. Create PG listing
4. Create Marketplace item
5. Search works
6. Filters work correctly

## Commands
```bash
npm run test          # unit + integration
npm run test:e2e      # playwright
```