import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Всё о волосах</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Умная платформа для заботы о волосах с персональными рекомендациями.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Навигация</p>
            <div className="space-y-2 text-sm">
              <Link href="/analyze" className="block text-slate-600 hover:text-brand transition-colors dark:text-slate-400">
                Примерка
              </Link>
              <Link href="/catalog" className="block text-slate-600 hover:text-brand transition-colors dark:text-slate-400">
                Каталог
              </Link>
              <Link href="/procedures" className="block text-slate-600 hover:text-brand transition-colors dark:text-slate-400">
                Процедуры
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Информация</p>
            <div className="space-y-2 text-sm">
              <Link href="/privacy" className="block text-slate-600 hover:text-brand transition-colors dark:text-slate-400">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="block text-slate-600 hover:text-brand transition-colors dark:text-slate-400">
                Условия использования
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Контакты</p>
            <div className="space-y-2 text-sm">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="block text-slate-600 hover:text-brand transition-colors dark:text-slate-400"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
          © {new Date().getFullYear()} Всё о волосах. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

