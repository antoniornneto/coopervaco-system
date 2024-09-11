import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

const prisma = db;

async function updateAta(id: string, formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const topics = formData.get("topics") as string;
  const approved_topics = formData.get("approved_topics") as string;
  const idAta = id;

  await prisma.ata.update({
    where: {
      id: idAta,
    },
    data: {
      title,
      topics,
      approved_topics,
    },
  });

  redirect("/coopervaco-system");
}

const SystemActions = {
  updateAta,
};

export default SystemActions;
