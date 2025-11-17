import { NextResponse } from "next/server";
import { mockProcedures } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ items: mockProcedures });
}

