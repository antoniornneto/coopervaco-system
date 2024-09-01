import { db } from "@/lib/prisma";

const prisma = db;
export async function GET() {
  const users = await prisma.user.findMany();

  return Response.json({ users });
}
