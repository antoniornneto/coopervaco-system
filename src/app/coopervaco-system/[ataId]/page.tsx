import ListAta from "@/modules/users/components/list-ata";

export default function Ata({ params }: { params: { ataId: string } }) {
  return (
    <div>
      <ListAta id={params.ataId} />
    </div>
  );
}
