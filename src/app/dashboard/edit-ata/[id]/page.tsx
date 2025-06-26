import { db } from "@/lib/db";
import EditAtaForm from "@/components/form/EditAtaForm";
import HeaderEditAta from "@/components/ui/headerAtaEdit";

const editAta = async ({ params }: { params: { id: string } }) => {
  const ata = await db.ata.findUnique({
    where: {
      id: params.id,
    },
  });

  const date = {
    createdAt: ata?.createdAt as Date,
    updateAt: ata?.updatedAt as Date,
  };

  return (
    <main>
      {/* Header */}
      <HeaderEditAta id={params.id} date={date} />
      {/* Body */}
      <div className="flex justify-center">
        <EditAtaForm ata={ata} />
      </div>
    </main>
  );
};

export default editAta;
