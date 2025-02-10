"use client";
import { Download } from "lucide-react";

const DownloadButton = () => {
  const printPage = () => {
    window.print();
  };
  return (
    <button
      onClick={printPage}
      className="bg-transparent w-fit hover:bg-transparent p-2"
    >
      <Download
        className="bg-[#D8FFE2] rounded-lg p-2"
        size={50}
        color="#5DA770"
      />
    </button>
  );
};

export default DownloadButton;
