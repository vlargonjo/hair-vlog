"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { mockProducts } from "@/lib/mockData";

interface FilterProps {
  selectedCategory: string;
  selectedHairType: string;
  selectedProblem: string;
  selectedBrand: string;
  onCategoryChange: (value: string) => void;
  onHairTypeChange: (value: string) => void;
  onProblemChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onReset: () => void;
}

const HAIR_TYPES = [
  "Wavy-2B",
  "Curly-3A",
  "Straight-1A",
  "Wavy-2A",
  "Curly-3B",
  "Coily-4A"
];

const PROBLEMS = [
  "Włosy wypadające i przerzedzone",
  "Włosy z łupieżem",
  "Włosy przetłuszczające się",
  "Włosy suche i przesuszone",
  "Włosy zniszczone",
  "Włosy puszące się",
  "Włosy matowe",
  "Wrażliwa skóra głowy"
];

export function CatalogFilters({
  selectedCategory,
  selectedHairType,
  selectedProblem,
  selectedBrand,
  onCategoryChange,
  onHairTypeChange,
  onProblemChange,
  onBrandChange,
  onReset
}: FilterProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    hairType: true,
    problem: true,
    brand: true
  });

  const categories = Array.from(new Set(mockProducts.map(p => p.category)));
  const brands = Array.from(new Set(mockProducts.map(p => p.brand)));

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedHairType !== "all" || 
    selectedProblem !== "all" || selectedBrand !== "all";

  return (
    <div className="space-y-4">
      {hasActiveFilters && (
        <div className="flex items-center justify-between rounded-lg border border-brand/20 bg-brand/5 p-3">
          <span className="text-sm font-medium text-brand">Активные фильтры</span>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-brand hover:text-brand-dark"
          >
            <X className="h-3 w-3" />
            Сбросить
          </button>
        </div>
      )}

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Типы продуктов</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selectedCategory === "all"
                ? "bg-brand/10 text-brand font-medium"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            Все категории
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader 
          className="cursor-pointer pb-3"
          onClick={() => toggleSection("hairType")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Типы волос</CardTitle>
            {expandedSections.hairType ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </div>
        </CardHeader>
        {expandedSections.hairType && (
          <CardContent className="space-y-2">
            <button
              onClick={() => onHairTypeChange("all")}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedHairType === "all"
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Все типы
            </button>
            {HAIR_TYPES.map(type => (
              <button
                key={type}
                onClick={() => onHairTypeChange(type)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selectedHairType === type
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {type}
              </button>
            ))}
          </CardContent>
        )}
      </Card>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader 
          className="cursor-pointer pb-3"
          onClick={() => toggleSection("problem")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Проблемы с волосами</CardTitle>
            {expandedSections.problem ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </div>
        </CardHeader>
        {expandedSections.problem && (
          <CardContent className="space-y-2">
            <button
              onClick={() => onProblemChange("all")}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedProblem === "all"
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Все проблемы
            </button>
            {PROBLEMS.map(problem => (
              <button
                key={problem}
                onClick={() => onProblemChange(problem)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selectedProblem === problem
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {problem}
              </button>
            ))}
          </CardContent>
        )}
      </Card>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader 
          className="cursor-pointer pb-3"
          onClick={() => toggleSection("brand")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Бренды</CardTitle>
            {expandedSections.brand ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </div>
        </CardHeader>
        {expandedSections.brand && (
          <CardContent className="space-y-2 max-h-64 overflow-y-auto">
            <button
              onClick={() => onBrandChange("all")}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedBrand === "all"
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Все бренды
            </button>
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => onBrandChange(brand)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selectedBrand === brand
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {brand}
              </button>
            ))}
          </CardContent>
        )}
      </Card>
    </div>
  );
}

