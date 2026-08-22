# DATABASE.md

## Database: PostgreSQL + Prisma

### Core Models (MVP)

```prisma
model User {
  id            String   @id @default(cuid())
  clerkId       String   @unique
  email         String   @unique
  name          String?
  image         String?
  phone         String?
  collegeId     String?
  cityId        String?
  year          Int?
  course        String?
  role          Role     @default(STUDENT)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  college       College? @relation(fields: [collegeId], references: [id])
  city          City?    @relation(fields: [cityId], references: [id])
  listings      Listing[]
  marketplaceItems MarketplaceItem[]
  reviews       Review[]
}

model City {
  id        String   @id @default(cuid())
  name      String
  state     String
  country   String   @default("India")
  slug      String   @unique
  colleges  College[]
  users     User[]
  listings  Listing[]
}

model College {
  id        String   @id @default(cuid())
  name      String
  slug      String
  cityId    String
  city      City     @relation(fields: [cityId], references: [id])
  users     User[]
  listings  Listing[]
}

model Listing {
  id          String      @id @default(cuid())
  title       String
  description String?
  type        ListingType // PG, TIFFIN, JOB, SERVICE, EVENT, HEALTH, etc.
  price       Int?
  priceUnit   String?     // per month, per day, etc.
  address     String?
  lat         Float?
  lng         Float?
  cityId      String
  collegeId   String?
  ownerId     String
  images      String[]
  meta        Json?       // flexible fields (gender, foodIncluded, etc.)
  isActive    Boolean     @default(true)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  city        City        @relation(fields: [cityId], references: [id])
  college     College?    @relation(fields: [collegeId], references: [id])
  owner       User        @relation(fields: [ownerId], references: [id])
  reviews     Review[]
}

model MarketplaceItem {
  id          String   @id @default(cuid())
  title       String
  description String?
  price       Int?
  category    String   // book, notes, gadget, furniture...
  condition   String?
  images      String[]
  sellerId    String
  cityId      String
  isSold      Boolean  @default(false)
  createdAt   DateTime @default(now())

  seller      User     @relation(fields: [sellerId], references: [id])
}

model Review {
  id          String   @id @default(cuid())
  rating      Int
  comment     String?
  userId      String
  listingId   String
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
  listing     Listing  @relation(fields: [listingId], references: [id])
}

enum Role {
  STUDENT
  PROVIDER
  ADMIN
}

enum ListingType {
  PG
  HOSTEL
  TIFFIN
  RESTAURANT
  JOB
  INTERNSHIP
  SERVICE
  EVENT
  HEALTH
  LIBRARY
  OTHER
}
```

## Notes
- Use `meta` JSON field for type-specific attributes in early stages.
- Add PostGIS later for proper distance queries.
- Soft deletes recommended for listings.