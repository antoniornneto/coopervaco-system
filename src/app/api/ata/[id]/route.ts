import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const getAta = await db.ata.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({ ata: getAta }, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, topics, approved_topics } = await req.json();
    const updatedAta = await db.ata.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        topics,
        approved_topics,
      },
    });

    return NextResponse.json(
      { message: `Ata atualizada`, updatedAta },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleteAta = await db.ata.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({ status: 200 });
}
