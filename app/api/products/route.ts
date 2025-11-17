import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ items: mockProducts, total: mockProducts.length });
}

export async function POST(request: Request) {
  const product = await request.json();
  return NextResponse.json({ ...product, id: `p_${Date.now()}` }, { status: 201 });
}

