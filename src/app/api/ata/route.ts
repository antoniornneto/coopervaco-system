import { db } from "@/lib/db";
import { Ata } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const atas = await db.ata.findMany();

  return NextResponse.json({ atas }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const participants = await req.json();
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

export async function PUT(req: NextRequest) {
  try {
    const { id, title, topics, approved_topics } = await req.json();
    const updateAta = await db.ata.update({
      where: {
        id,
      },
      data: {
        title,
        topics,
        approved_topics,
      },
    });
    return NextResponse.json({ message: "Ata criada" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
