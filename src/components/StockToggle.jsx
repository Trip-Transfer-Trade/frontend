import { useState } from "react";

export function StockToggles({ selected, setSelected }) {

  return (
    <div className="relative inline-flex items-center bg-gray-50 rounded-md p-1 w-[90px] h-[27px] shadow-inner">
      <div
        className={`absolute top-1/2 left-1 w-[41px] h-[21px] bg-white rounded-md shadow-md transition-transform duration-300 -translate-y-1/2 ${
          selected === "미국" ? "translate-x-[41px]" : "translate-x-0"
        }`}/>
      <button
        onClick={() => setSelected("국내")}
        className={`relative flex-1 text-sm font-small rounded-full text-center transition-colors z-10 focus:outline-none flex items-center justify-center ${
          selected === "국내" ? "text-black" : "text-gray-500"
        }`}
      >
        국내
      </button>
      <button
        onClick={() => setSelected("미국")}
        className={`relative flex-1 text-sm font-small rounded-full text-center transition-colors z-10 focus:outline-none flex items-center justify-center ${
          selected === "미국" ? "text-black" : "text-gray-500"
        }`}
      >
        미국
      </button>
    </div>
  );
}

export default function StockToggle({ selected, setSelected}) {
  return (
    <div className="w-full max-w-3xl mx-auto p-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">실시간 랭킹</h2>
        <StockToggles selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
}
