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
