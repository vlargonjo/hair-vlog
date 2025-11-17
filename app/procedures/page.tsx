import { mockProcedures } from "@/lib/mockData";
import { ProcedureCard } from "@/components/procedure-card";

export default function ProceduresPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-semibold">Процедуры ухода</h1>
        <p className="text-slate-500">SEO-friendly список ритуалов, подготовленный редакцией.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {mockProcedures.map((procedure) => (
          <ProcedureCard key={procedure.id} procedure={procedure} />
        ))}
      </div>
    </div>
  );
}

