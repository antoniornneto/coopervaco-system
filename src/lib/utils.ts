import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import logo from "../../public/assets/logo.png";
import bgImage from "../../public/assets/home_bg.png";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logoCooperativa = logo;
export const backgroundImage = bgImage;
