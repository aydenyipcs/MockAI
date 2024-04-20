"use client";

import { useEffect, useState } from "react";

const Header = () => {
  const [headerData, setHeaderData] = useState<HeaderProps>({
    name: "",
    type: "",
    difficulty: "",
    date: "",
  });

  useEffect(() => {
    const fetchHeader = async () => {
      const response = await fetch("/api/fetchHeader");
      const data: HeaderProps = await response.json();
      setHeaderData(data);
    };
    fetchHeader();
  }, []);

  function difficultyStyle(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-200 text-green-800";
      case "medium":
        return "bg-blue-200 text-blue-800";
      case "hard":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }

  return (
    <div className="px-5">
      <div className="flex flex-row text-tprimary text-xl">
        <h1 className="font-semibold leading-none my-auto">
          {headerData.name}
        </h1>
        <span
          className={`text-sm font-semibold mx-2 px-2 py-0.5 rounded ${difficultyStyle(
            headerData.difficulty
          )}`}
        >
          {headerData.difficulty}
        </span>
        <span className="text-sm bg-gray-300 text-gray-600 font-semibold mx-2 px-2 py-0.5 rounded">
          {headerData.type}
        </span>
      </div>
      <h3 className="text-tmuted">{headerData.date}</h3>
    </div>
  );
};

export default Header;
