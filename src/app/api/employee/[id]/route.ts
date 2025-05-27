import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  if (!params.id) {
    return NextResponse.json(
      { message: "Não foi possível capturar o ID do cooperado." },
      { status: 409 }
    );
  }

  const getUser = await db.employee.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!getUser) {
    return NextResponse.json({ message: "Usuário não encontrado" });
  }


  return NextResponse.json(getUser, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }
  
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
