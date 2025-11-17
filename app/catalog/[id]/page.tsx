import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  params: { id: string };
}

export default function ProductPage({ params }: Props) {
  const product = mockProducts.find((item) => item.id === params.id);
  if (!product) return notFound();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="relative h-96 w-full overflow-hidden rounded-3xl border border-slate-100">
        <Image src={product.image || "/images/product-placeholder.png"} alt={product.name} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">{product.brand}</p>
          <h1 className="text-4xl font-semibold">{product.name}</h1>
        </div>
        <p className="text-slate-600">{product.description}</p>
        <p className="text-3xl font-semibold">{product.price.toFixed(2)} €</p>
        <Button asChild className="w-full md:w-auto">
          <a href={product.partnerLink} target="_blank" rel="noreferrer">
            Купить у партнёра
          </a>
        </Button>
        <div className="rounded-3xl border border-slate-200 p-4">
          <p className="text-sm font-semibold">Рекомендации по использованию</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
            <li>Наносите на влажные волосы.</li>
            <li>Используйте совместно с подходящим шампунем.</li>
            <li>Отслеживайте результат в личном кабинете.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

