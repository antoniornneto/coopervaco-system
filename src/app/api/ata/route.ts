import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const atas = await db.ata.findMany();

    if (!atas)
      return NextResponse.json({ message: "Not found" }, { status: 400 });

    return NextResponse.json({ atas }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }
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
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }
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

    console.log(updateAta);

    return NextResponse.json({ message: "Ata atualizada" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
