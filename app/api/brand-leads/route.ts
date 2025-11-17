import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  if (!payload.email || !payload.company) {
    return NextResponse.json({ error: "validation_error" }, { status: 400 });
  }
  return NextResponse.json({ leadId: `lead_${Date.now()}` }, { status: 202 });
}

