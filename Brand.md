# Brand Identity & Design System

This document defines the official design tokens, typography, color palette, and visual guidelines for the open-source **Aptitude & Archetype Engine**.

---

## 1. Brand Typography

We use Google Fonts with a dual-font strategy to balance energetic display elements with clean, mobile-optimized readability.

* **Display Font (Headings, Archetype Titles, Score Badges)**: 
  - **`Outfit`** (Weights: `600`, `700`, `800`)
  - *Vibe:* Modern, bold, geometric, futuristic.
* **Body & UI Font (Questions, Buttons, Descriptions, Options)**: 
  - **`Plus Jakarta Sans`** (Weights: `400`, `500`, `600`, `700`)
  - *Vibe:* Clean tech aesthetic, highly readable on mobile viewports.

---

## 2. Color Palette System

Dark-first theme with vibrant, glowing neon accents designed for Gen Z & Gen Alpha engagement.

### Base Surfaces & Backgrounds
* **Deep Space (Main Background)**: `#0B0D12`
* **Obsidian Glass (Card Containers)**: `rgba(19, 22, 32, 0.75)` with `backdrop-filter: blur(16px)`
* **Glass Border Glow**: `rgba(255, 255, 255, 0.08)`

### Core Brand Accents
* ⚡ **Electric Violet (Primary Accent)**: `#7C3AED` / `#9333EA` *(Primary CTAs, Archetype badges)*
* 🟢 **Neon Mint (Flow / Success)**: `#10B981` / `#34D399` *(High score highlights, flow state indicators)*
* 🔥 **Cyber Amber (Timer / Caution)**: `#F59E0B` / `#FBBF24` *(Countdown timer ring, high energy options)*
* 💗 **Hyper Pink (Interactive Accents)**: `#EC4899` / `#F472B6` *(Option A/B highlights, explorer badges)*

### Trait & Domain Color Tokens
* 🟦 **Logical / Investigative**: Electric Cyan (`#06B6D4`)
* 🟪 **Spatial / Artistic**: Deep Magenta (`#C084FC`)
* 🟧 **Numerical / Enterprising**: Solar Orange (`#FB923C`)
* 🟩 **Verbal / Social**: Emerald Green (`#4ADE80`)
* 🟨 **Realistic / Conventional**: Slate Yellow (`#FACC15`)

---

## 3. UI Micro-Interactions & Styling Tokens

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

:root {
  /* Fonts */
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;

  /* Backgrounds & Glass */
  --bg-dark: #0B0D12;
  --bg-card: rgba(19, 22, 32, 0.75);
  --border-glass: rgba(255, 255, 255, 0.08);

  /* Accents */
  --accent-violet: #7C3AED;
  --accent-mint: #34D399;
  --accent-pink: #F472B6;
  --accent-cyan: #06B6D4;
  --accent-amber: #FBBF24;

  /* Typography Colors */
  --text-main: #F9FAFB;
  --text-muted: #9CA3AF;
}
```

---

## 4. Visual Aesthetic Guidelines

1. **Frosted Glass Cards**: Use `backdrop-filter: blur(16px)` on semi-transparent dark containers for a modern glassmorphic look.
2. **Ambient Glow Effect**: Place soft blurred radial gradients behind active swipe cards to make elements glow on hover/active states.
3. **Motion Physics**: All swipe animations, card flips, and timer countdowns use spring physics via `framer-motion`.
