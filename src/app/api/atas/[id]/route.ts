import { prisma } from "@/lib/utils";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET({ params }: Params) {
  //   const ata = await prisma.ata.findUnique({
  //     where: {
  //       id: params,
  //     },
  //   });

  return Response.json({ params });
}
