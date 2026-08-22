# API.md

Most mutations will use **Server Actions**.  
Public read APIs and mobile clients can use Route Handlers.

## Base URL
`/api`

## Authentication
All protected routes require Clerk session.

## Endpoints (Planned)

### Auth
- Handled by Clerk

### User
- `GET /api/user/me`
- `PATCH /api/user/profile`
- `POST /api/user/set-location`

### Listings (Generic pattern)
- `GET /api/listings?type=pg&city=...&lat=...&lng=...`
- `GET /api/listings/:id`
- `POST /api/listings`
- `PATCH /api/listings/:id`
- `DELETE /api/listings/:id`

### Marketplace
- `GET /api/marketplace`
- `POST /api/marketplace`
- `POST /api/marketplace/:id/interest`

### Resources
- `GET /api/resources/notes`
- `POST /api/resources/notes`
- `GET /api/resources/pyqs`

### Search
- `GET /api/search?q=...&type=...`

## Response Format
```json
{
  "success": true,
  "data": {},
  "error": null
}
```

## Error Codes
- 400 Validation error
- 401 Unauthorized
- 403 Forbidden
- 404 Not found
- 429 Rate limited
- 500 Server error