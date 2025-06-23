import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import NotPermission from "@/components/pages/NotPermission";
import HeaderSystem from "@/components/ui/system-header";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { ManageEmployee } from "@/components/pages/ManageEmployee";

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
          <div className="w-10">
            <Link className="w-fit" href={"/dashboard"}>
              <ArrowLeft
                className="bg-[#F0F0F0] rounded-lg m-10 w-fit"
                size={40}
                color="#5DA770"
              />
            </Link>
          </div>
          <div className="px-20">
            <ManageEmployee />
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
