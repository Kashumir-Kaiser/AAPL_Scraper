export function Footer() {
  return (
    <footer className="px-4 md:px-6 py-3 border-t border-aapl-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-tick text-aapl-secondary">
        <span>
          Data by{' '}
          <a
            href="https://alpaca.markets"
            target="_blank"
            rel="noopener noreferrer"
            className="text-aapl-blue hover:underline"
          >
            Alpaca Markets
          </a>
        </span>
        <span className="hidden sm:inline">·</span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-aapl-blue hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </footer>
  );
}
