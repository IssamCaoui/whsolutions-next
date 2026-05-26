# WH Solutions — Next.js Rewrite

Modern Next.js 15 rewrite of the WH Solutions professional hygiene website.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom design system
- **Animations**: Framer Motion v12
- **Database**: MySQL (via mysql2, same DB as PHP site)
- **Dark Mode**: next-themes
- **Icons**: lucide-react

## Design System

- **Colors**: Navy `#1B3A5C` · Teal `#4ECDC4` · Coral `#FF6B6B` · Neon `#00F5D4`
- **Font**: Poppins
- **Effects**: Glassmorphism, gradient text, morphing blobs, scroll animations

## Getting Started

### Prerequisites

1. Install [Node.js 18+](https://nodejs.org/)
2. Have MySQL credentials for the WH Solutions database

### Installation

```bash
cd whsolutions-next

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Fill in your DB credentials in .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example`:

```env
NEXT_PUBLIC_PHP_API_URL=https://whsolutions-production.up.railway.app
DB_HOST=your-mysql-host
DB_PORT=3306
DB_NAME=railway
DB_USER=root
DB_PASS=yourpassword
NEXT_PUBLIC_WHATSAPP_NUMBER=212652020702
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages + API routes
│   ├── page.tsx            # Home page
│   ├── products/           # Products listing + detail
│   ├── about/              # About page
│   ├── contact/            # Contact form
│   ├── catalogue/          # PDF catalogue download
│   └── api/                # API routes (products, categories, settings, inquiry)
├── components/
│   ├── layout/             # Navbar, Footer, WhatsAppButton
│   ├── sections/           # Hero, Features, Categories, FeaturedProducts, etc.
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── db.ts               # MySQL connection pool
│   └── utils.ts            # Helpers (cn, slugify, WhatsApp links)
└── types/
    └── index.ts            # TypeScript interfaces
```

## Build & Deploy

```bash
npm run build
npm start
```

### Deploy to Railway

1. Create a new service in Railway
2. Connect your GitHub repository
3. Set all environment variables in Railway settings
4. Deploy — Railway auto-detects Next.js

## Features

- ✅ Responsive design (mobile-first)
- ✅ Dark mode toggle
- ✅ Product catalogue with search & category filter
- ✅ Product detail pages
- ✅ WhatsApp ordering (floating button + product CTAs)
- ✅ Catalogue PDF download
- ✅ Contact form
- ✅ Scroll animations (Framer Motion)
- ✅ Glassmorphism UI
- ✅ MySQL integration (reads same DB as PHP site)
