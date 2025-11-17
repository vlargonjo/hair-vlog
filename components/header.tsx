"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/analyze", label: "Примерка" },
  { href: "/mannequin", label: "3D Манекен" },
  { href: "/catalog", label: "Каталог" },
  { href: "/procedures", label: "Процедуры" },
  { href: "/dashboard", label: "Кабинет" },
  { href: "/advertisers", label: "Партнёрам" }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-semibold text-xl tracking-tight text-brand-dark">
          Всё о волосах
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition hover:text-brand-dark",
                pathname.startsWith(link.href) && "text-brand-dark font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex shadow-glow">
            <Link href="/analyze">Попробовать</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

