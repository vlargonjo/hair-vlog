"use client";

import { ThreeMannequin } from "@/components/three-mannequin";
import { AvatarEditor } from "@/components/avatar-editor";

export default function MannequinPage() {
  return (
    <div className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            3D-манекен
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Выберите прическу и цвет на 3D-модели в режиме реального времени
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
            <ThreeMannequin />
          </div>
          <div>
            <AvatarEditor />
          </div>
        </div>
      </div>
    </div>
  );
}

