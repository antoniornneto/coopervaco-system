import { Download } from "lucide-react";
import { Button } from "./button";

const DownloadButton = () => {
  return (
    <Button className="bg-transparent w-fit hover:bg-transparent p-2">
      <Download color="black" size={20} />
    </Button>
  );
};

export default DownloadButton;
