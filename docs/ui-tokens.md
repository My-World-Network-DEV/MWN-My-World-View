# UI Tokens

This project drives styling through Tailwind tokens extended in `tailwind.config.ts` and utility classes in `src/app/globals.css`.

## Colors
- `mwv.primary` / `mwv.primary-foreground`
- `mwv.background`
- `mwv.foreground`
- `mwv.card`
- `mwv.muted`
- `mwv.border`
- `mwv.ring`

## Shadows
- `shadow-card` – resting elevation
- `shadow-card-hover` – hover elevation

## Radius
- `rounded-2xl` (16px)
- `rounded-xl` (12px)

## Spacing
Uses an 8‑pt scale (multiples of 8 or 4). Additional helper:
- `spacing[18]` = 4.5rem (72px)

## Global utilities
Defined in `globals.css`:
- `.card` – primary card style
- `.card--glass` – soft glass variant
- `.card-hover` – hover elevation
- `.pill` – rounded chip badge
- `.skeleton` – loading placeholder
- focus rings via `*:focus-visible`

Keep layouts within a centered `container` and 12‑column grid, and space elements in 8‑pt increments.
