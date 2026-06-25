# Tekris Labs

Premium landing page for **Tekris Labs** — a software studio building subscription-based digital tools for productivity, document creation, content workflows, and business automation.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main landing page |
| `/contact` | Contact & business info |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

## Project structure

```
src/
├── app/                    # Routes & global styles
├── components/
│   ├── layout/             # Navbar, Footer, LegalLayout
│   ├── sections/           # Landing page sections
│   └── ui/                 # Button and shared UI
```

## Deploy

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js host. All pages are statically generated.
