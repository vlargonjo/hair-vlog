import { AdvertiserForm } from "@/components/advertiser-form";
import { mockAds } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdvertisersPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase text-brand-dark">Партнёрам</p>
        <h1 className="text-4xl font-semibold">Лэндинг для брендов</h1>
        <p className="text-slate-500">Аудитория, кейсы и форма заявки на нативную рекламу.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {mockAds.map((ad) => (
          <Card key={ad.id}>
            <CardHeader>
              <CardTitle>{ad.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>CTR: {ad.metrics.ctr}%</p>
              <p>Показы: {ad.metrics.impressions}</p>
              <a href={ad.url} className="text-brand-dark">
                Подробнее →
              </a>
            </CardContent>
          </Card>
        ))}
      </section>
      <AdvertiserForm />
    </div>
  );
}

