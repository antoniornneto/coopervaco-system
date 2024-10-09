import { Eye } from "lucide-react";
import Link from "next/link";

const ViewButton = ({ ataId }: { ataId: string }) => {
  return (
    <Link
      className="bg-transparent w-fit hover:bg-transparent p-2"
      href={`/dashboard/view-ata/${ataId}`}
    >
      <Eye color="black" size={20} />
    </Link>
  );
};

export default ViewButton;
