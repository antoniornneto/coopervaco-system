import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import NotPermission from "@/components/pages/NotPermission";
import HeaderSystem from "@/components/ui/system-header";
import NewEmployeeForm from "@/components/form/NewEmployeeForm";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/sign-in");
  }
  return (
    <div>
      {session.user.role === "admin" ? (
        <div>
          <HeaderSystem />
          <div>
            <NewEmployeeForm />
          </div>
        </div>
      ) : (
        <div>
          <HeaderSystem />
          <NotPermission />
        </div>
      )}
    </div>
  );
};

export default page;
