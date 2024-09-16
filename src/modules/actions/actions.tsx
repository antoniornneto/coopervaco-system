import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

const prisma = db;

async function updateAta(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const topics = formData.get("topics") as string;
  const approved_topics = formData.get("approved_topics") as string;

  await prisma.ata.update({
    where: {
      id: id,
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
