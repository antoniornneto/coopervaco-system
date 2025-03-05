import Link from "next/link";
import { Pencil } from "lucide-react";

const EditButton = ({ ataId }: { ataId: string }) => {
  return (
      <Link
        className="bg-transparent w-fit hover:bg-transparent p-2"
        href={`/dashboard/edit-ata/${ataId}`}
      >
        <Pencil color="black" size={20} />
      </Link>
  );
};

export default EditButton;
