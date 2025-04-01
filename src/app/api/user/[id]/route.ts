import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({
      message: "ID não informado. Não foi possível excluir o usuário.",
    });
  }

  await db.user.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(
    { message: "Usuário excluído com sucesso." },
    { status: 200 }
  );
}
