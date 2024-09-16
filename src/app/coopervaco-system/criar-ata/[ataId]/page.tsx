import CriarAtaForm from "@/modules/auth/components/create-ata-form";

export default function CriarAta({ params }: { params: { ataId: string } }) {
  return (
    <div className="pb-10">
      <CriarAtaForm id={params.ataId} />
    </div>
  );
}
