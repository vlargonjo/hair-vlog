"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useHairStore } from "@/hooks/useHairStore";

interface Props {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: Props) {
  const { favorites, toggleFavorite } = useHairStore();
  const isFavorite = favorites.some((p) => p.id === product.id);

  if (viewMode === "list") {
    return (
      <div className="group flex gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md hover:border-brand/20 dark:border-slate-800 dark:bg-slate-900">
        <Link href={`/catalog/${product.id}`} className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
          <Image 
            src={product.image || "/images/product-placeholder.svg"} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform group-hover:scale-105" 
          />
        </Link>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{product.brand}</span>
                <Badge variant="brand" className="text-xs">{product.category}</Badge>
              </div>
              <Link href={`/catalog/${product.id}`}>
                <h3 className="text-lg font-semibold text-slate-900 transition-colors hover:text-brand dark:text-slate-100">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {product.price.toFixed(2)} €
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => toggleFavorite(product)}
                className={isFavorite ? "border-brand bg-brand/10 text-brand" : ""}
                aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
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

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-md hover:border-brand/20 dark:border-slate-800 dark:bg-slate-900">
      <Link href={`/catalog/${product.id}`} className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800">
        <Image 
          src={product.image || "/images/product-placeholder.svg"} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform group-hover:scale-105" 
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{product.brand}</span>
          <Badge variant="brand" className="text-xs">{product.category}</Badge>
        </div>
        <Link href={`/catalog/${product.id}`}>
          <h3 className="text-lg font-semibold text-slate-900 transition-colors hover:text-brand dark:text-slate-100 line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{product.price.toFixed(2)} €</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => toggleFavorite(product)}
              className={isFavorite ? "border-brand bg-brand/10 text-brand" : ""}
              aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
            <Button asChild size="sm" className="flex-1">
              <a href={product.partnerLink} target="_blank" rel="noreferrer" className="text-center">
                Купить
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

