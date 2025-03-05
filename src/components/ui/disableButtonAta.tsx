const DisableButtonAta = async ({ text, tooltip }: { text: string, tooltip?: string }) => {
  return (
    <button disabled title={tooltip} className="w-28 rounded-full py-[8px] flex justify-center bg-gray-300 text-white text-sm cursor-not-allowed">
      {text}
    </button>
  );
};

export default DisableButtonAta;
