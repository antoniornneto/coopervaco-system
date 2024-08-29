import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const atas = await prisma.ata.findMany();

  return NextResponse.json(atas);
}
