import { db } from "@/lib/prisma";
import { RedirectStatusCode } from "next/dist/client/components/redirect-status-code";
import { redirect } from "next/navigation";

const prisma = db;

async function createAta(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const topics = formData.get("topics") as string;
  const approved_topics = formData.get("approved_topics") as string;

  await prisma.ata.create({
    data: {
      title,
      topics,
      approved_topics,
      signatures: "",
    },
  });

  redirect("/coopervaco-system");
}

const SystemActions = {
  createAta,
};

export default SystemActions;
