import { NextResponse, NextRequest } from "next/server";
import AuthService from "./modules/auth/services/auth-service";

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

const publicRoutes = [
  "/",
  "/sobre",
  "/equipe",
  "/eventos",
  "/orientacoes",
  "/orientacoes/convenios",
  "/orientacoes/parceiros",
  "/orientacoes/noticias",
  "/contato",
  "/ata/cadastro",
  "/ata",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await AuthService.isSessionValid();
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
