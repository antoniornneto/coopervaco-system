import { prisma } from "@/lib/utils";

export async function GET() {
  const users = await prisma.user.findMany();

  return Response.json({ users });
}
