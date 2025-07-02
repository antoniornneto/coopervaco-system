import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Schema de validação
const userSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido"),
  name: z.coerce.string().min(10, "Preencha com o nome completo"),
  inscription: z.coerce.string().min(1),
  email: z.coerce.string(),
  position: z.coerce.string(),
  password: z
    .string()
    .min(1, "Senha é obrigatório")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const cpf = params.get("cpf") as string;
  const email = params.get("email") as string;

  if (email) {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    return NextResponse.json({ existingUser });
  }

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
        { status: 409 }
      );
    }

    return NextResponse.json({ message: existingUser }, { status: 201 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    const body = await req.json();
    const { cpf, name, email, password, position, inscription } =
      userSchema.parse(body);
    const hashPassword = await hash(password, 10);

    await db.employee.update({
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
        name,
        position,
        inscription,
        email,
      },
    });

    return NextResponse.json(
      {
        message: "Conta criada com sucesso.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Desculpe, tivemos um problema no servidor. Contate o administrador.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { id, signature } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json(
      { message: "Aconteceu um erro inesperado" },
      { status: 400 }
    );
  }

  if (signature) {
    const updateSignature = await db.user.update({
      where: {
        id,
      },
      data: {
        signature,
      },
    });

    return NextResponse.json(
      { message: "Assinatura atualizada" },
      { status: 200 }
    );
  }

  return NextResponse.json({ status: 200 });
}

export async function PUT(req: NextRequest) {
  const { id, cpf, name, role, inscription, email, password, isReset } =
    await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json(
      {
        message: "Sem o ID não é possível encontrar o usuário.",
      },
      { status: 400 }
    );
  }

  if (!password) {
    await db.user.update({
      where: {
        id,
      },
      data: {
        cpf,
        name,
        role,
        inscription,
        email,
      },
    });

    return NextResponse.json(
      { message: "Usuário atualizado com sucesso." },
      { status: 200 }
    );
  }

  if (isReset) {
    const hashPassword = await hash(password, 10);
    await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashPassword,
      },
    });

    return NextResponse.json(
      { message: `A senha do usuário foi resetada para "coopervaco2025".` },
      { status: 200 }
    );
  } else {
    const hashPassword = await hash(password, 10);

    await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashPassword,
      },
    });

    return NextResponse.json({ message: `Senha alterada.` }, { status: 200 });
  }
}
