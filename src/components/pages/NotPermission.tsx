import Image from "next/image";
import Link from "next/link";
import unauthorized from "../../../public/assets/401.jpg";

const NotPermission = () => {
  return (
    <div className="flex justify-center items-center w-full h-[80vh] gap-10">
      <Image
        className="w-[500px]"
        src={unauthorized}
        alt="Não autorizado"
        width={0}
        height={0}
      />
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold">Sem Permissão</h1>
        <p>Você não tem permissão para acessar a página</p>
        <Link className="underline" href="/dashboard">
          Retornar a página inicial
        </Link>
      </div>
    </div>
  );
};

export default NotPermission;
