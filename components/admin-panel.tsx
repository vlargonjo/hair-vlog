import { mockProducts, mockProcedures } from "@/lib/mockData";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function AdminPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Добавить новый продукт</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Название" />
          <Input placeholder="Бренд" />
          <Input placeholder="Категория" />
          <Input placeholder="Цена" type="number" />
          <Textarea className="md:col-span-2" placeholder="Описание" />
          <Button className="md:col-span-2 w-full">Сохранить</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Список продуктов</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          {mockProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3 dark:border-slate-800">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-xs text-slate-500">{product.brand}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Редактировать
                </Button>
                <Button variant="ghost" size="sm">
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Процедуры</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          {mockProcedures.map((procedure) => (
            <div key={procedure.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3 dark:border-slate-800">
              <div>
                <p className="font-semibold">{procedure.title}</p>
                <p className="text-xs text-slate-500">{procedure.duration} минут</p>
              </div>
              <Button variant="outline" size="sm">
                Обновить
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

