import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { User } from "@prisma/client";
import * as z from "zod";

// Schema de validação
const userSchema = z.object({
  cpf: z.string(),
  name: z.string(),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  inscription: z.string(),
  password: z
    .string()
    .min(1, "Senha é obrigatório")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const cpf = params.get("cpf") as string;

  if (!cpf) {
    const allUsers = await db.user.findMany();

    return NextResponse.json(allUsers);
  } else {
    const existingUser = await db.user.findUnique({
      where: {
        cpf,
      },
    });

    if (existingUser?.email) {
      return NextResponse.json(
        { message: "Usuário já possui um cadastro" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: existingUser }, { status: 201 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cpf, name, email, password, inscription } = userSchema.parse(body);
    const hashPassword = await hash(password, 10);

    const newUser = await db.employee.update({
      where: {
        cpf,
      },
      data: {
        user: {
          update: {
            name,
            inscription,
            email,
            role: "user",
            password: hashPassword,
          },
        },
      },
    });

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    const { password: newUserPassword, ...userWithOutPassword } = user as User;

    return NextResponse.json(
      {
        user: userWithOutPassword,
        message: "Conta de usuário criada com sucesso",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Algo deu errado",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { email, path } = await req.json();

  const userAvatar = await db.user.update({
    where: {
      email,
    },
    data: {
      image: path,
    },
  });

  return NextResponse.json({ message: "Avatar atualizado" });
}
