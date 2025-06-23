import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const cpfParams = params.get("cpf") || undefined;

    if (!cpfParams) {
      return NextResponse.json(
        { message: "CPF não foi informado." },
        { status: 400 }
      );
    }

    const employeeIsUser = await db.user.findUnique({
      where: {
        cpf: cpfParams,
      },
    });

    if (!employeeIsUser) {
      return NextResponse.json(
        {
          message:
            "Usuário não encontrado, entre em contato com os administradores.",
        },
        { status: 404 }
      );
    }

    // Checando se existe password para decidir se o usário pode criar o cadastro
    if (employeeIsUser?.password !== null) {
      return NextResponse.json(
        { message: "Usuário já possui cadastro." },
        { status: 409 }
      );
    }

    const existingEmployee = await db.employee.findUnique({
      where: {
        cpf: cpfParams,
      },
    });

    if (!existingEmployee) {
      return NextResponse.json(
        { message: "Funcionário não encontrado." },
        { status: 404 }
      );
    }

    const data = {
      cpf: existingEmployee.cpf,
      name: existingEmployee.name,
      inscription: existingEmployee.inscription,
      position: existingEmployee.position,
      email: existingEmployee.email,
    };

    return NextResponse.json(
      { message: "Funcionário encontrado.", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
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
            role: "user",
          },
        },
      },
    });

    return NextResponse.json(
      { newEmployee, message: "Funcionário cadastrado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
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
    return NextResponse.json({ error }, { status: 500 });
  }
}
