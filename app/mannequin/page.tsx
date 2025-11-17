"use client";

import { ThreeMannequin } from "@/components/three-mannequin";
import { AvatarEditor } from "@/components/avatar-editor";
import { HairResultCard } from "@/components/hair-result-card";

export default function MannequinPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase text-brand-dark">3D Манекен</p>
        <h1 className="text-4xl font-semibold">Выберите прическу и цвет</h1>
        <p className="text-slate-500">Простая 3D сцена на базе Three.js для визуализации причесок и цветов в режиме реального времени.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <ThreeMannequin />
        <AvatarEditor />
      </div>
      <HairResultCard />
    </div>
  );
}

