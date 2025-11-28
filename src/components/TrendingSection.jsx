// src/components/TrendingSection.jsx
import TrendRow from "./TrendRow";
import { useCoinGecko } from "../hooks/useCoinGecko";

export default function TrendingSection() {
  const { coins, loading, error } = useCoinGecko();

  if (loading) {
    return (
      <section className="py-10 px-8">
        <div className="max-w-[1100px] mx-auto text-white">
          <div className="text-center">Loading cryptocurrency data...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-8">
        <div className="max-w-[1100px] mx-auto text-white">
          <div className="text-center text-red-400">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-8">
      <div className="max-w-[1100px] mx-auto text-white">
        <h2 className="text-3xl font-semibold mb-6">Trending Cryptocurrencies</h2>

        {/* Popular Spot */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-center mb-6">• Popular Spot •</h3>
          <div className="bg-black/80 p-4 rounded-lg border border-white/5">
            {coins.map((coin, i) => (
              <TrendRow 
                key={i} 
                symbol={coin.symbol} 
                price={coin.price}
                icon={coin.icon}
                bgColor={coin.bgColor}
              />
            ))}
            <div className="text-center mt-4 opacity-70">View More ⦿</div>
          </div>
        </div>

        {/* AI Recommended - bisa menampilkan coins yang berbeda atau sama */}
        <div>
          <h3 className="text-xl font-medium text-center mb-6">• AI Recommended •</h3>
          <div className="bg-black/80 p-4 rounded-lg border border-white/5">
            {coins.map((coin, i) => (
              <TrendRow 
                key={i} 
                symbol={coin.symbol} 
                price={coin.price}
                icon={coin.icon}
                bgColor={coin.bgColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}