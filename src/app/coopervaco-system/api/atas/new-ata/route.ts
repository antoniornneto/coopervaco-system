import { db } from "@/lib/prisma";
import { Ata } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = db;

export async function POST(req: Request) {
  try {
    const { participants }: Ata = await req.json();
    const newAta = await prisma.ata.create({
      data: {
        participants: participants,
      },
    });

    return NextResponse.json(newAta.id);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: JSON.stringify("missing argument") },
      { status: 400 }
    );
  }
}
