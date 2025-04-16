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
