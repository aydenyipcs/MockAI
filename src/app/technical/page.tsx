"use client";

import { useEffect, useState } from "react";

const Technical = () => {
  const [technicalData, setTechnicalData] = useState<TechnicalProps | null>(
    null
  );
  const [currSolution, setCurrSolution] = useState<SolutionProps | null>(null);
  const [solutionIndex, setSolutionIndex] = useState<number>(0);

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const response = await fetch("/api/fetchTechnical");
        if (!response.ok) {
          throw new Error("HTTP Error");
        }
        const data: TechnicalProps = await response.json();
        setTechnicalData(data);
        setCurrSolution(data.solutions[0]);
      } catch (err) {
        console.error("Failed to fetch technical data", err);
      }
    };
    fetchSolution();
  }, []);

  const handleSolutionChange = (index: number) => {
    if (technicalData) setCurrSolution(technicalData?.solutions[index]);
    setSolutionIndex(index);
  };

  return (
    <main className="flex flex-col" style={{ height: "calc(100vh - 15vh)" }}>
      <div className="flex-grow-0 p-5">
        <div className="flex flex-row">
          <h1 className="font-semibold leading-none my-auto">Your Solution:</h1>
          <span
            className={`text-sm text-teal font-semibold mx-1 py-0.5`}
          >{`${technicalData?.solution.tComplex} Time`}</span>
          <span
            className={`text-sm text-violet font-semibold mx-1 py-0.5`}
          >{`${technicalData?.solution.sComplex} Space`}</span>
        </div>
        <p className="text-tmuted italic">
          {technicalData?.solution.explanation}
        </p>
        <div className="flex flex-row">
          <h1 className="font-semibold">Current Solution:</h1>
          <span
            className={`text-sm text-teal font-semibold mx-1 py-0.5`}
          >{`${currSolution?.tComplex} Time`}</span>
          <span
            className={`text-sm text-violet font-semibold mx-1 py-0.5`}
          >{`${currSolution?.sComplex} Space`}</span>
        </div>
        <p className="text-tmuted italic">{currSolution?.explanation}</p>
      </div>
      <div className="flex flex-col flex-1 mb-10 overflow-hidden">
        <div className="flex flex-row items-end">
          <p className="italic text-md mr-2 w-1/2 text-center">{`${technicalData?.optimal.tComplex} Time && ${technicalData?.optimal.sComplex} Space is Optimal !`}</p>
          <div className="ml-5 my-2">
            {technicalData?.solutions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSolutionChange(index)}
                className={`text-sm p-0.5 mr-2 rounded font-semibold hover:bg-opacity-75 ${
                  index === solutionIndex
                    ? "bg-lightBlue text-white"
                    : "bg-gray-400 text-tprimary"
                }`}
              >
                Solution {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-row flex-grow overflow-hidden">
          <div className="flex flex-1 flex-col w-full mr-5 overflow-y-auto no-scrollbar flex-1 overflow-hidden">
            <pre className="flex rounded-2xl bg-gray-200 p-5 justify-center overflow-y-auto h-full whitespace-pre-wrap thinScrollbar">
              <code>{technicalData?.solution.code}</code>
            </pre>
          </div>
          <div className="flex-1 overflow-hidden">
            <pre className="flex rounded-2xl bg-gray-200 p-5 justify-center overflow-y-auto h-full whitespace-pre-wrap thinScrollbar">
              <code>{currSolution?.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Technical;
