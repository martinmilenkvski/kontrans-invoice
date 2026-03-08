# Kontrans Design System

This document outlines the core design tokens, layout structures, and components for the Kontrans web application, based on the premium, dark-themed editorial aesthetic. Follow these guidelines to maintain a strictly consistent visual identity throughout the project.

## 1. Colors

The application relies on a dark aesthetic with bright, contrasting accents.

### Primary Accents
- **Brand Red**: `#D42B2B`
  - Usage: Primary buttons, active states, glowing effects, primary icons, and emphasis text (e.g., eyebrow labels, cursive text).
  - Hover State: `#b02222` (Darker red for interaction feedback).

### Neutral Palette (Dark Theme)
- **Background Main**: `#080808` (True dark, almost black).
  - Usage: Main page background and base layout components.
- **Surface / Card Background**: `#111111` or `#0A0A0A`
  - Usage: Empty space placeholders, image container backgrounds, and subtle column backgrounds on hover.
- **Foreground (Text Main)**: `#ffffff` (White).
  - Usage: Headings, primary body text.
- **Muted Text**: `text-gray-400` / `text-gray-500`
  - Usage: Subtitles, secondary information, disabled states, and large structural text accents.

### Borders & Dividers
- **Structural Borders**: `border-white/10`
  - Usage: The core of the editorial design layout. Used for horizontal rows and vertical grid columns.
- **Hover/Active Borders**: `border-white/30` 
  - Usage: Interactive elements like ghost buttons on hover.

## 2. Typography

We use a single, highly legible, and modern geometric sans-serif font applied strictly.

- **Primary Font Family**: Space Grotesk (`var(--font-space-grotesk)`)

### Typography Hierarchy
- **Eyebrow Label**: `text-xs sm:text-sm font-semibold tracking-wider uppercase` (Used with Brand Red and an animated ping dot).
- **Hero/Section Title (H1/H2)**: `text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[1.05] tracking-tight`.
- **Sub-headings (H3)**: `text-2xl sm:text-3xl font-bold tracking-wide uppercase`.
- **Subtitle/Lead Paragraph**: `text-lg md:text-xl text-gray-400 leading-relaxed`.
- **Base Body Text**: `text-base text-gray-400`.
- **Structural/Number Accents**: `font-mono tracking-widest text-sm text-gray-400`.

## 3. Layout System: The Editorial Grid

The application utilizes a strict, visible grid system to maintain a high-end editorial and structured feeling.

### Grid Constraints
- **Global Container**: `max-w-[1600px] mx-auto w-full`.
- **Layout Architecture**: Content is rigidly divided into `grid` columns (1 column on mobile, 2 on tablet, 4 on desktop).
- **Visible Borders**: Sections and columns must explicitly use `border-x`, `border-y`, or `border-b` with `border-white/10` to draw physical lines on the screen connecting different pieces of content.
- **Generous Padding**: Content inside grid cells must use large paddings, prioritizing whitespace. Usually `p-10 md:p-12 lg:p-24`.
- **Zero Gaps**: Instead of CSS `gap`, lay out grids tightly and use cell padding + borders to separate content. 

## 4. Core Components

### 4.1 Buttons
All buttons should have medium rounded corners (`rounded-lg`), bold/medium typography, uppercase casing `uppercase tracking-widest`, and smooth transitions `transition-all duration-300`.

*   **Primary Button:**
    *   **Style:** `bg-[#D42B2B] text-white text-sm font-semibold px-8 py-5`
    *   **Hover:** `hover:bg-[#b02222]`
*   **Ghost/Secondary Button:**
    *   **Style:** `bg-transparent border border-white/10 text-white text-sm font-semibold px-8 py-5`
    *   **Hover:** `hover:border-white/30 hover:bg-white/5`

### 4.2 Interactive Elements
*   **Icon Containers:**
    *   **Style:** `w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center`.
    *   **Hover:** Add `group-hover:scale-110` to the parent group.
*   **Lists/Bullets:**
    *   Use a discrete small square (`■`) colored in Brand Red `#D42B2B` with size `text-[10px]` for bullet points instead of standard discs.

### 4.3 Visual Effects
*   **Subtle Glows (Radial Blur):**
    *   Use large, highly blurred divs to create atmospheric lighting. Example: `bg-[#D42B2B] rounded-full blur-[150px] opacity-[0.15]`.
*   **Images:**
    *   Apply `grayscale` filters directly to `next/image` components, removing the grayscale strictly on `group-hover`. Add `contrast-110` to make blacks punchier.
*   **Ping Indicators:**
    *   Draw attention to current steps or live data using a double span element: `animate-ping opacity-60` behind a solid dot `bg-[#D42B2B]`.

## Summary Checklist for New Components
1. Is your content wrapper constrained to `max-w-[1600px]`?
2. Are you using `border-white/10` lines to separate all major columns and rows?
3. Are primary accents and highlights colored `#D42B2B`?
4. Is all typography consistently `Space Grotesk` with appropriately tight kerning on large headers?
5. Are buttons correctly proportioned with generous padding (`py-5`) and uppercase tracking?
