```markdown
# Technical Reference

- Node.js 20  
- Tailwind CSS 3.4.19  
- Vite 7.2.4  

## Theme

shadcn/ui “New York” style.  
Custom `aapl` colour palette added to `tailwind.config.js` — all colours use CSS variables for automatic dark‑mode switching.

## Key Libraries

- `recharts` — charting  
- `next-themes` — dark/light theme toggle  
- `date-fns` — date utilities  
- `react-hook-form` + `zod` — form handling  

## shadcn/ui Components (40+)

All located in `src/components/ui/`.

accordion, alert, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, empty, field, form, hover-card, input, input-group, input-otp, item, kbd, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group, tooltip

## Project Entry Points

- `index.html` — HTML entry point  
- `src/main.tsx` — React root with `ThemeProvider`  
- `src/App.tsx` — top‑level React component that renders the `Home` page  

## Path Alias

`@/` maps to `src/` (configured in `tsconfig.json` and `vite.config.ts`)