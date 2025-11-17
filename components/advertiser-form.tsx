"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function AdvertiserForm() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await fetch("/api/brand-leads", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" }
    });
    setStatus("Спасибо! Мы свяжемся с вами в ближайшее время.");
    event.currentTarget.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Запросить медиакит</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="company" placeholder="Компания / бренд" required />
          <Input name="name" placeholder="Имя" required />
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="budget" placeholder="Бюджет, €" />
          <Textarea name="message" placeholder="Расскажите о задаче" />
          <Button type="submit" className="w-full">
            Отправить
          </Button>
          {status && <p className="text-sm text-emerald-500">{status}</p>}
        </form>
      </CardContent>
    </Card>
  );
}

