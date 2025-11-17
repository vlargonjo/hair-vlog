import { HeroSection } from "@/components/hero-section";
import { StatsBanner } from "@/components/stats-banner";
import { UploadSection } from "@/components/upload-section";
import { HairResultCard } from "@/components/hair-result-card";
import { ProductCard } from "@/components/product-card";
import { ProcedureCard } from "@/components/procedure-card";
import { mockProducts, mockProcedures } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <StatsBanner />
      <section className="grid gap-6 lg:grid-cols-2">
        <UploadSection />
        <HairResultCard />
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Подборка косметики</h2>
          <a href="/catalog" className="text-sm text-brand-dark">
            Все продукты →
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Процедуры ухода</h2>
          <a href="/procedures" className="text-sm text-brand-dark">
            Смотреть все →
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {mockProcedures.map((procedure) => (
            <ProcedureCard key={procedure.id} procedure={procedure} />
          ))}
        </div>
      </section>
    </div>
  );
}

