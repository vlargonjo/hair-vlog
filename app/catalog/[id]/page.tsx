import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { mockProducts } from "@/lib/mockData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <Link
          href="/catalog"
          className="mb-6 inline-flex items-center text-sm text-slate-600 hover:text-brand dark:text-slate-400"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к каталогу
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
            <Image
              src={product.image || "/images/product-placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {product.brand}
                </Badge>
                <Badge className="bg-brand/10 text-brand border-brand/20 text-xs">
                  {product.category}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {product.name}
              </h1>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {product.price.toFixed(2)} €
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">Описание</h2>
              <p className="text-slate-600 dark:text-slate-400">{product.description}</p>
            </div>

            {product.hairTypes && product.hairTypes.length > 0 && (
              <div>
                <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Подходит для типов волос
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.hairTypes.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                В избранное
              </Button>
              <Button size="lg" className="flex-1" asChild>
                <a href={product.partnerLink} target="_blank" rel="noreferrer">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Купить
                </a>
              </Button>
            </div>

            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  При покупке по партнёрской ссылке вы поддерживаете развитие платформы.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
