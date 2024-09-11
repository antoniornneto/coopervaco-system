import { db } from "@/lib/prisma";
import { NextApiHandler } from "next";
import { NextResponse } from "next/server";

const prisma = db;

export async function GET() {
  const atas = await prisma.ata.findMany();

  return NextResponse.json(atas);
}
