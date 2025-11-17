import { DashboardMetric, HairAnalysis, Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Props {
  metrics: DashboardMetric[];
  lastAnalysis?: HairAnalysis;
  favorites?: Product[];
}

export function DashboardWidgets({ metrics, lastAnalysis, favorites = [] }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{metric.value}</p>
              {metric.delta && <p className="text-xs text-emerald-500">{metric.delta} за 7 дней</p>}
            </CardContent>
          </Card>
        ))}
      </div>
      {lastAnalysis && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Последний анализ</CardTitle>
            <Badge variant="brand">{lastAnalysis.hairType}</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm text-slate-500">
            <p>Получен: {new Date(lastAnalysis.createdAt).toLocaleDateString()}</p>
            <p>Проблемы: {lastAnalysis.issues.join(", ")}</p>
            <Button variant="outline" className="mt-2 w-fit">
              Смотреть отчёт
            </Button>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Избранные продукты</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3 text-sm text-slate-600">
          {favorites.length === 0 ? (
            <p>Добавьте товары из каталога.</p>
          ) : (
            favorites.map((product) => (
              <Badge key={product.id} variant="outline">
                {product.name}
              </Badge>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

