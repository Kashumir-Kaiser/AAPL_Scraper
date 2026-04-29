# AAPL Scraper — Live Apple Stock & News Dashboard

A real‑time Apple (AAPL) stock dashboard built with React, TypeScript, and Vite.  
It demonstrates modern frontend development practices including live API integration, interactive charting, and full dark‑mode support.

## Features

- Real‑time AAPL price display with change indicators and volume  
- Interactive chart with 1‑day, 1‑week, and 1‑month timeframes  
- Latest news feed with sentiment tags  
- Dark mode — all components adapt automatically to light or dark themes  
- Demo mode — realistic mock data works out‑of‑the‑box without an API key  
- Built with Vite for fast development and production builds  

## Tech Stack

- React 19 + TypeScript  
- Vite 7  
- Tailwind CSS 3.4 + shadcn/ui (New York style)  
- Recharts for charting  
- Alpaca Markets API (optional, proxy configuration provided)  

## Getting Started

### Prerequisites

- Node.js 20 or later  
- npm  

### Installation

```bash
git clone <repository-url>
cd aapl_scraper
npm install
```

### Environment Variables

Copy the example file and add your Alpaca credentials to enable live data:

```Bash
cp .env.example .env.local
```

Edit .env.local:

```Bash
ALPACA_KEY_ID=your_key_here
ALPACA_SECRET_KEY=your_secret_here
```

If you do not set these variables, the application automatically uses mock data — no API key required.

### Development

```Bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Other Scripts
|Command | Description |
|------- |-----------  |
|npm run build | Type‑check and build for production |
|npm run preview | Preview the production build |
|npm run lint | Run ESLint |

### Project Structure

```
src/
├── compoments/           # Feature components (PriceCard, IntraChart, NewsFeed, …)
|   ├── ui/               # shadcn/ui primitives (button, card, chart, …)
├── hooks/                # Custom hooks (useQuote, useBars, useNews, …)
├── lib/                  # API client (alpaca.ts) and utility functions
├── pages/                # Page components (Home)
├── types/                # TypeScript type definitions and data formatters
├── main.tsx              # Application entry point with ThemeProvider
├── index.css             # Global styles and Tailwind layers
```

### Data Modes

Mock mode (default): When no Alpaca API keys are provided, the app generates realistic random data. A small “Demo mode” banner is shown.

Live mode: Once valid API keys are present in .env.local, the Vite dev server proxies requests to Alpaca Markets securely.

### Dark Mode

The application uses Tailwind’s class‑based dark mode via next‑themes. All custom colours are defined as CSS variables that automatically switch between light and dark themes.

### Credits

Market data provided by Alpaca Markets

UI components from shadcn/ui

Icons by Lucide

---