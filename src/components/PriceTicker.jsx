// src/components/PriceTicker.jsx
import React, { useEffect, useState } from "react";

/*
  Jika mau ganti ke WebSocket Binance, lihat bagian "WebSocket live" di akhir
*/

const initialCoins = [
  { symbol: "BTCUSDT", price: "$95,728.4", change: "+4%" },
  { symbol: "ETHUSDT", price: "$3,240.8", change: "+2.4%" },
  { symbol: "BNBUSDT", price: "$600.12", change: "+0.37%" },
  { symbol: "SOLUSDT", price: "$160.34", change: "-4.0%" },
  { symbol: "HYPEUSDT", price: "$0.20", change: "+20%" },
];

export default function PriceTicker() {
  const [coins, setCoins] = useState(initialCoins);

  // Optional: demo animate price changes locally (mock)
  useEffect(() => {
    const id = setInterval(() => {
      setCoins(prev =>
        prev.map(c => {
          // random small variation for demo
          const rand = (Math.random() - 0.5) * 0.01;
          // remove $ and commas to compute
          const val = parseFloat(c.price.replace(/[$,]/g, ""));
          const newVal = Math.max(0.001, val * (1 + rand));
          const newPrice = `$${Number(newVal).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
          // change sign
          const change = (Math.random() > 0.5 ? "+" : "-") + `${(Math.abs(rand) * 100).toFixed(2)}%`;
          return { ...c, price: newPrice, change };
        })
      );
    }, 2500);

    return () => clearInterval(id);
  }, []);

  // Duplicate coins to create seamless loop
  const list = [...coins, ...coins];

  return (
    <div className="w-full bg-black text-white border-b border-white/10 overflow-hidden ticker-container">
      <div className="flex items-center whitespace-nowrap ticker-move">
        {list.map((c, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-2 text-sm">
            <span className="font-semibold mr-1">{c.symbol.replace("USDT","")}</span>
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
