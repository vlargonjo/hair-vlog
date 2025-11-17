export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="container flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Всё о волосах. Все права защищены.</p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-brand-dark">
            Политика конфиденциальности
          </a>
          <a href="/terms" className="hover:text-brand-dark">
            Условия
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-dark">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

