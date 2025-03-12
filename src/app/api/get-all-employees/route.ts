import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const employees = await db.employee.findMany();
  return NextResponse.json(employees);
}
