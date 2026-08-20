import { NextResponse } from "next/server";
import { getFleetSnapshot } from "@/lib/fleet";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getFleetSnapshot(), { headers: { "Cache-Control": "no-store" } });
}
