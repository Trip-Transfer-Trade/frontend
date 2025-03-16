import React from "react";
import { ArrowUpRight } from "lucide-react";

export function StockIndexCard({ name, value, changeValue, changePercentage, color }) {
  const isPositive = changePercentage > 0;
  const isNeutral = changePercentage === 0;

  return (
    <div className="flex items-center justify-between w-[320px] h-[52px] p-4 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white">
          {isPositive ? (
            <ArrowUpRight className="text-red-500 h-5 w-5" />
          ) : isNeutral ? (
            <span className="text-gray-500 h-5 w-5">—</span>
          ) : (
            <ArrowUpRight className="text-blue-500 h-5 w-5 rotate-180" />
          )}
        </div>
        <span className="text-sm font-semibold text-gray-500">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{value.toLocaleString()}</span>
        <span className={`text-sm font-semibold ${color}`}>
          {isPositive ? "+" : ""}
          {changeValue} ({changePercentage}%)
        </span>
      </div>
    </div>
  );
}
