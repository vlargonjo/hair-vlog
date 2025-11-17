"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { useHairStore } from "@/hooks/useHairStore";
import { Input } from "./ui/input";
import { MAX_UPLOAD_SIZE } from "@/utils/constants";

export function UploadSection() {
  const [saveAllowed, setSaveAllowed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { setPhoto } = useHairStore();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_UPLOAD_SIZE) {
      setMessage("Файл превышает лимит 10MB.");
      return;
    }

    setPhoto(file);
    setMessage("Фото готово к анализу.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("save", String(saveAllowed));

    await fetch("/api/upload", {
      method: "POST",
      body: formData
    }).catch(() => setMessage("Ошибка загрузки"));
  };

  return (
    <Card className="bg-white/70 backdrop-blur dark:bg-slate-900/70">
      <CardHeader>
        <CardTitle>Загрузите фото или воспользуйтесь камерой</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <label
          htmlFor="photo-upload"
          className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 text-center text-slate-500 transition hover:border-brand-dark hover:text-brand-dark dark:border-slate-700"
        >
          <p className="font-medium">Перетащите файл или нажмите для выбора</p>
          <p className="text-xs text-slate-400">PNG/JPG/WebP до 10MB</p>
          <Input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
        <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800/60">
          <div>
            <p className="text-sm font-medium">Не сохранять фото</p>
            <p className="text-xs text-slate-500">По умолчанию фото не сохраняются. Включите сохранение только при необходимости.</p>
          </div>
          <Switch checked={!saveAllowed} onCheckedChange={(checked) => setSaveAllowed(!checked)} aria-label="Не сохранять фото" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Открыть камеру</Button>
          <Button>Запустить анализ</Button>
        </div>
        {message && <p className="text-sm text-slate-600">{message}</p>}
      </CardContent>
    </Card>
  );
}

