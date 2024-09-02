import ListarAta from "@/modules/gets/components/listar-ata";

export default function Ata({ params }: { params: { ataId: string } }) {
  return (
    <div>
      <ListarAta id={params.ataId} />
    </div>
  );
}
