import { db } from "@/lib/prisma";
import { Ata } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = db;

export async function POST(req: NextRequest) {
  const { participants }: Ata = await req.json();

  const newAta = await prisma.ata.create({
    data: {
      participants: participants,
    },
  });

  return NextResponse.json(newAta.id);
}
