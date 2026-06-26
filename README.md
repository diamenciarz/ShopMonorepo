# Threadly — Single-Repo React Clothing Store

A complete, single-repo React storefront built with Vite. The whole site is a self-contained SPA
that you can ship as one repository and deploy with zero configuration to **Vercel**,
**Netlify**, or **GitHub Pages** (config files included for all three).

## Tech Stack

- **React 18** + **Vite 5** — fast dev server and tiny production bundles
- **React Router 6** — client-side routing (HashRouter so it works on any static host)
- **Plain CSS** — no build-time CSS framework, just one easy-to-edit stylesheet
- **localStorage** — cart persists across reloads, no backend required
- Sample product data in `src/data/products.js`

## Features

- Home page with hero + featured products
- Shop page with category filters
- Product detail page with size selector
- Cart with quantity controls and item removal
- Checkout page with shipping + payment form
- Persistent cart (localStorage)
- Toast notifications on add-to-cart
- Fully responsive layout
- Accessible, semantic HTML

## Project Structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── vercel.json              # Vercel config (SPA rewrites)
├── netlify.toml             # Netlify config (SPA rewrites)
├── .github/workflows/
│   └── deploy.yml           # Auto-deploy to GitHub Pages
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx             # Entry + routing
    ├── style.css            # Global styles
    ├── context/
    │   └── CartContext.jsx  # Cart state + localStorage
    ├── data/
    │   └── products.js      # Sample product data
    ├── components/
    │   ├── Navbar.jsx
    │   └── Footer.jsx
    └── pages/
        ├── Home.jsx
        ├── Products.jsx
        ├── ProductDetail.jsx
        ├── Cart.jsx
        └── Checkout.jsx
```

## Local Development

Requires Node.js 18+.

```bash
npm install
npm run dev          # open http://localhost:5173
```

## Production Build

```bash
npm run build        # outputs static site to dist/
npm run preview      # locally preview the production build
```

The `dist/` folder is a fully static site — drop it on any host.

## Deployment

This repository is configured to deploy out-of-the-box to all three major static hosts.
Pick whichever you prefer.

### Option 1 — Vercel (zero config)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Vite. Build command: `npm run build`, output: `dist`.
4. Click **Deploy**.

The included `vercel.json` ensures deep links like `/products` resolve to `index.html`.

### Option 2 — Netlify (zero config)

1. Push this repo to GitHub.
2. Go to [app.netlify.com/start](https://app.netlify.com/start) and import the repository.
3. Build command: `npm run build`, publish directory: `dist`.
4. Click **Deploy site**.

The included `netlify.toml` handles SPA rewrites automatically.

### Option 3 — GitHub Pages (auto-deploy via GitHub Actions)

1. Push this repo to GitHub.
2. In your repo settings → **Pages**, set the source to **GitHub Actions**.
3. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml`
   builds and deploys `dist/` to Pages automatically.

### Option 4 — Manual `gh-pages` branch

```bash
npm install
npm run deploy
```

This builds the site and pushes `dist/` to a `gh-pages` branch using the `gh-pages` package.
Then in repo settings → Pages, select the `gh-pages` branch as the source.

## Customizing

- **Products**: edit `src/data/products.js`. Each item needs `id`, `name`, `price`,
  `category`, `description`, `features`, and `image`.
- **Branding**: change the brand name in `src/components/Navbar.jsx`,
  `src/components/Footer.jsx`, and `index.html`.
- **Styling**: tweak the CSS variables at the top of `src/style.css` to recolor the entire site.

## License

MIT