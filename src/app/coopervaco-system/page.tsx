import HeaderSystem from "@/components/ui/system-header";
import AtasList from "@/modules/users/components/atas-list";

export default async function Sistema() {
  return (
    <main>
      <HeaderSystem />
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          <div className="flex flex-col justify-center">
            {/* Title section */}
            <div className="bg-[#F0F0F0] flex justify-center">
              <div className="w-[80%] flex items-center py-10 gap-10">
                <h1 className="text-4xl text-[#606060]">Atas de Reuniões</h1>
                <select
                  className="rounded-lg bg-transparent border-zinc-300 border-[1px] px-6 text-lg font-semibold"
                  name=""
                  id=""
                >
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
            {/* AtasList section */}
            <div className="flex justify-center">
              <div className="w-[80%] flex flex-col py-10">
                <AtasList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
