"use client";

import { useState } from "react";
import { UploadSection } from "@/components/upload-section";
import { HairResultCard } from "@/components/hair-result-card";
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
    const response = await fetch("/api/hair/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers })
    });
    const data = await response.json();
    setAnalysis(data);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold">Анализ волос</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <UploadSection />
        <Card>
          <CardHeader>
            <CardTitle>Тест-опросник</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {QUESTIONS.map((item) => (
              <div key={item.id} className="space-y-2">
                <p className="font-medium">{item.question}</p>
                <div className="flex flex-wrap gap-2">
                  {item.options.map((option) => (
                    <button
                      key={option}
                      className={`rounded-full px-4 py-2 text-sm ${
                        answers[item.id] === option ? "bg-brand text-white" : "bg-slate-100 text-slate-600"
                      }`}
                      onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: option }))}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <Button onClick={submitAnalysis} disabled={loading} className="w-full">
              {loading ? "Анализируем..." : "Получить результат"}
            </Button>
          </CardContent>
        </Card>
      </div>
      <HairResultCard analysis={analysis} />
    </div>
  );
}

