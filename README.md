# Kontrans - Transport and Shipping

A modern, high-performance web application designed for a logistics and shipping company. It is built using **Next.js**, **React**, and **Tailwind CSS**.

## Features

- **Responsive Hero Section:** A full-width, dynamic hero section with a bold Space Grotesk headline and a premium dark aesthetic.
- **Header Navigation:** Includes a logo, smooth navigation links, and floating contact information.
- **Glassmorphism Elements:** Dynamic floating statistics cards with glassmorphism and subtle radial glow animations to elevate the UI.
- **Tech Stack:**
  - Next.js 15+ (App Router)
  - React 19
  - Tailwind CSS v4
  - Lucide React (for Icons)
  - Google Fonts (Space Grotesk)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the outcome.

## Project Structure

- `app/layout.tsx`: Root layout with font configuration and global dark theme default.
- `app/page.tsx`: The main landing page incorporating the `Header` and `Hero`.
- `components/Header.tsx`: The top navigation bar.
- `components/Hero.tsx`: The main hero block containing the company pitch and statistics.
- `app/globals.css`: Contains CSS variables and Tailwind setup.
