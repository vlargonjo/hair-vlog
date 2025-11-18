"use client";

import { useState } from "react";
import { UploadBox } from "./components/UploadBox";
import { ResultCard } from "./components/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHairStore } from "@/hooks/useHairStore";

const QUESTIONS = [
  { id: "wash", question: "Как часто вы моете голову?", options: ["Каждый день", "Через день", "2 раза в неделю"] },
  { id: "scalp", question: "Как чувствует себя кожа головы?", options: ["Сухая", "Нормальная", "Жирная"] },
  { id: "styling", question: "Используете ли тепло-укладку?", options: ["Да", "Иногда", "Нет"] }
];

export default function AnalyzePage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { setAnalysis, analysis } = useHairStore();

  const submitAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/hair/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            2D-анализ фото
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Загрузите фото и пройдите тест для получения персональных рекомендаций
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <UploadBox />
          
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Тест-опросник</CardTitle>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Ответьте на несколько вопросов для точного анализа
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {QUESTIONS.map((item) => (
                <div key={item.id} className="space-y-3">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{item.question}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.options.map((option) => (
                      <button
                        key={option}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                          answers[item.id] === option
                            ? "bg-brand text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        }`}
                        onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: option }))}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Button
                onClick={submitAnalysis}
                disabled={loading || Object.keys(answers).length < QUESTIONS.length}
                className="w-full"
                size="lg"
              >
                {loading ? "Анализируем..." : "Получить результат"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {analysis && (
          <div className="mt-8">
            <ResultCard analysis={analysis} />
          </div>
        )}
      </div>
    </div>
  );
}

