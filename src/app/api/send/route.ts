import { sendEmail } from "@/lib/mail.utils";
import { templateEmail } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { date, title, mails } = await req.json();
  const sender = {
    name: "⚠ SISTEMA COOPERVAÇO",
    address: "antonionascneto@gmail.com",
  };

  const receipients = mails;

  const template = `
  <div>
    <i>
      <strong>NÃO RESPONDA ESSE E-MAIL.</strong>
    </i>
    <h3>
      Você possui uma ata pendente de assinatura no sistema.
    </h3>
    <h3>
      <strong>Informações:</strong>
    </h3>
    <ul>
      <h3>Título da ATA: ${title}</h3>
      <h3>Data da criação: ${date}</h3>
      <h3>Assinatura: Pendente</h3>
    </ul>
    <h3>
      Assine agora <a href="https://www.coopervaco.com.br/sign-in">clicando aqui.</a>
    </h3>
    <br />
    <br />
    <i>
      Esta é uma mensagem automática do sistema. Caso você desconheça o assunto
      informado, favor desconsiderar. Não responda esse e-mail.
    </i>
    </div>
  `;

  try {
    const result = await sendEmail({
      html: template,
      subject: "SISTEMA COOPERVAÇO",
      sender: sender,
      receipients: receipients,
    });
    return NextResponse.json({
      accepted: result.accepted,
    });
  } catch (error) {
    return NextResponse.json(
      { message: `${error} Unable to sendo email this time.` },
      { status: 500 }
    );
  }
}
