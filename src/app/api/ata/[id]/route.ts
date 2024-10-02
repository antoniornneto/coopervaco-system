import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleteAta = await db.ata.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({ status: 200 });
}
