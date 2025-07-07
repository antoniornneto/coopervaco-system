import AtasList from "../atas-list";
import HeaderSystem from "../ui/system-header";
import SignatureAlert from "../ui/signatureAlert";

const UserPage = async ({ id }: { id: string | undefined }) => {
  return (
    <div>
      <HeaderSystem />
      {/* topo da página */}
      <div>
        <div className="bg-[#F0F0F0] w-full flex flex-col justify-center p-10">
          <SignatureAlert id={id} />
          <div className="w-[90%] h-32 flex items-center gap-10">
            <h1 className="text-4xl">Atas de Reuniões</h1>
          </div>
        </div>
      </div>
      {/* lista de atas */}
      <div className="w-full flex justify-center">
        <div className="w-[90%]">
          <AtasList />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
