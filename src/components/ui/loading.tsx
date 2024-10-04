import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Loader2 className="animate-spin" size={80} />
      <span className="text-5xl">Carregando...</span>
    </div>
  );
};

export default Loading;
