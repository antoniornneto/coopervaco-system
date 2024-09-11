import { db } from "@/lib/prisma";
import { Ata } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = db;

export async function PATCH(req: NextRequest, context: any) {
  const { params } = context;
  const id = params.ataId.toString();
  const { title, topics, approved_topics }: Ata = await req.json();

  if (!title) return NextResponse.json({ message: "Missing title" });

  const ata = await prisma.ata.update({
    where: {
      id: id,
    },
    data: {
      title,
      topics,
      approved_topics,
    },
  });

  return NextResponse.json({ message: "Ata created" });
}
