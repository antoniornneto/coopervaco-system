import { db } from "@/lib/db";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const SignatureAlert = async ({ id }: { id: string | undefined }) => {
  const getUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  const isUserSignature = getUser?.signature ? true : false;

  return (
    <div>
      {!isUserSignature && (
        <div className="text-yellow-800 bg-yellow-100 rounded-lg p-5 flex items-center gap-2">
          <AlertCircle />
          <p>
            Para ter acesso completo as funcionalidades do sistema, lembre-se de
            criar sua assinatura{" "}
            <Link className="hover:underline" href={"/dashboard/profile"}>
              clicando aqui
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default SignatureAlert;
