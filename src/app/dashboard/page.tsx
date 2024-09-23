import AdminPage from "@/components/pages/AdminPage";
import UserPage from "@/components/pages/UserPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/ata");
  }

  return (
    <div>{session?.user.role == "admin" ? <AdminPage /> : <UserPage />}</div>
  );
};

export default page;
