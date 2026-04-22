"use client";
import React, { useEffect, useState } from "react";

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);
  const [newDep, setNewDep] = useState("");

  const subjectId = "subject-123"; // Simulated subject ID

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/identities/${subjectId}/portfolio`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const addDependent = async () => {
    const res = await fetch(
      `http://localhost:8080/api/v1/identities/${subjectId}/dependents`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newDep }),
      }
    );
    const updated = await res.json();
    setData(updated);
    setNewDep("");
  };

  if (!data) return <div className="p-10 text-white">Loading dossier...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6 text-red-500 tracking-widest">
        [CLASSIFIED] DOSSIER
      </h1>
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-md shadow-2xl max-w-2xl">
        <h2 className="text-xl mb-4 border-b border-gray-800 pb-2">
          PRIMARY IDENTITY
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="text-gray-500">ID:</div>
          <div>{data.id}</div>
          <div className="text-gray-500">Alias:</div>
          <div className="text-green-400">{data.alias}</div>
          <div className="text-gray-500">Passport:</div>
          <div>{data.passportNum}</div>
          <div className="text-gray-500">Credit Score:</div>
          <div>{data.creditScore}</div>
          <div className="text-gray-500">Backstory:</div>
          <div className="italic">"{data.backstory}"</div>
        </div>

        <h2 className="text-xl mt-8 mb-4 border-b border-gray-800 pb-2">
          DEPENDENTS (TR-3)
        </h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          {data.dependents?.map((d: string, i: number) => (
            <li key={i}>{d}</li>
          ))}
          {(!data.dependents || data.dependents.length === 0) && (
            <li className="text-gray-600">No dependents listed.</li>
          )}
        </ul>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Dependent Alias"
            value={newDep}
            onChange={(e) => setNewDep(e.target.value)}
            className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm w-full"
          />
          <button
            onClick={addDependent}
            className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 font-bold"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
