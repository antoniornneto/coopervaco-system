import Link from "next/link";
import { Button } from "./button";
import { Pencil } from "lucide-react";

const EditButton = ({ ataId }: { ataId: string }) => {
  return (
    <Button className="bg-transparent w-fit hover:bg-transparent p-2">
      <Link href={`/dashboard/edit-ata/${ataId}`}>
        <Pencil color="black" size={20} />
      </Link>
    </Button>
  );
};

export default EditButton;
