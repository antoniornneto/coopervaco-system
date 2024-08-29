import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const id = params.ataId.toString();
  const ata = await prisma.ata.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(ata);
}
