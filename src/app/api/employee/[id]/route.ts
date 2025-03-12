import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json(
      { message: "Não foi possível capturar o ID do cooperado." },
      { status: 409 }
    );
  }

  const getUser = await db.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(getUser, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json(
      { message: "Não foi possível capturar o ID do cooperado." },
      { status: 409 }
    );
  }

  const getUser = await db.user.findUnique({
    where: {
      id: params.id,
    },
  });

  await db.user.delete({
    where: {
      id: params.id,
    },
  });

  await db.employee.delete({
    where: {
      id: getUser?.employeeId,
    },
  });

  return NextResponse.json({ message: `Usuário deletado.` }, { status: 200 });
}
