import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
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

export async function PATCH(req: NextRequest) {
  const { participants, id } = await req.json();

  const ata = await db.ata.update({
    where: {
      id,
    },
    data: {
      participants,
    },
  });

  return NextResponse.json({ message: "Ata assinada" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleteAta = await db.ata.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      { message: "Ata deletada", deleteAta },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Algo deu errado", error },
      { status: 400 }
    );
  }
}
