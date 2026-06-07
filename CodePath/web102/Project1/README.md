# Carry Index

Carry Index is a responsive directory of online stores that sell everyday
carry and fidget products, including fidget sliders, floating sliders, fidget
rings, fidget spinners, and related accessories.

Each store is displayed in a reusable card with its logo, name, tagline,
categories, and a link to the store's website.

## Features

- Responsive store card grid
- Local store logo images
- Category badges
- External store links
- Per-store image background customization
- Reusable React and shadcn-style UI components

## Built With

- React 19
- Vite
- Tailwind CSS 4
- shadcn/ui patterns
- Radix UI
- Lucide React icons

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Editing Stores

Store information is located in:

```text
src/data/stores.js
```

Each object creates one store card:

```js
{
  id: 1,
  name: "Example Store",
  image: "/store-images/example-store.png",
  tagline: "A short description of the store.",
  categories: ["Fidget Slider", "Fidget Ring", "Fidget Spinner"],
  website: "https://example.com/",
}
```

To add a store, add another object to the `stores` array with a unique `id`.
To remove a store, delete its object from the array.

Only the first two categories are currently displayed on each card.

## Adding Store Images

Place store logos in:

```text
public/store-images/
```

Reference an image from `stores.js` using a path that begins with
`/store-images/`:

```js
image: "/store-images/example-store.png",
```

Cards use a dark image background by default. If a logo contains dark text,
give that store a white background:

```js
imageBackground: "bg-white",
```

## Project Structure

```text
public/
  store-images/       Store logos
src/
  components/
    ui/               Reusable UI primitives
    Footer.jsx
    Header.jsx
    StoreCard.jsx
    StoreGrid.jsx
  data/
    stores.js         Store information
  lib/
    utils.js
  App.jsx             Main page layout
  index.css           Tailwind theme and global styles
  main.jsx            React entry point
```

## Main Components

- `Header` displays the site name and directory label.
- `StoreGrid` maps the store data into a responsive grid.
- `StoreCard` displays one store and its website link.
- `Footer` displays the site footer.
