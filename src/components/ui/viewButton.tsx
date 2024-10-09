import { Eye, Link } from "lucide-react";
import { Button } from "./button";

const ViewButton = ({ ataId }: { ataId: string }) => {
  return (
    <Button className="bg-transparent w-fit hover:bg-transparent p-2">
      <Link href={`/dashboard/view-ata/${ataId}`}>
        <Eye color="black" size={20} />
      </Link>
    </Button>
  );
};

export default ViewButton;
