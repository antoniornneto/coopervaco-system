import HeaderSystem from "@/components/ui/system-header";

export default function Sistema() {
  return (
    <main>
      <HeaderSystem />
      <div className="flex justify-center">
        <div className="w-[80%] flex flex-col">
          <div className="flex gap-10">
            <h1>Atas de Reuniões</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
