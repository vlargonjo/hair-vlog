import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const answers = body.answers ?? {};

  const baseType = answers.scalp === "Жирная" ? "Straight-1" : "Wavy-2B";
  const response = {
    analysisId: "a_" + Date.now(),
    hairType: baseType,
    issues: ["Dry ends", "Frizz"],
    tips: [
      "Используйте бессульфатный шампунь дважды в неделю.",
      "Добавьте увлажняющую маску с алоэ."
    ],
    recommendedProducts: mockProducts,
    shareCard: {
      title: `Ваш тип волос: ${baseType}`,
      cta: "Посмотреть подборку"
    }
  };

  return NextResponse.json(response, { status: 200 });
}

