// src/components/TrendRow.jsx
import React from "react";

export default function TrendRow({ symbol = "BTCUSDT", price = "$95,728.4" }) {
  return (
    <div className="flex items-center justify-between gap-4 py-6 px-2 border-b border-white/5">
      
      {/* Left Prediction Button */}
      <button className="px-4 py-3 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-purple-400 hover:from-purple-700 hover:to-purple-600 transition">
        Prediction
      </button>

      {/* Coin icon + symbol */}
      <div className="flex items-center gap-3 min-w-40">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">฿</div>
        <div className="text-sm font-semibold">{symbol}</div>
      </div>

      {/* center small price boxes (mimic your design: two small price cols) */}
      <div className="flex-1 flex items-center justify-center gap-10 text-center text-xs opacity-80">
        <div>
          <div className="text-[10px]">Last Traded Price</div>
          <div className="text-sm font-semibold">{price}</div>
        </div>
        <div>
          <div className="text-[10px]">Last Traded Price</div>
          <div className="text-sm font-semibold">{price}</div>
        </div>
      </div>

      {/* right symbol + Prediction */}
      <div className="flex items-center gap-3 min-w-60 justify-end">
        <div className="text-sm font-semibold">{symbol}</div>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">฿</div>
        <button className="bg-linear-to-r from-purple-500 to-violet-400 text-white px-4 py-2 rounded-lg min-w-[110px]">
          Prediction
        </button>
      </div>
    </div>
  );
}
