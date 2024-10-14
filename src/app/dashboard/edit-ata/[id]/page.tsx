import { db } from "@/lib/db";
import EditAtaForm from "@/components/form/EditAtaForm";
import HeaderAta from "@/components/ui/headerAta";

const editAta = async ({ params }: { params: { id: string } }) => {
  const ata = await db.ata.findUnique({
    where: {
      id: params.id,
    },
  });

  const date = ata?.createdAt as Date;

  return (
    <main>
      {/* Header */}
      <HeaderAta date={date} />
      {/* Body */}
      <div className="flex justify-center">
        <EditAtaForm ata={ata} />
      </div>
    </main>
  );
};

export default editAta;
