// src/components/TrendRow.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function TrendRow({ 
  symbol = "BTCUSDT", 
  price = "$95,728.4",
  change = "+2.5%",
  icon = "฿",
  bgColor = "bg-orange-500"
}) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="flex items-center justify-between gap-4 py-6 px-2 border-b border-white/5">
      
      {/* Left Prediction Button */}
      <Link className="block" to="/predictAI">
        <button className="px-4 py-3 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-purple-400 hover:from-purple-700 hover:to-purple-600 transition">
          Prediction
        </button>
      </Link>

      {/* Coin icon + symbol */}
      <div className="flex items-center gap-3 min-w-40">
        <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-white font-bold`}>
          {icon}
        </div>
        <div className="text-sm font-semibold">{symbol}</div>
      </div>

      {/* center small price boxes */}
      <div className="flex-1 flex items-center justify-center gap-10 text-center text-xs opacity-80">
        <div>
          <div className="text-[15px] font-bold">Price</div>
          <div className="text-sm font-semibold">{price}</div>
        </div>
        <div>
          <div className="text-[10px]">24h Change</div>
          <div className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </div>
        </div>
      </div>

      {/* right symbol + Prediction */}
      <div className="flex items-center gap-3 min-w-60 justify-end">
        <div className="text-sm font-semibold">{symbol}</div>
        <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-white font-bold`}>
          {icon}
        </div>
        <Link className="block" to="/predictAI">
          <button className="px-4 py-3 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-purple-400 hover:from-purple-700 hover:to-purple-600 transition">
            Prediction
          </button>
        </Link>
      </div>
    </div>
  );
}