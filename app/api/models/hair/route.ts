import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    styles: [
      { id: "long-layered", name: "Длинные слои", difficulty: "easy" },
      { id: "bob", name: "Боб", difficulty: "medium" },
      { id: "curly", name: "Кудри", difficulty: "medium" }
    ],
    colors: ["#2F1B12", "#8C5B3F", "#C88965", "#F7E0C8", "#D73D6C"]
  });
}

