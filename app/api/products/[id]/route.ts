import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";

interface Props {
  params: { id: string };
}

export async function GET(_: Request, { params }: Props) {
  const product = mockProducts.find((item) => item.id === params.id);
  if (!product) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

