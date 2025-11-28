// src/components/PriceTicker.jsx
import React from "react";
import { useCoinGecko } from "../hooks/useCoinGecko";

export default function PriceTicker() {
  const { coins, loading, error } = useCoinGecko();

  if (loading) {
    return (
      <div className="w-full bg-black text-white border-b border-white/10 overflow-hidden">
        <div className="flex items-center justify-center py-2">
          <span className="text-sm">Loading prices...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-black text-white border-b border-white/10 overflow-hidden">
        <div className="flex items-center justify-center py-2">
          <span className="text-sm text-red-400">{error}</span>
        </div>
      </div>
    );
  }

  // Duplicate coins untuk seamless loop
  const list = [...coins, ...coins];

  return (
    <div className="w-full bg-black text-white border-b border-white/10 overflow-hidden ticker-container">
      <div className="flex items-center whitespace-nowrap ticker-move">
        {list.map((c, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-2 text-sm">
            <span className="font-semibold mr-1">{c.symbol.replace("USDT", "")}</span>
            <span className="opacity-80">{c.price}</span>
            <span className={c.change.startsWith("-") ? "text-red-400 ml-2" : "text-green-400 ml-2"}>
              {c.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}