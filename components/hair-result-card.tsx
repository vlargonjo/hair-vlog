import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HairAnalysis } from "@/types";

interface Props {
  analysis?: HairAnalysis;
}

export function HairResultCard({ analysis }: Props) {
  const data =
    analysis ??
    ({
      hairType: "Wavy-2B",
      drynessScore: 70,
      curlScore: 60,
      issues: ["Dry ends", "Frizz"],
      recommendations: ["Используйте бессульфатный шампунь", "Добавьте увлажняющую маску"],
      createdAt: new Date().toISOString()
    } as HairAnalysis);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Результат анализа</CardTitle>
        <Badge variant="brand">{data.hairType}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Влажность</p>
            <div className="mt-1 h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-brand" style={{ width: `${data.drynessScore}%` }} />
            </div>
          </div>
          <div>
            <p className="text-slate-500">Упругость</p>
            <div className="mt-1 h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${data.curlScore}%` }} />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-slate-700">Рекомендации</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {data.recommendations.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Скачать отчёт</Button>
          <Button>Поделиться</Button>
        </div>
      </CardContent>
    </Card>
  );
}

