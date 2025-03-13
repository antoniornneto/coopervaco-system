import UsersList from "@/components/users-list";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export interface UserNoPositionDataProps {
  id: string;
  name: string | null;
  role: string | null;
  image: string | null;
  inscription: string | null;
  signature: string | null;
  cpf: string | null;
  email: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  employeeId: string;
}

const page = async () => {
  const session = await getServerSession(authOptions);
  const usersData: UserNoPositionDataProps[] = await db.user.findMany();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="space-y-5 w-[90%] flex flex-col items-center xl:w-[1000px]">
        <div className="self-start">
          <h1 className="text-4xl">Participantes da reunião</h1>
          <p className="text-sm">
            Selecione as pessoas que irão participar da reunião
          </p>
        </div>
        <UsersList users={usersData} />
      </div>
    </main>
  );
};

export default page;
