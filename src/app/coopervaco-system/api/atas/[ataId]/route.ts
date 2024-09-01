import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

const prisma = db;

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
