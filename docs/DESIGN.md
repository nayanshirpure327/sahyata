# DESIGN.md – Design System

## Brand
- **Name**: CampusLocal
- **Tagline**: Know your campus. Live better.
- **Tone**: Friendly, helpful, trustworthy, student-first
- **Primary Colors**:
  - Primary: `#2563EB` (Blue-600)
  - Secondary: `#0EA5E9` (Sky-500)
  - Accent: `#F59E0B` (Amber-500)
  - Success: `#10B981`
  - Danger: `#EF4444`
  - Neutral: Slate scale

## Typography
- **Font**: Inter (Google Fonts)
- Headings: font-semibold / font-bold
- Body: font-normal

## UI Library
Use **shadcn/ui** as the base component library.

Recommended components:
- Button, Card, Input, Select, Dialog, Sheet, Tabs, Badge, Avatar, Skeleton, Toast

## Layout Principles
- Mobile-first
- Clean white / light gray backgrounds
- Generous spacing
- Clear visual hierarchy
- Map + List view toggle on location pages
- Sticky bottom navigation on mobile

## Key Screens
1. Landing / City + College selector
2. Explore (map + categories)
3. Category listing pages (PG, Food, Jobs...)
4. Detail pages with map, reviews, contact
5. Marketplace (grid + filters)
6. User Dashboard / Profile

## Icons
Use **Lucide React** icons.

## Dark Mode
Support light + dark mode from day one (next-themes).