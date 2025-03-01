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

    const employeeIsUser = await db.user.findUnique({
      where: {
        cpf: cpfParams,
      },
    });

    // Checando se existe password para decidir se o usário pode criar o cadastro
    if (employeeIsUser?.password !== null) {
      return NextResponse.json(
        { error: "Usuário já possui cadastro." },
        { status: 409 }
      );
    }

    const existingEmployee = await db.employee.findUnique({
      where: {
        cpf: cpfParams,
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

  try {
    // checando se o CPF já existe para outro usuário
    const existingEmployeeByCpf = await db.employee.findUnique({
      where: {
        cpf: body.cpf,
      },
    });
    if (existingEmployeeByCpf) {
      return NextResponse.json(
        { message: "CPF cadastrado em outro(a) usuário(a)." },
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
        { message: "NOME cadastrado em outro(a) usuário(a)." },
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
        { message: "MATRÍCULA cadastrada em outro(a) usuário(a)." },
        { status: 409 }
      );
    }

    const existingEmployeeByEmail = await db.employee.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingEmployeeByEmail) {
      return NextResponse.json(
        { message: "EMAIL cadastrado em outro(a) usuário(a)." },
        { status: 409 }
      );
    }

    const newEmployee = await db.employee.create({
      data: {
        cpf: body.cpf,
        name: body.name,
        inscription: body.inscription,
        position: body.position,
        email: body.email,
        user: {
          create: {
            cpf: body.cpf,
            name: body.name,
            inscription: body.inscription,
            image: "",
            email: body.email,
          },
        },
      },
    });

    return NextResponse.json(
      { newEmployee, message: "Funcionário cadastrado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { cpf, name, inscription, position, email } = await req.json();

  try {
    await db.employee.update({
      where: {
        cpf,
      },
      data: {
        name,
        inscription,
        position,
        email,
      },
    });

    const teste = await db.user.update({
      where: {
        cpf,
      },
      data: {
        email,
        name,
        inscription,
      },
    });

    return NextResponse.json(
      { message: "Cadastro atualizado!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
