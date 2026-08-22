# CampusLocal 🎓

**Your complete local student life companion.**

CampusLocal helps students (especially newcomers) discover and navigate everything around their college/city:

- 🏠 PG / Hostels / Flats
- 🍱 Tiffin & Affordable Food
- 💼 Jobs & Internships
- 📚 Notes, PYQs, Reference Books
- 🛒 Buy / Sell / Exchange
- 🖨️ Xerox, Stationary, Laundry
- 🏥 Medical Stores & Hospitals
- 🎉 Workshops, Hackathons & Events
- 🧠 Skill Courses & Resume Help
- and much more...

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui
- **PostgreSQL** + Prisma
- **Clerk** (Auth)
- **Mapbox** (Maps)
- **Vercel** (Hosting)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Set up database
npx prisma db push
npx prisma db seed

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

See the full tree in the root or explore `docs/` for detailed documentation.

## Documentation

| File | Description |
|------|-------------|
| [DESIGN.md](docs/DESIGN.md) | Design system & UI guidelines |
| [REQUIREMENTS.md](docs/REQUIREMENTS.md) | Functional & non-functional requirements |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture |
| [FEATURES.md](docs/FEATURES.md) | Feature breakdown |
| [API.md](docs/API.md) | API reference |
| [DATABASE.md](docs/DATABASE.md) | Database schema |
| [TESTING.md](docs/TESTING.md) | Testing strategy |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deployment guide |

## License

MIT – Built for students, by students (and AI agents 🤖).