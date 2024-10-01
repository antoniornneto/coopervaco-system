import NewAtaForm from "@/components/form/NewAtaForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CriarAta({
  params,
}: {
  params: { ataId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <main className="pb-10">
      <NewAtaForm id={params.ataId} />
    </main>
  );
}
