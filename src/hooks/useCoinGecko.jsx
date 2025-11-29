// src/hooks/useCoinGecko.js (tanpa API key)
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCoinGecko() {
  const [coins, setCoins] = useState(getStaticData());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        
        // Coba tanpa API key dulu (rate limit lebih rendah)
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,cardano,solana&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`,
          { timeout: 10000 }
        );
        
        if (response.data && response.data.length > 0) {
          const coinData = response.data.map(coin => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase() + 'USDT',
            price: `$${formatPrice(coin.current_price)}`,
            change: coin.price_change_percentage_24h ? 
              (coin.price_change_percentage_24h > 0 ? '+' : '') + 
              coin.price_change_percentage_24h.toFixed(2) + '%' : '0%',
            rawPrice: coin.current_price,
            icon: getCoinIcon(coin.id),
            bgColor: getCoinColor(coin.id)
          }));
          
          setCoins(coinData);
          setError(null);
          console.log('Live data loaded successfully');
        }
        
      } catch (err) {
        console.log('Using static data due to API error:', err.message);
        setError('Using demo data');
        // Static data sudah sebagai default
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Refresh Tanpa api
    const interval = setInterval(fetchPrices, 30000); // 5 menit
    return () => clearInterval(interval);
  }, []);

  return { coins, loading, error };
}

const formatPrice = (price) => {
  if (price < 1) return price.toFixed(3);
  if (price < 1000) return price.toFixed(2);
  return price.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const getCoinIcon = (coinId) => ({
  bitcoin: '฿', ethereum: 'Ξ', binancecoin: '⎈', 
  cardano: 'A', solana: 'S'
}[coinId] || '₿');

const getCoinColor = (coinId) => ({
  bitcoin: 'bg-orange-500', ethereum: 'bg-gray-600', 
  binancecoin: 'bg-yellow-500', cardano: 'bg-blue-600', 
  solana: 'bg-purple-500'
}[coinId] || 'bg-gray-500');

const getStaticData = () => [
  { 
    id: 'bitcoin', 
    symbol: 'BTCUSDT', 
    price: '$67,428.40', 
    change: '+2.4%', 
    icon: '฿', 
    bgColor: 'bg-orange-500',
    rawPrice: 67428.40 
  },
  { 
    id: 'ethereum', 
    symbol: 'ETHUSDT', 
    price: '$3,240.80', 
    change: '+1.8%', 
    icon: 'Ξ', 
    bgColor: 'bg-gray-600',
    rawPrice: 3240.80 
  },
  { 
    id: 'binancecoin', 
    symbol: 'BNBUSDT', 
    price: '$585.30', 
    change: '+0.6%', 
    icon: '⎈', 
    bgColor: 'bg-yellow-500',
    rawPrice: 585.30 
  },
  { 
    id: 'cardano', 
    symbol: 'ADAUSDT', 
    price: '$0.452', 
    change: '-1.2%', 
    icon: 'A', 
    bgColor: 'bg-blue-600',
    rawPrice: 0.452 
  },
  { 
    id: 'solana', 
    symbol: 'SOLUSDT', 
    price: '$142.70', 
    change: '+3.5%', 
    icon: 'S', 
    bgColor: 'bg-purple-500',
    rawPrice: 142.70 
  }
];