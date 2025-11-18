"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings, History, Lock, Trash2 } from "lucide-react";
import { useHairStore } from "@/hooks/useHairStore";

export default function ProfilePage() {
  const { analysis } = useHairStore();
  const [saveHistory, setSaveHistory] = useState(true);
  const [savePhotos, setSavePhotos] = useState(false);

  return (
    <div className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Личный кабинет
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Управляйте настройками и просматривайте историю анализов
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Info */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Профиль
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand/10 text-brand text-xl font-semibold">
                  УВ
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Пользователь
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    user@example.com
                  </p>
                </div>
                <Button variant="outline">Изменить</Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Настройки приватности
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Сохранять историю анализов
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Разрешить сохранение истории ваших анализов для быстрого доступа
                  </p>
                </div>
                <Switch checked={saveHistory} onCheckedChange={setSaveHistory} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Сохранять загруженные фото
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    По умолчанию фото не сохраняются. Включите только при необходимости.
                  </p>
                </div>
                <Switch checked={savePhotos} onCheckedChange={setSavePhotos} />
              </div>
            </CardContent>
          </Card>

          {/* Analysis History */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                История анализов
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysis ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {analysis.hairType}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {new Date(analysis.createdAt).toLocaleDateString("ru-RU")}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Просмотреть
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-slate-600 dark:text-slate-400">
                  История анализов пуста
                </p>
              )}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Trash2 className="h-5 w-5" />
                Опасная зона
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                    Удалить все данные
                  </p>
                  <p className="mb-4 text-xs text-slate-600 dark:text-slate-400">
                    Это действие нельзя отменить. Все ваши данные будут удалены навсегда.
                  </p>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950">
                    Удалить все данные
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

