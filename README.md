# Quoc Thinh Le Viet — Portfolio

Personal portfolio site: full-stack developer focused on production SaaS, marketplace and
booking platforms.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP · self-hosted [React Bits](https://reactbits.dev)–style components.

## Sections

- **Hero** — tilting profile card (mouse-tracked 3D + holographic shine) and a curved looping
  marquee of the core stack.
- **How I work** — an auto-cycling card stack summarizing three different jobs: scaling a
  marketplace, shipping a tested production app, and rescuing an inherited codebase.
- **Tech stack** — skills grouped into hover-to-open folders instead of a static logo wall.
- **Case studies** — KeyHay, Plame, and Focus, each with problem / solution / results, wrapped
  in a scroll-driven stacking effect.
- **Now building** — current focus (booking & scheduling SaaS).
- **Contact** — a real form posting to `app/api/contact/route.ts`, plus direct email.

## Custom components (`components/reactbits/`)

Each one is a from-scratch reimplementation of a [React Bits](https://reactbits.dev) pattern —
no runtime dependency on the library itself, just the interaction idea rebuilt in
Tailwind/CSS/SVG (+ GSAP only where it's genuinely the right tool):

| Component | Pattern | Built with |
|---|---|---|
| `SplitText` | word-stagger reveal | GSAP |
| `SpotlightCard` | cursor-follow radial highlight | CSS + mousemove |
| `FadeContent` | scroll-into-view fade/slide | IntersectionObserver |
| `ProfileCard` | 3D tilt + holographic shine | CSS transforms + mousemove |
| `CurvedLoop` | text looping along a curve | SVG `textPath` + SMIL `animate` |
| `Folder` | hover-to-open skill folder | CSS transforms |
| `ScrollStack` | cards pin and scale as they stack | `position: sticky` + rAF scroll listener |
| `CardSwap` | auto-cycling card deck | CSS transforms + `setInterval` |

## Fill in your content

**Everything editable lives in one file: `content/site.ts`.**
Search for `[` in that file — every remaining placeholder is wrapped in `[BRACKETS]`:

- `[KEYHAY_TRAFFIC_METRIC]` — hero stat (block stays hidden until filled)
- `[METRICS — ...]` — case study results (render as italic "to be filled" until replaced)
- `[DEMO_LINK]`, `[SCREENSHOT/VIDEO]` — per case study
- `[UPWORK_PROFILE_URL]`, `[CALENDLY_URL]`, `[LINKEDIN_URL]` — optional contact links (buttons
  stay hidden until filled)
- `[TESTIMONIAL_QUOTE]` etc. — testimonials (section shows a "references on request" note
  until filled)
- `[PRODUCTION_URL]` — set `site.url` to the real domain after deploy (used by SEO/sitemap/OG)

Screenshots: drop files into `public/images/` and set `media: "/images/your-file.png"`.

Booking demo slot: in `bookingFocus.demo`, set `ready: true` + `href` when the demo ships.

## Contact form

`app/api/contact/route.ts` validates and logs submissions. To actually receive emails,
follow the TODO in that file (Resend recommended: `npm i resend` + `RESEND_API_KEY` env var).

## Develop & deploy

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

Deploy: push to GitHub → import the repo on Vercel (framework preset: **Next.js**) → add
`RESEND_API_KEY` env if using Resend → done.

Fonts are self-hosted (no Google Fonts request), OG image is generated at `/opengraph-image`.

## Performance notes

- GSAP is used exactly once (hero `SplitText`). Every other animation — spotlight, fade-in,
  tilt, curved loop, folder, scroll-stack, card-swap — is CSS/SVG/IntersectionObserver, not a
  library.
- Everything except the contact form and the interactive components is server-rendered static.
- All animations respect `prefers-reduced-motion`.
