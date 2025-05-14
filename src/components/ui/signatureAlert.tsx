import { db } from "@/lib/db";
import { AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

const SignatureAlert = async ({ id }: { id: string | undefined }) => {
  const getUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  const isUserSignature = getUser?.signature ? true : false;
  // const isUserSignature = false; teste para mostrar
  return (
    <div>
      {!isUserSignature && (
        <div className="text-yellow-800 bg-yellow-100 rounded-lg p-5 flex items-center w-fit gap-2">
          <AlertCircle color="#FF0000" />
          <p>
            Você ainda não criou sua assinatura, crie{" "}
            <Link
              className="underline text-[#666BFF]"
              href={"/dashboard/profile"}
            >
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
