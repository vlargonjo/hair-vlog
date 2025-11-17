import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/lib/mockData";

export default function CatalogPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold">Каталог косметики</h1>
        <p className="text-slate-500">Фильтры по типу волос, категории и цене.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Input placeholder="Поиск продукта" className="md:col-span-2" />
        <select className="h-11 rounded-2xl border border-slate-200 px-4 text-sm">
          <option>Тип волос</option>
          <option>Wavy-2B</option>
          <option>Curly-3A</option>
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

