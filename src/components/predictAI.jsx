import React, { useState, useRef, useEffect } from "react";
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";

export default function PredictAI() {
  const [predictionData, setPredictionData] = useState({
    open: 32500.23,
    high: 32120.78,
    low: 31890.18,
    close: 31890.18,
    volume: "2.15M BTC",
    prediction: "+6.5%",
    confidence: 85
  });

  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [isLoading, setIsLoading] = useState(false);
  const [aiPrediction, setAiPrediction] = useState(null);
  const [error, setError] = useState('');

  const topChartRef = useRef(null);
  const topChartInstance = useRef(null);
  const mainChartRef = useRef(null);
  const mainChartInstance = useRef(null);

  // Available coins for AI prediction
  const availableCoins = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'SOL', name: 'Solana' }
  ];

  // Fungsi untuk destroy chart
  const destroyChart = (chartInstance) => {
    if (chartInstance && typeof chartInstance.destroy === 'function') {
      chartInstance.destroy();
    }
  };

  // Data untuk grafik - DIPERBAIKI dengan data yang lebih realistis
  const getChartData = () => {
    // Base prices yang lebih realistis berdasarkan coin
    const basePricesByCoin = {
      'BTC': [28000, 29500, 31000, 29000, 27500, 26500, 28500, 30500, 31500, 32500, 33500, 31890],
      'ETH': [1800, 1900, 2100, 2000, 1850, 1750, 1950, 2200, 2300, 2400, 2500, 2350],
      'BNB': [300, 320, 350, 330, 310, 290, 320, 340, 360, 380, 400, 375],
      'ADA': [0.4, 0.45, 0.5, 0.48, 0.42, 0.38, 0.44, 0.52, 0.55, 0.58, 0.6, 0.56],
      'SOL': [80, 85, 95, 90, 82, 75, 88, 100, 110, 120, 130, 115]
    };

    const basePrices = basePricesByCoin[selectedCoin] || basePricesByCoin['BTC'];
    
    if (aiPrediction) {
      const currentPrice = aiPrediction.current_price;
      const predictedPrice = aiPrediction.predicted_price;
      
      // Update last price dengan current price dari AI
      const updatedPrices = [...basePrices];
      updatedPrices[updatedPrices.length - 1] = currentPrice;
      
      // Buat array predictions yang lebih smooth
      const lastActualPrice = updatedPrices[updatedPrices.length - 1];
      const predictions = Array(updatedPrices.length - 2).fill(null)
        .concat([lastActualPrice, predictedPrice]);
      
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Prediction'],
        prices: updatedPrices,
        predictions: predictions,
        currentPrice: currentPrice,
        predictedPrice: predictedPrice
      };
    }
    
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      prices: basePrices,
      predictions: Array(12).fill(null),
      currentPrice: basePrices[basePrices.length - 1],
      predictedPrice: null
    };
  };

  const chartData = getChartData();

  // Chart atas - Historical Data - DIPERBAIKI
  useEffect(() => {
    if (topChartRef.current) {
      destroyChart(topChartInstance.current);

      const ctx = topChartRef.current.getContext("2d");

      topChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels.slice(0, -1), // Exclude prediction label
          datasets: [
            {
              label: `${selectedCoin} Historical Price`,
              data: chartData.prices,
              borderColor: "#10B981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#10B981",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              display: true,
              labels: { 
                color: "#9CA3AF",
                font: { size: 12 }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: '#9CA3AF',
              bodyColor: '#ffffff',
              borderColor: '#4B5563',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(context.parsed.y);
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: {
              ticks: { 
                color: "#9CA3AF",
                maxRotation: 0
              },
              grid: { 
                color: "rgba(156, 163, 175, 0.1)",
                drawBorder: false
              }
            },
            y: {
              ticks: {
                color: "#9CA3AF",
                callback: value => "$" + value.toLocaleString()
              },
              grid: { 
                color: "rgba(156, 163, 175, 0.1)",
                drawBorder: false
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'nearest'
          }
        }
      });
    }

    return () => {
      destroyChart(topChartInstance.current);
    };
  }, [aiPrediction, selectedCoin]); // Tambah selectedCoin dependency

  // Chart utama dengan prediksi - DIPERBAIKI
  useEffect(() => {
    if (mainChartRef.current) {
      destroyChart(mainChartInstance.current);

      const ctx = mainChartRef.current.getContext("2d");

      // Warna berdasarkan rekomendasi AI
      const getPredictionColor = () => {
        if (!aiPrediction) return "#8B5CF6";
        if (aiPrediction.recommendation.includes('BUY')) return "#10B981"; // Green for buy
        if (aiPrediction.recommendation.includes('SELL')) return "#EF4444"; // Red for sell
        return "#F59E0B"; // Yellow for hold
      };

      mainChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: `${selectedCoin} Historical Price`,
              data: chartData.prices.map((price, index) => 
                index === chartData.prices.length - 1 ? chartData.currentPrice : price
              ),
              borderColor: "#6B7280",
              borderWidth: 2,
              tension: 0.4,
              fill: false,
              pointBackgroundColor: "#6B7280",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 3
            },
            {
              label: "AI Prediction",
              data: chartData.predictions,
              borderColor: getPredictionColor(),
              borderWidth: 4,
              borderDash: aiPrediction ? [] : [5, 5], // Solid line jika ada prediksi
              tension: 0.4,
              fill: false,
              pointBackgroundColor: getPredictionColor(),
              pointBorderColor: "#ffffff",
              pointBorderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              display: true,
              labels: { 
                color: "#9CA3AF",
                font: { size: 12 }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: '#9CA3AF',
              bodyColor: '#ffffff',
              borderColor: '#4B5563',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    const value = new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(context.parsed.y);
                    
                    // Tambah indikator khusus untuk point prediksi
                    if (context.dataIndex === context.dataset.data.length - 1 && 
                        context.dataset.label === "AI Prediction") {
                      return label + value + ' 🎯 (AI Predicted)';
                    }
                    
                    return label + value;
                  }
                  return label;
                }
              }
            },
            annotation: aiPrediction ? {
              annotations: {
                line1: {
                  type: 'line',
                  mode: 'vertical',
                  scaleID: 'x',
                  value: chartData.labels.length - 2,
                  borderColor: '#6B7280',
                  borderWidth: 1,
                  borderDash: [5, 5],
                  label: {
                    enabled: true,
                    content: 'Current',
                    position: 'start'
                  }
                }
              }
            } : {}
          },
          scales: {
            x: {
              ticks: { 
                color: "#9CA3AF",
                maxRotation: 0
              },
              grid: { 
                color: "rgba(156, 163, 175, 0.1)",
                drawBorder: false
              }
            },
            y: {
              ticks: {
                color: "#9CA3AF",
                callback: value => value ? "$" + value.toLocaleString() : ""
              },
              grid: { 
                color: "rgba(156, 163, 175, 0.1)",
                drawBorder: false
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'nearest'
          }
        }
      });
    }

    return () => {
      destroyChart(mainChartInstance.current);
    };
  }, [aiPrediction, selectedCoin]); // Tambah selectedCoin dependency

  // AI Prediction Function - DIPERBAIKI dengan error handling lebih baik
  const generateAIPrediction = async () => {
    setIsLoading(true);
    setError('');
    setAiPrediction(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first');
        setIsLoading(false);
        return;
      }

      console.log(`Generating AI prediction for ${selectedCoin}...`);

      const response = await fetch('http://localhost:5000/api/ai/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ coin: selectedCoin })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('AI Prediction Response:', data);

      if (data.success && data.data) {
        setAiPrediction(data.data);
        
        // Update prediction data dengan hasil AI - DIPERBAIKI
        const priceChangePct = data.data.price_change_pct || 0;
        const confidenceValue = data.data.confidence === 'Tinggi' ? 85 : 
                              data.data.confidence === 'Sedang' ? 70 : 55;
        
        setPredictionData(prev => ({
          ...prev,
          close: data.data.current_price,
          high: data.data.current_price * 1.02, // Simulasi high
          low: data.data.current_price * 0.98,  // Simulasi low
          open: data.data.current_price * 0.995, // Simulasi open
          prediction: `${priceChangePct >= 0 ? '+' : ''}${priceChangePct.toFixed(2)}%`,
          confidence: confidenceValue,
          volume: `${(Math.random() * 2 + 1).toFixed(2)}M ${selectedCoin}` // Volume realistis
        }));

        console.log('Prediction data updated:', {
          current: data.data.current_price,
          predicted: data.data.predicted_price,
          change: priceChangePct
        });

      } else {
        setError(data.message || 'Failed to generate prediction');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Network error. Please try again.');
      
      // Fallback data untuk testing
      if (process.env.NODE_ENV === 'development') {
        console.log('Using fallback prediction data for development');
        const fallbackPrediction = {
          current_price: chartData.currentPrice,
          predicted_price: chartData.currentPrice * 1.065, // +6.5%
          price_change_pct: 6.5,
          recommendation: "🟢 STRONG BUY",
          confidence: "Tinggi",
          reason: "Bullish pattern detected with high volume",
          rsi: 45.5,
          volume_ratio: 1.8
        };
        setAiPrediction(fallbackPrediction);
        
        setPredictionData(prev => ({
          ...prev,
          close: fallbackPrediction.current_price,
          prediction: `+${fallbackPrediction.price_change_pct.toFixed(1)}%`,
          confidence: 85
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendationColor = (recommendation) => {
    if (!recommendation) return 'text-gray-400';
    if (recommendation.includes('BUY')) return 'text-green-400';
    if (recommendation.includes('SELL')) return 'text-red-400';
    return 'text-yellow-400';
  };

  // Reset charts ketika ganti coin
  useEffect(() => {
    setAiPrediction(null);
    setPredictionData({
      open: 32500.23,
      high: 32120.78,
      low: 31890.18,
      close: 31890.18,
      volume: "2.15M BTC",
      prediction: "+6.5%",
      confidence: 85
    });
  }, [selectedCoin]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-6">
      {/* Header dengan Market Data */}
      <div className="max-w-7xl mx-auto mb-5">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Market Prediction AI
        </h1>
        
        {/* Coin Selection */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-center">Select Cryptocurrency for AI Analysis</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {availableCoins.map((coin) => (
              <button
                key={coin.symbol}
                onClick={() => setSelectedCoin(coin.symbol)}
                className={`px-6 py-3 rounded-lg border-2 transition-all transform hover:scale-105 ${
                  selectedCoin === coin.symbol
                    ? 'border-purple-500 bg-purple-500/20 text-white shadow-lg'
                    : 'border-gray-600 text-gray-300 hover:border-purple-400'
                }`}
              >
                <div className="font-semibold">{coin.symbol}</div>
                <div className="text-xs opacity-70">{coin.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Market Data Row */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div>
              <div className="text-gray-400 text-sm font-medium mb-2">Open</div>
              <div className="text-lg font-semibold">${predictionData.open.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm font-medium mb-2">High</div>
              <div className="text-lg font-semibold text-green-400">${predictionData.high.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm font-medium mb-2">Low</div>
              <div className="text-lg font-semibold text-red-400">${predictionData.low.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm font-medium mb-2">Close</div>
              <div className="text-lg font-semibold">${predictionData.close.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm font-medium mb-2">Volume</div>
              <div className="text-lg font-semibold">{predictionData.volume}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm font-medium mb-2">Change</div>
              <div className={`text-lg font-semibold ${
                predictionData.prediction.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {predictionData.prediction}
              </div>
            </div>
          </div>
        </div>

        {/* Historical Chart */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 mb-8 h-[400px]">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {selectedCoin} Historical Price Chart
          </h3>
          <canvas ref={topChartRef}></canvas>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <button 
            onClick={generateAIPrediction}
            disabled={isLoading}
            className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                AI Analyzing {selectedCoin}...
              </div>
            ) : (
              `🚀 Generate AI Prediction for ${selectedCoin}`
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span>❌</span>
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="flex justify-center mb-10">
        <Link className="block" to="/trendCrypto">
          <button className="py-3 px-8 rounded-lg font-semibold text-center 
              border border-gray-600 hover:border-purple-500 transition-all duration-300
              hover:bg-purple-500/10 w-48">
              Back To Trends
          </button>
        </Link>
      </div>

      {/* AI Prediction Results */}
      {aiPrediction && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              🤖 AI Prediction Results for {selectedCoin}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AI Recommendation */}
              <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">AI Trading Recommendation</h3>
                <div className={`text-4xl font-bold ${getRecommendationColor(aiPrediction.recommendation)} mb-4`}>
                  {aiPrediction.recommendation}
                </div>
                <div className="text-gray-300 mb-4 text-lg">{aiPrediction.reason}</div>
                <div className="text-sm text-gray-400">
                  Confidence Level: <span className="font-semibold text-white">{aiPrediction.confidence}</span>
                </div>
              </div>

              {/* Technical Analysis */}
              <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Technical Analysis</h3>
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">RSI:</span>
                    <span className={`text-lg font-semibold ${
                      aiPrediction.rsi > 70 ? 'text-red-400' : 
                      aiPrediction.rsi < 30 ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {aiPrediction.rsi.toFixed(1)}
                      {aiPrediction.rsi > 70 ? ' (Overbought)' : 
                       aiPrediction.rsi < 30 ? ' (Oversold)' : ' (Neutral)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Volume Ratio:</span>
                    <span className={`text-lg font-semibold ${
                      aiPrediction.volume_ratio > 1.2 ? 'text-green-400' : 
                      aiPrediction.volume_ratio < 0.8 ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {aiPrediction.volume_ratio.toFixed(2)}x
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Predicted Change:</span>
                    <span className={`text-lg font-semibold ${
                      aiPrediction.price_change_pct > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {aiPrediction.price_change_pct > 0 ? '+' : ''}{aiPrediction.price_change_pct.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Prediction Visualization */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {aiPrediction ? 'AI Predicted Price Movement' : 'AI Price Prediction Analysis'}
        </h2>

        {/* Main Prediction Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Visual Trend Prediction */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-center">
              {aiPrediction ? `${selectedCoin} Price Prediction` : 'Price Trend Analysis'}
            </h3>
            <div className="h-96 bg-gray-900 rounded-xl border border-gray-600 p-4">
              <canvas ref={mainChartRef} />
            </div>
          </div>

          {/* Right: Prediction Metrics */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-center">Prediction Metrics</h3>
            <div className="h-96 flex flex-col items-center justify-center space-y-6">
              {/* Price Change */}
              <div className="text-center">
                <div className={`text-5xl font-bold mb-2 ${
                  predictionData.prediction.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {predictionData.prediction}
                </div>
                <div className="text-gray-400 text-lg">Predicted Price Movement</div>
              </div>
              
              {/* Current vs Predicted */}
              {aiPrediction && (
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  <div className="text-center p-3 bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-400">Current</div>
                    <div className="text-lg font-semibold">${aiPrediction.current_price.toLocaleString()}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-400">Predicted</div>
                    <div className="text-lg font-semibold">${aiPrediction.predicted_price.toLocaleString()}</div>
                  </div>
                </div>
              )}
              
              {/* Confidence Meter */}
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>AI Confidence</span>
                  <span>{predictionData.confidence}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-3">
                  <div 
                    className={`h-4 rounded-full transition-all duration-1000 ${
                      predictionData.confidence > 70 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                      predictionData.confidence > 50 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                      'bg-gradient-to-r from-red-500 to-red-400'
                    }`}
                    style={{ width: `${predictionData.confidence}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-400">
                  Model Accuracy: {predictionData.confidence}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Report */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">AI Analysis Report</h3>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              {aiPrediction 
                ? `Our advanced AI model has analyzed comprehensive historical data, technical indicators, and market patterns for ${selectedCoin}. The analysis indicates a predicted price movement of ${predictionData.prediction} with ${predictionData.confidence}% confidence level.`
                : `Our AI prediction model utilizes machine learning algorithms to analyze cryptocurrency market data and generate accurate price predictions.`
              }
            </p>
            
            <h4 className="text-xl font-semibold mb-4">Key Analysis Factors:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiPrediction ? [
                `AI Recommendation: ${aiPrediction.recommendation}`,
                `Price Prediction: ${predictionData.prediction}`,
                `Confidence Level: ${aiPrediction.confidence}`,
                `RSI Indicator: ${aiPrediction.rsi.toFixed(1)}`,
                `Volume Analysis: ${aiPrediction.volume_ratio.toFixed(2)}x normal`,
                "Machine Learning Model Analysis",
                "Technical Pattern Recognition",
                "Market Sentiment Evaluation"
              ] : [
                "Historical Price Analysis",
                "Volume and Momentum Indicators",
                "Market Trend Recognition",
                "Pattern Detection Algorithms",
                "Risk Assessment Models",
                "Sentiment Analysis",
                "Technical Indicator Convergence",
                "Volatility Measurements"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-start gap-4">
            <span className="text-2xl text-yellow-400">⚠️</span>
            <div className="text-sm leading-relaxed">
              <strong className="text-yellow-400 text-base">Disclaimer:</strong> 
              <p className="mt-2">
                AI predictions are for educational and research purposes only. Cryptocurrency investments 
                carry substantial risks, including the potential loss of principal. Always conduct your 
                own research (DYOR) and consult with qualified financial advisors before making any 
                investment decisions. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}