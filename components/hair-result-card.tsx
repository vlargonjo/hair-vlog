import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HairAnalysis } from "@/types";

interface Props {
  analysis?: HairAnalysis;
}

export function HairResultCard({ analysis }: Props) {
  if (!analysis) return null;

  const data = analysis;

  return (
    <Card className="bg-white dark:bg-slate-900 shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <CardTitle className="text-2xl mb-1">Результат анализа</CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">Ваш тип волос и персональные рекомендации</p>
        </div>
        <Badge variant="brand" className="text-base px-4 py-1.5 w-fit">{data.hairType}</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Влажность</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{data.drynessScore}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-brand to-brand/80 transition-all duration-500" 
                style={{ width: `${data.drynessScore}%` }} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Упругость</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{data.curlScore}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" 
                style={{ width: `${data.curlScore}%` }} 
              />
            </div>
          </div>
        </div>
        
        {data.issues && data.issues.length > 0 && (
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Выявленные проблемы</p>
            <div className="flex flex-wrap gap-2">
              {data.issues.map((issue) => (
                <Badge key={issue} variant="outline" className="text-xs">
                  {issue}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Рекомендации по уходу</p>
          <ul className="space-y-2">
            {data.recommendations.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="text-brand mt-0.5">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" className="flex-1 sm:flex-none">
            Скачать отчёт
          </Button>
          <Button className="flex-1 sm:flex-none">
            Поделиться
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

