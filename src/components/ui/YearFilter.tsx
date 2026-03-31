"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface YearFilterProps {
  years: string[];
  selectedYear: string;
}

const YearFilter = ({ years, selectedYear }: YearFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", e.target.value);
    router.push(`?${params.toString()}`);
  };

  return (
    <select
      className="border-2 border-zinc-300 bg-transparent rounded-lg px-4 text-lg"
      value={selectedYear}
      onChange={handleChange}
    >
      <option value="all">Todos</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearFilter;
