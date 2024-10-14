import { db } from "@/lib/db";
import { FileSignature } from "lucide-react";
import Image from "next/image";

const Signature = async ({ id }: { id: string }) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return (
    <div className="flex flex-col items-center w-72 h-40">
      {user?.signature === null ? (
        <FileSignature className="flex-1" />
      ) : (
        <div className="w-40 h-32 relative">
          <Image
            src={`${user?.signature}`}
            alt={`Assinatura de ${user?.name}`}
            fill
            sizes="100vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      <p className="font-semibold">{`${user?.name}`}</p>
      <p className="text-sm text-[#989898]">Mat.: {`${user?.inscription}`}</p>
    </div>
  );
};

export default Signature;
