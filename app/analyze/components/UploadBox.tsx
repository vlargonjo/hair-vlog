"use client";

import { useState, useRef } from "react";
import { Upload, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useHairStore } from "@/hooks/useHairStore";

export function UploadBox() {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [saveAllowed, setSaveAllowed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setPhoto } = useHairStore();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("Файл превышает лимит 10MB");
      return;
    }

    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // В реальном приложении здесь будет логика захвата фото с камеры
      alert("Функция камеры будет реализована");
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      alert("Не удалось получить доступ к камере");
    }
  };

  const removePhoto = () => {
    setPreview(null);
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardContent className="p-6">
        <div className="space-y-6">
          {!preview ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
                dragActive
                  ? "border-brand bg-brand/5"
                  : "border-slate-300 bg-slate-50 hover:border-brand/50 hover:bg-slate-100/50 dark:border-slate-700 dark:bg-slate-900/50"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mb-4 h-12 w-12 text-slate-400" />
              <p className="mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                Перетащите файл или нажмите для выбора
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, WebP до 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img src={preview} alt="Preview" className="h-64 w-full rounded-xl object-cover" />
              <button
                onClick={removePhoto}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Не сохранять фото</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                По умолчанию фото не сохраняются. Включите сохранение только при необходимости.
              </p>
            </div>
            <Switch checked={!saveAllowed} onCheckedChange={(checked) => setSaveAllowed(!checked)} />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCamera} className="flex-1">
              <Camera className="mr-2 h-4 w-4" />
              Открыть камеру
            </Button>
            <Button className="flex-1" disabled={!preview}>
              Запустить анализ
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

