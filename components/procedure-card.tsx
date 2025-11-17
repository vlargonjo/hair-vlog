import { Procedure } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Props {
  procedure: Procedure;
}

export function ProcedureCard({ procedure }: Props) {
  return (
    <Card className="flex flex-col gap-3">
      <CardHeader>
        <CardTitle>{procedure.title}</CardTitle>
        <p className="text-sm text-slate-500">{procedure.summary}</p>
      </CardHeader>
      <CardContent>
        <p className="text-xs uppercase text-slate-400">Шаги</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-600">
          {procedure.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>⏱ {procedure.duration} мин</span>
          <span>Сложность: {procedure.difficulty}</span>
        </div>
        <Button variant="outline" className="mt-4 w-full">
          Смотреть подробно
        </Button>
      </CardContent>
    </Card>
  );
}

