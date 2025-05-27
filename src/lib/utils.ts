import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import logoH from "../../public/assets/logo.png";
import logoV from "../../public/assets/logoH.png";
import logoIcon from "../../public/assets/Logo-icone.png";
import bgImage from "../../public/assets/home_bg.png";
import dayjs from "dayjs";
import { toast } from "sonner";
import localizeFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
import {
  FetchAPIParams,
  FormatedDataParams,
  HandleErrorParams,
} from "@/types/types";

dayjs.extend(localizeFormat);
dayjs.locale("pt-br");

export { dayjs };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Media
export const logoCooperativaX = logoH;
export const logoCooperativaY = logoV;
export const backgroundImage = bgImage;
export const logoCooperativaIcon = logoIcon;

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

export default function formatToIso(date: string) {
  const [day, month, year] = date.split("/");

  return dayjs(`${year}-${month}-${day}`).toISOString();
}

interface templateEmail {
  titleText: string;
  date: string;
}

export const templateEmail = ({ titleText, date }: templateEmail) => {
  return `
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
      <h3>Título da ATA: ${titleText}</h3>
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
};

export const formatedFormUserData = async ({
  cpf,
  name,
  position,
  email,
  inscription,
  password,
}: FormatedDataParams) => {
  const nameToUpper = await name?.toUpperCase();
  const positionToUpper = await position?.toUpperCase();
  const emailToLower = await email?.toLowerCase();
  const formatedInscription = await inscription?.toString().padStart(4, "0");

  let data = {};

  if (password) {
    return (data = {
      cpf: cpf,
      name: nameToUpper,
      position: positionToUpper,
      email: emailToLower,
      inscription: formatedInscription,
      password,
    });
  }

  data = {
    cpf: cpf,
    name: nameToUpper,
    position: positionToUpper,
    email: emailToLower,
    inscription: formatedInscription,
  };

  return data;
};

export const HandleError = async (responseBody: HandleErrorParams) => {
  console.log(responseBody);

  const msgError =
    "Desculpe, parece que tivemos um erro no servidor. Entre em contato com o suporte.";

  if (responseBody.status === 200) {
    toast.info(responseBody.data.message);
    return;
  }

  if (responseBody.status === 201) {
    toast.success(responseBody.data.message);
    return;
  }

  if (responseBody.status === 404) {
    return toast.error(responseBody.data.message);
  }

  if (responseBody.status === 409) {
    return toast.warning(responseBody.data.message);
  }

  if (responseBody.status === 500) {
    toast.error(msgError);
    return location.replace("/dashboard");
  }
};

export const FetchAPI = async ({ path, method, data }: FetchAPIParams) => {
  const options: RequestInit = {
    cache: "no-store",
    method,
    headers:
      method !== "GET" && method !== "DELETE"
        ? { "Content-Type": "application/json" }
        : undefined,
    body:
      method !== "GET" && method !== "DELETE" && data
        ? JSON.stringify(data)
        : undefined,
  };

  const response = await fetch(path, options);

  const responseBody = await response.json();

  const bodyReq = {
    data: responseBody,
    status: response.status,
    ok: response.ok,
  };

  await HandleError(bodyReq);

  return bodyReq;
};
