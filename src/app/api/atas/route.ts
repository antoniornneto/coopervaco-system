import { prisma } from "@/lib/utils";

export async function GET() {
  const atas = await prisma.ata.findMany();

  return Response.json({ atas });
}
