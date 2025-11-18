"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Menu, X, ShoppingCart, User } from "lucide-react";

const navLinks = [
  { href: "/analyze", label: "Примерка" },
  { href: "/3d", label: "3D Манекен" },
  { href: "/catalog", label: "Каталог" },
  { href: "/procedures", label: "Процедуры" },
  { href: "/profile", label: "Кабинет" },
  { href: "/advertisers", label: "Партнёрам" }
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="font-semibold text-lg tracking-tight text-slate-900 hover:text-brand transition-colors dark:text-slate-100">
          Всё о волосах
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-brand-dark",
                pathname.startsWith(link.href) && "text-brand-dark font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" asChild>
            <Link href="/profile" aria-label="Профиль">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex relative" aria-label="Корзина">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
              0
            </span>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/analyze">Попробовать</Link>
          </Button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block py-2 px-3 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                  pathname.startsWith(link.href) && "bg-slate-100 dark:bg-slate-800 font-semibold text-brand-dark"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-4" onClick={() => setMobileMenuOpen(false)}>
              <Link href="/analyze">Попробовать</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

