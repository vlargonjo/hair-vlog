export function StatsBanner() {
  const stats = [
    { label: "Конверсия upload → результат", value: "10%+" },
    { label: "CTR партнёрских ссылок", value: "4%+" },
    { label: "Share rate", value: "8%+" }
  ];

  return (
    <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-3xl font-semibold">{stat.value}</span>
          <span className="text-sm text-slate-500">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}

