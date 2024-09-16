import { db } from "@/lib/prisma";
import ListarUsuarios from "@/modules/gets/components/listar-usuarios";

const prisma = db;
const ListUsers = async () => {
  const users = await prisma.user.findMany();

  return <ListarUsuarios usersList={users} />;
};

export default ListUsers;
