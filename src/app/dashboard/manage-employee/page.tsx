import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import NotPermission from "@/components/pages/NotPermission";
import HeaderSystem from "@/components/ui/system-header";
import NewEmployeeForm from "@/components/form/NewEmployeeForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/sign-in");
  }
  return (
    <main>
      {session.user.role === "admin" ? (
        <div>
          <HeaderSystem />
          <Link href={"/dashboard"}>
            <ArrowLeft
              className="bg-[#F0F0F0] rounded-lg m-10"
              size={40}
              color="#5DA770"
            />
          </Link>
          <div className="w-[90%] flex justify-center mx-auto">
            <div className="w-96 space-y-4">
              <h1>
                Preencha o formulário abaixo para adicionar um novo funcionário:
              </h1>
              <NewEmployeeForm />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <HeaderSystem />
          <NotPermission />
        </div>
      )}
    </main>
  );
};

export default page;
