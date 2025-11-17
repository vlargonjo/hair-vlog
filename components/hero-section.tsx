import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-hero px-6 py-12 shadow-glow md:px-12">
      <Badge variant="brand" className="mb-4 w-fit">
        MVP · HairCare Expert Platform
      </Badge>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold md:text-5xl">
            Умная 2D-примерка и рекомендации по уходу за волосами
          </h1>
          <p className="text-lg text-slate-600">
            Загрузите фото, протестируйте прически на 3D-манекене и получите персональный план ухода с подборкой косметики и партнёрскими предложениями.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="shadow-glow">
              <Link href="/analyze">Загрузить фото</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/catalog">Каталог косметики</Link>
            </Button>
          </div>
          <ul className="flex flex-wrap gap-6 text-sm text-slate-600">
            <li>⏱ Результат за 2 минуты</li>
            <li>🔒 Фото по умолчанию не сохраняются</li>
            <li>🤝 Партнёрские бренды</li>
          </ul>
        </div>
        <div className="rounded-3xl bg-white/60 p-6 text-sm backdrop-blur">
          <p className="font-semibold text-slate-700">Метрики MVP</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/70 bg-white p-4 shadow">
              <p className="text-2xl font-semibold">10%</p>
              <p className="text-slate-500">Конверсия upload → результат</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white p-4 shadow">
              <p className="text-2xl font-semibold">4%+</p>
              <p className="text-slate-500">CTR партнёрских ссылок</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-4 text-slate-600">
            <p className="font-medium text-slate-700">GDPR/152-ФЗ</p>
            <p className="text-xs">Опция «не сохранять фото», шифрование AES-256, retention 24 часа.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

