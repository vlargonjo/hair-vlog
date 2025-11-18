"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ProcedureCard } from "@/components/procedure-card";
import { NewsletterSection } from "@/components/newsletter-section";
import { mockProducts, mockProcedures } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-slate-100">
              Умная забота о волосах
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Загрузите фото, протестируйте прически на 3D-манекене и получите персональные рекомендации по уходу с подборкой косметики.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/analyze">
                <Button size="lg" className="shadow-sm">
                  Примерка причесок
                </Button>
              </Link>
              <Link href="/3d">
                <Button size="lg" variant="outline">
                  3D-манекен
                </Button>
              </Link>
              <Link href="/catalog">
                <Button size="lg" variant="outline">
                  Подбор косметики
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                <span className="text-2xl">⏱</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Результат за 2 минуты</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Быстрый анализ и персональные рекомендации без долгого ожидания.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Конфиденциальность</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Фото по умолчанию не сохраняются. Полный контроль над вашими данными.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Партнёрские бренды</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Проверенные средства от ведущих производителей косметики.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Подборка косметики</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Рекомендованные средства для вашего типа волос</p>
            </div>
            <Link href="/catalog" className="text-sm font-medium text-brand hover:text-brand-dark transition-colors">
              Все продукты →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section className="border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Процедуры ухода</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Пошаговые ритуалы для разных типов волос</p>
            </div>
            <Link href="/procedures" className="text-sm font-medium text-brand hover:text-brand-dark transition-colors">
              Смотреть все →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {mockProcedures.map((procedure) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}

