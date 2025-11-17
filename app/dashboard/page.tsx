"use client";

import { DashboardWidgets } from "@/components/dashboard-widgets";
import { useHairStore } from "@/hooks/useHairStore";
import { mockAnalyses, mockProducts } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { favorites } = useHairStore();
  const metrics = [
    { label: "Завершённых анализов", value: "12", delta: "+3" },
    { label: "Избранных продуктов", value: favorites.length.toString(), delta: "+1" },
    { label: "Поделились результатом", value: "6", delta: "+2" }
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Личный кабинет</h1>
        <p className="text-slate-500">История анализов, избранные продукты, настройки приватности.</p>
      </header>
      <DashboardWidgets metrics={metrics} lastAnalysis={mockAnalyses[0]} favorites={favorites.length ? favorites : mockProducts.slice(0, 1)} />
      <Card>
        <CardHeader>
          <CardTitle>Настройки приватности</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Удалять временные фото через 24 часа</span>
            <Button variant="outline" size="sm">
              Активно
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span>Получать email с подборкой</span>
            <Button variant="outline" size="sm">
              Управлять
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

