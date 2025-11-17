"use client";

import Image from "next/image";
import { Product } from "@/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useHairStore } from "@/hooks/useHairStore";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { favorites, toggleFavorite } = useHairStore();
  const isFavorite = favorites.some((p) => p.id === product.id);

  return (
    <div className="flex flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-100">
        <Image src={product.image || "/images/product-placeholder.png"} alt={product.name} fill className="object-cover" />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{product.brand}</span>
          <Badge variant="brand">{product.category}</Badge>
        </div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-slate-500">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{product.price.toFixed(2)} €</span>
          <div className="flex gap-2">
            <Button variant={isFavorite ? "default" : "outline"} size="sm" onClick={() => toggleFavorite(product)}>
              {isFavorite ? "В избранном" : "В избранное"}
            </Button>
            <Button asChild size="sm">
              <a href={product.partnerLink} target="_blank" rel="noreferrer">
                Купить
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

