import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import formatToIso, { dayjs } from "@/lib/utils";
import { Employee } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const cpfParams = params.get("cpf") || undefined;

    if (!cpfParams) {
      return NextResponse.json(
        { error: "CPF não foi informado." },
        { status: 400 }
      );
    }

    const cpfSemFormatacao = cpfParams.replace(/\D/g, "");

    console.log(cpfSemFormatacao);

    const employeeIsUser = await db.user.findUnique({
      where: {
        cpf: cpfSemFormatacao,
      },
    });

    if (employeeIsUser?.email !== null && employeeIsUser?.password !== null) {
      return NextResponse.json(
        { error: "Usuário já possui cadastro" },
        { status: 409 }
      );
    }

    const existingEmployee = await db.employee.findUnique({
      where: {
        cpf: cpfSemFormatacao,
      },
    });

    console.log(existingEmployee);

    if (!existingEmployee) {
      return NextResponse.json(
        { error: "Funcionário não encontrado." },
        { status: 404 }
      );
    }

    const data = {
      cpf: existingEmployee.cpf,
      name: existingEmployee.name,
      inscription: existingEmployee.inscription,
      position: existingEmployee.position,
    };

    return NextResponse.json(
      { message: "Funcionário encontrado.", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
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
  const { cpf, name, inscription, birthday, position, email } =
    await req.json();
  const date: string = birthday;
  const newDate = formatToIso(date);

  try {
    const updateEmployee = await db.employee.update({
      where: {
        cpf,
      },
      data: {
        name,
        inscription,
        position,
        birthday: newDate,
      },
    });

    const updateUser = await db.user.update({
      where: {
        cpf,
      },
      data: {
        email,
        name,
        inscription,
      },
    });
    return NextResponse.json({ message: "Dados atualizados" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
