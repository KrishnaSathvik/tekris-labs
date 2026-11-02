# Tekris Labs

Website for **Tekris Labs**, an independent software studio building digital products, developer tools, and ChatGPT plugins.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Vitest

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command         | Purpose                                  |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Local development server                 |
| `npm run lint`  | ESLint                                   |
| `npm test`      | Registry, validation, and content tests  |
| `npm run build` | Production build                         |

## Pages

| Route              | Description                                   |
| ------------------ | --------------------------------------------- |
| `/`                | Studio introduction and featured products     |
| `/products`        | Filterable product catalog                    |
| `/products/[slug]` | Product detail, support, and policy links     |
| `/about`           | Studio principles and developer identity      |
| `/contact`         | Contact and support form                      |
| `/privacy`         | Privacy Policy                                |
| `/terms`           | Terms of Service                              |

`/support` redirects to `/contact?topic=support`.

The contact form accepts `?topic=` (`support`, `bug`, `feedback`, `privacy`, `general`) and `?product=<slug>` to preselect fields.

## Products

All product data lives in `src/lib/products.ts`; the catalog, featured cards, detail pages, sitemap, and contact form read from it. Icons live in `public/products/`.

To publish a product's directory link, set its `listingUrl`. The "Open" button only appears when a URL is set.

## Contact delivery

Tekris Labs uses two public addresses, defined in `src/lib/site.ts`:

- `support@tekrislabs.com` — product and plugin support, bug reports, privacy requests, and technical assistance. Shown on product pages and in the Privacy Policy.
- `hello@tekrislabs.com` — general inquiries, partnerships, and business communication. Shown on the Contact page and in the Terms of Service.

Form submissions are validated on the server and delivered through FormSubmit. `inboxFor` in `src/lib/contact.ts` routes support, bug, and privacy inquiries to `support@` and feedback and general inquiries to `hello@`. FormSubmit sends a one-time activation email to each address on its first submission; activate both before launch.

## Deploy

Deployed on Vercel. CI (`.github/workflows/ci.yml`) runs lint, tests, and build on every pull request.
