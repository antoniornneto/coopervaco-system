import { db } from "@/lib/db";
import { Ata } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const participants = await req.json();
    console.log(participants);
    const newAta = await db.ata.create({
      data: {
        participants,
      },
    });

    return NextResponse.json(newAta.id, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: JSON.stringify("missing argument") },
      { status: 400 }
    );
  }
}
