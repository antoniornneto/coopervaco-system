import { Loader2 } from "lucide-react";

const LoadingButton = ({
  width = "w-fit",
  rounded = "rounded-md",
  text = "text-base",
  heigth = "h-fit",
}: {
  width?: string;
  heigth?: string;
  rounded?: string;
  text?: string;
}) => {
  return (
    <div
      className={`${width} ${heigth} ${text} bg-[#5DA770] hover:bg-[#5DA770]/80 ${rounded} text-white p-2 flex flex-1 justify-center items-center gap-2`}
    >
      <Loader2 className="animate-spin" size={20} />
      <span className="">Carregando...</span>
    </div>
  );
};

export default LoadingButton;
