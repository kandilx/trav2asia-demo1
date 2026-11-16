# Trav2Asia

A frontend-only demo landing page for **Trav2Asia**, a fictional platform for discovering local travel experiences in China, Japan, India, Malaysia, Indonesia and Thailand. It is built with Next.js App Router, strict TypeScript, Tailwind CSS, Motion and Lucide.

Nothing here is a real product. There is no booking, payment, authentication or live inventory. The experience catalogue, prices and testimonials are invented. The booking flow is a simulated confirmation, labelled as a demo.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Command | Purpose |
| --- | --- |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Strict type check |
| `npm run build` | Production build (`/` is statically prerendered) |
| `npm test` | Unit tests (Vitest + Testing Library) |
| `npm run test:e2e` | Playwright smoke tests and screenshots. Runs `npm run start` on port 3100, so run `npm run build` first. |

If you rebuild while a `next start` process is still running, stop it first. A stale server serves old chunk URLs, which stops React from hydrating.

## Project structure

- `src/app/` - layout, global CSS tokens, and the page composition.
- `src/components/` - sections (`sections/`), search, experience cards and modal, trip state (`trip/`), layout, and UI primitives.
- `src/data/` - typed mock data: 18 experiences, 6 destinations, editorial content.
- `src/lib/catalog.ts` - pure filtering, sorting, and price helpers, with unit tests.
- `e2e/` - Playwright specs.
- `docs/asset-manifest.json` - source, licence, and alt text for every photo.
- `docs/screenshots/` - mobile (375), tablet (768) and desktop (1440) captures from the e2e run.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Keep the detected settings: framework preset Next.js, build command `next build`, output handled automatically. No environment variables are required.
4. Deploy. Each push to the production branch creates a new deployment.

Before sharing a public URL, read the licensing notes below.

## Known issues and limitations

- **Group size filter.** Most experiences have a minimum group size of 2. A search for one traveller therefore excludes them. This is intentional, because it mirrors the mock inventory rules, but users may find it surprising. The results area shows the active filters, so they can be cleared.
- **Unfilled photo slots.** Six slots have no approved photo yet: `exp-japan-kyoto-pottery`, `exp-india-udaipur-cycling`, `exp-malaysia-langkawi-kayak`, `exp-indonesia-bali-volcano-hike`, `exp-indonesia-bali-cooking-market`, and `spotlight-2`. Three of these experiences (Kyoto pottery, Langkawi kayak and Bali cooking) show a typographic fallback instead of a photo.
- **Repeated photos.** Some images appear in more than one place. Two pairs of files are byte-identical: `hero-2.jpg` and `spotlight-1.jpg` (Batur volcano), and `dest-thailand.jpg` and `exp-thailand-bangkok-canal-market.jpg` (floating market). Pexels searches for alternatives returned 403, so these are kept and listed in the manifest.
- **Location accuracy.** Several photos match the activity but not the exact city. The manifest records these as location-approximate.
- **Design sign-off.** The palette and layouts have not been formally approved against the visual approval gate in the project specification (§12). This build proceeds on the brief as written.
- **Accessibility.** Contrast and keyboard checks are partly done. Confirm the `orange-deep` error colour on paper before a public launch.

## Licensing and attribution

- **Photography.** All photos come from [Pexels](https://www.pexels.com) under the Pexels License. Photographer names are not recorded for most images. The manifest flags these as "unknown (not captured)". Verify attribution before publishing, and replace any photo that cannot be confirmed.
- **Typography.** DM Sans and Caveat are loaded with `next/font/google` and are licensed under the SIL Open Font License.
- **Orange Lemonade** is referenced as a creative direction only. It is not embedded or shipped. Confirm its licence before using it in a public deployment, or keep the substitute.
- **Content.** All brand names, experiences, prices, testimonials and stories are fictional. Do not present them as real.
