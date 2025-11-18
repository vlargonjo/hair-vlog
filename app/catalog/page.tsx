"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { CatalogFilters } from "@/components/catalog-filters";
import { mockProducts } from "@/lib/mockData";
import { Search, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedHairType, setSelectedHairType] = useState("all");
  const [selectedProblem, setSelectedProblem] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesHairType = selectedHairType === "all" || product.hairTypes?.includes(selectedHairType);
    const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesHairType && matchesBrand;
  });

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedHairType("all");
    setSelectedProblem("all");
    setSelectedBrand("all");
  };

  return (
    <div className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Каталог косметики
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Найдите идеальные средства для вашего типа волос
          </p>
        </header>

        {/* Search and View Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Поиск продукта, бренда..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 w-full" 
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              Фильтры
            </Button>
            <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded px-2 py-1 transition-colors ${
                  viewMode === "grid"
                    ? "bg-brand text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded px-2 py-1 transition-colors ${
                  viewMode === "list"
                    ? "bg-brand text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-24">
              <CatalogFilters
                selectedCategory={selectedCategory}
                selectedHairType={selectedHairType}
                selectedProblem={selectedProblem}
                selectedBrand={selectedBrand}
                onCategoryChange={setSelectedCategory}
                onHairTypeChange={setSelectedHairType}
                onProblemChange={setSelectedProblem}
                onBrandChange={setSelectedBrand}
                onReset={resetFilters}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Найдено: <span className="font-semibold text-slate-900 dark:text-slate-100">{filteredProducts.length}</span>{" "}
                {filteredProducts.length === 1 ? "продукт" : filteredProducts.length < 5 ? "продукта" : "продуктов"}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={viewMode === "grid" 
                ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" 
                : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="mb-2 text-lg font-medium text-slate-900 dark:text-slate-100">
                  Продукты не найдены
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Попробуйте изменить фильтры или поисковый запрос
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={resetFilters}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

