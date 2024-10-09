import ProfileForm from "@/components/form/ProfileForm";
import HeaderSystem from "@/components/ui/system-header";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userSession = session?.user;
  const employeeData = await db.employee.findUnique({
    where: {
      id: userSession?.employeeId,
    },
  });

  return (
    <main>
      <HeaderSystem />
      <div className="flex justify-center items-center py-10">
        <div className="w-[90%] flex gap-10">
          <Link href={"/dashboard"}>
            <ArrowLeft
              className="bg-[#F0F0F0] rounded-lg"
              size={40}
              color="#5DA770"
            />
          </Link>
          <div className="flex-1 flex justify-center">
            <ProfileForm
              userSession={userSession}
              employeeData={employeeData}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
