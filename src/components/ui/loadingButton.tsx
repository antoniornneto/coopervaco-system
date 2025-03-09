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
    <button
      className={`${width} ${heigth} ${text} bg-zinc-300 hover:bg-zinc-200/80 ${rounded} text-white p-2 flex flex-1 justify-center items-center gap-2`}
      disabled
    >
      <Loader2 className="animate-spin" size={20} />
      Carregando...
    </button>
  );
};

export default LoadingButton;
