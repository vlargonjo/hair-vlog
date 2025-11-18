import { mockProcedures } from "@/lib/mockData";
import { ProcedureCard } from "@/components/procedure-card";

export default function ProceduresPage() {
  return (
    <div className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Процедуры ухода
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Пошаговые ритуалы для разных типов волос, подготовленные экспертами
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {mockProcedures.map((procedure) => (
            <ProcedureCard key={procedure.id} procedure={procedure} />
          ))}
        </div>
      </div>
    </div>
  );
}

