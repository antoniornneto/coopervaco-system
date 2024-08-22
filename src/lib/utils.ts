import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import logoH from "../../public/assets/logo.png";
import logoV from "../../public/assets/logoH.png";
import logoIcon from "../../public/assets/Logo-icone.png";
import bgImage from "../../public/assets/home_bg.png";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logoCooperativaX = logoH;
export const logoCooperativaY = logoV;
export const backgroundImage = bgImage;
export const logoCooperativaIcon = logoIcon;
