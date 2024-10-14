const DisableButtonAta = async ({ text }: { text: string }) => {
  return (
    <span className="w-28 rounded-full py-[8px] flex justify-center bg-gray-300 text-white text-sm cursor-not-allowed">
      {text}
    </span>
  );
};

export default DisableButtonAta;
