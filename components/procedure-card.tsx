import { Procedure } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Props {
  procedure: Procedure;
}

export function ProcedureCard({ procedure }: Props) {
  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{procedure.title}</CardTitle>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{procedure.summary}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Шаги
          </p>
          <ol className="space-y-2.5">
            {procedure.steps.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                  {index + 1}
                </span>
                <span className="flex-1 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
          <span>⏱ {procedure.duration} мин</span>
          <span>Сложность: {procedure.difficulty || "Средняя"}</span>
        </div>
        <Button variant="outline" className="w-full">
          Смотреть подробно
        </Button>
      </CardContent>
    </Card>
  );
}

