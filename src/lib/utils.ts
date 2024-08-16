import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import logo from "../../public/assets/logo.png";
import logoH from "../../public/assets/logoH.png";
import bgImage from "../../public/assets/home_bg.png";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logoCooperativaX = logo;
export const logoCooperativaY = logoH;
export const backgroundImage = bgImage;
