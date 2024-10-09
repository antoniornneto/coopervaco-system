import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { dayjs } from "@/lib/utils";
import { Employee } from "@prisma/client";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const cpf = params.get("cpf") as string;
  const inscription = params.get("inscription") as string;
  const name = params.get("name") as string;

  // checando se o funcionário existe
  if (name) {
    const existingEmployee = await db.employee.findUnique({
      where: {
        name,
      },
    });
    return NextResponse.json({ existingEmployee });
  } else {
    const existingEmployee = await db.employee.findUnique({
      where: {
        name,
        cpf,
        inscription,
      },
    });

    if (!existingEmployee) {
      return NextResponse.json(
        { message: "Funcionário não encontrado no banco de dados." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Funcionário encontrado.", existingEmployee },
      { status: 201 }
    );
  }
}

export async function POST(req: Request) {
  const body: Employee = await req.json();
  const birthdayDate = dayjs(body.birthday).toISOString();

  // checando se o CPF já existe para outro usuário
  const existingEmployeeByCpf = await db.employee.findUnique({
    where: {
      cpf: body.cpf,
    },
  });
  if (existingEmployeeByCpf) {
    return NextResponse.json(
      { message: "Já existe um funcionário cadastrado com esse CPF" },
      { status: 409 }
    );
  }

  // checando se o nome já existe para outro usuário
  const existingEmployeeByName = await db.employee.findUnique({
    where: {
      name: body.name,
    },
  });
  if (existingEmployeeByName) {
    return NextResponse.json(
      { message: "Já existe um funcionário cadastrado com esse nome" },
      { status: 409 }
    );
  }

  // checando se a matricula já existe para outro usuário
  const existingEmployeeByInscription = await db.employee.findUnique({
    where: {
      inscription: body.inscription,
    },
  });

  if (existingEmployeeByInscription) {
    return NextResponse.json(
      { message: "Já existe um funcionário cadastrado com essa matrícula" },
      { status: 409 }
    );
  }

  const newEmployee = await db.employee.create({
    data: {
      cpf: body.cpf,
      name: body.name,
      inscription: body.inscription,
      birthday: birthdayDate,
      position: body.position,
      user: {
        create: {
          cpf: body.cpf,
          name: body.name,
          inscription: body.inscription,
          image: "",
        },
      },
    },
  });

  return NextResponse.json(
    { newEmployee, message: "Funcionário cadastrado com sucesso" },
    { status: 201 }
  );
}

export async function PUT(req: Request) {
  try {
    const { cpf, name, inscription, birthday, position, email } =
      await req.json();
    const birthdayDate = dayjs(birthday).toISOString();

    const updateEmployee = await db.employee.update({
      where: {
        cpf,
      },
      data: {
        name,
        inscription,
        position,
        birthday: birthdayDate,
      },
    });

    const updateUser = await db.user.update({
      where: {
        cpf,
      },
      data: {
        email,
      },
    });
    return NextResponse.json({ message: updateEmployee }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Erro maluco" }, { status: 400 });
  }
}
