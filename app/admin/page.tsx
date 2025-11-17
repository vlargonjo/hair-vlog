import { AdminPanel } from "@/components/admin-panel";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase text-brand-dark">Контент-менеджмент</p>
        <h1 className="text-4xl font-semibold">Админ-панель</h1>
        <p className="text-slate-500">CRUD продуктов, процедур и контента.</p>
      </header>
      <AdminPanel />
    </div>
  );
}

