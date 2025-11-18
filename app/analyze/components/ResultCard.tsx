"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { HairAnalysis } from "@/types";

interface Props {
  analysis?: HairAnalysis;
}

export function ResultCard({ analysis }: Props) {
  if (!analysis) return null;

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Результат анализа</CardTitle>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Ваш тип волос и персональные рекомендации
            </p>
          </div>
          <Badge className="bg-brand/10 text-brand border-brand/20 px-3 py-1.5 text-base">
            {analysis.hairType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600 dark:text-slate-400">Влажность</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{analysis.drynessScore}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-brand/80 transition-all duration-500"
                style={{ width: `${analysis.drynessScore}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600 dark:text-slate-400">Упругость</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{analysis.curlScore}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${analysis.curlScore}%` }}
              />
            </div>
          </div>
        </div>

        {analysis.issues && analysis.issues.length > 0 && (
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Выявленные проблемы</p>
            <div className="flex flex-wrap gap-2">
              {analysis.issues.map((issue) => (
                <Badge key={issue} variant="outline" className="text-xs">
                  {issue}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Рекомендации по уходу</p>
          <ul className="space-y-2.5">
            {analysis.recommendations.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="mt-0.5 text-brand">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <Button variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Скачать отчёт
          </Button>
          <Button className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Поделиться
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

