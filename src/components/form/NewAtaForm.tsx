import { db } from "@/lib/db";
import dayjs from "dayjs";

const NewAtaForm = async ({ id }: { id: string }) => {
  const ata = await db.ata.findUnique({
    where: {
      id,
    },
  });

  return (
    <div>
      <div className="flex">
        <div>
          <h1>Ata de Reunião</h1>
          <p>
            Data: <strong>{dayjs(ata?.updatedAt).format("DD/MM/YYYY")}</strong>
          </p>
          <p>
            Horário: <strong>{dayjs(ata?.updatedAt).format("HH:MM")}</strong>
          </p>
        </div>
        <div></div>
      </div>
      <div>
        {ata?.participants.map((participant, index) => (
          <div key={index}>{participant}</div>
        ))}
      </div>
    </div>
  );
};

export default NewAtaForm;
