import Loading from "@/components/ui/loading";
import UsersList from "@/components/users-list";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="space-y-5 w-[80%]">
        <div>
          <h1 className="text-2xl">Participantes da reunião</h1>
          <p className="text-sm">
            Selecione as pessoas que irão participar da reunião
          </p>
        </div>
        <Suspense fallback={<Loading />}>
          <UsersList />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
