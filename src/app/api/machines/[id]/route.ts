import { NextResponse } from "next/server";
import { getFleetSnapshot } from "@/lib/fleet";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const machine = (await getFleetSnapshot()).machines.find((item) => item.id === id);
  return machine ? NextResponse.json(machine) : NextResponse.json({ error: "Machine not found" }, { status: 404 });
}
