"use client";
import { Button } from "./button";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

const UpdatePage = () => {
  const [loading, setLoading] = useState(false);

  const updatePage = (state: boolean) => {
    setLoading(!state);
    location.reload();
  };

  return (
    <Button
      variant={"outline"}
      onClick={() => updatePage(loading)}
      className="flex items-center gap-2"
    >
      {" "}
      <RefreshCcw
        size={18}
        className={`${loading === true ? "animate-spin" : "animate-none"}`}
      />
      Atualizar
    </Button>
  );
};

export default UpdatePage;
