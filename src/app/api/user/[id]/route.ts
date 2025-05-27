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
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }
  
  if (!params.id) {
    return NextResponse.json({
      message: "Não foi possível encontrar o ID do usuário.",
    });
  }

  const getEmployeeId = await db.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      employeeId: true,
    },
  });

  if (!getEmployeeId) {
    return NextResponse.json(
      { message: "Não foi possível encontrar o ID do cooperado." },
      { status: 400 }
    );
  }

  const employeeId = getEmployeeId?.employeeId.toString();

  await db.user.delete({
    where: {
      id: params.id,
    },
  });

  await db.employee.delete({
    where: {
      id: employeeId,
    },
  });

  return NextResponse.json(
    { message: "Usuário excluído com sucesso." },
    { status: 200 }
  );
}
