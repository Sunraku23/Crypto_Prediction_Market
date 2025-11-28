// src/components/TrendingSection.jsx
import TrendRow from "./TrendRow";


const sample = [
  { symbol: "BTCUSDT", price: "$95,728.4" },
  { symbol: "ETHUSDT", price: "$3,240.8" },
  { symbol: "BNBUSDT", price: "$600.12" },
  { symbol: "SOLUSDT", price: "$160.34" },
];

export default function TrendingSection() {
  return (
    <section className="py-10 px-8">
      <div className="max-w-[1100px] mx-auto text-white">
        <h2 className="text-3xl font-semibold mb-6">Trending Cryptocurrencies</h2>

        {/* Popular Spot */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-center mb-6">• Popular Spot •</h3>
          <div className="bg-black/80 p-4 rounded-lg border border-white/5">
            {sample.map((s, i) => (
              <TrendRow key={i} symbol={s.symbol} price={s.price} />
            ))}
            <div className="text-center mt-4 opacity-70">View More ⦿</div>
          </div>
        </div>

        {/* AI Recommended */}
        <div>
          <h3 className="text-xl font-medium text-center mb-6">• AI Recommended •</h3>
          <div className="bg-black/80 p-4 rounded-lg border border-white/5">
            {sample.map((s, i) => (
              <TrendRow key={i} symbol={s.symbol} price={s.price} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
