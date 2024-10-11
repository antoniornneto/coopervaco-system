import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import logoH from "../../public/assets/logo.png";
import logoV from "../../public/assets/logoH.png";
import logoIcon from "../../public/assets/Logo-icone.png";
import bgImage from "../../public/assets/home_bg.png";
import dayjs from "dayjs";
import localizeFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";

dayjs.extend(localizeFormat);
dayjs.locale("pt-br");

export { dayjs };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Midia
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
