import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);

  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(user, { status: 200 });
}
