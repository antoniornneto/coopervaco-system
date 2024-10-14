import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const users = await db.user.findMany();
  return NextResponse.json({ users });
}
