import AdminPage from "@/components/pages/AdminPage";
import UserPage from "@/components/pages/UserPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      {session?.user.role == "admin" ? (
        <AdminPage id={userId} />
      ) : (
        <UserPage id={userId} />
      )}
    </div>
  );
};

export default page;
