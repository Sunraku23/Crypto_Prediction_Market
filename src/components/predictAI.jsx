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

  const [isLoading, setIsLoading] = useState(false);

  const topChartRef = useRef(null);
  const topChartInstance = useRef(null);
  const mainChartRef = useRef(null); // Ditambahkan: ref untuk chart utama
  const mainChartInstance = useRef(null); // Ditambahkan: instance untuk chart utama

  // Fungsi untuk destroy chart
  const destroyChart = (chartInstance) => {
    if (chartInstance && typeof chartInstance.destroy === 'function') {
      chartInstance.destroy();
    }
  };

  // Data untuk grafik
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    prices: [28000, 29500, 31000, 29000, 27500, 26500, 28500, 30500, 31500, 32500, 33500, 31890],
    predictions: [null, null, null, null, null, null, null, null, null, null, 33500, 35000]
  };
  
  // Chart atas
  useEffect(() => {
    if (topChartRef.current) {
      destroyChart(topChartInstance.current);

      const ctx = topChartRef.current.getContext("2d");

      topChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Actual Price",
              data: chartData.prices,
              borderColor: "#10B981",
              borderWidth: 3,
              tension: 0.4,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              ticks: { color: "#9CA3AF" },
              grid: { color: "rgba(156, 163, 175, 0.1)" }
            },
            y: {
              ticks: {
                color: "#9CA3AF",
                callback: value => "$" + value.toLocaleString()
              },
              grid: { color: "rgba(156, 163, 175, 0.1)" }
            }
          }
        }
      });
    }

    return () => {
      destroyChart(topChartInstance.current);
    };
  }, []);

  // Chart utama dengan prediksi - DITAMBAHKAN
  useEffect(() => {
    if (mainChartRef.current) {
      destroyChart(mainChartInstance.current);

      const ctx = mainChartRef.current.getContext("2d");

      mainChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Actual Price",
              data: chartData.prices,
              borderColor: "#10B981",
              borderWidth: 3,
              tension: 0.4,
              fill: false
            },
            {
              label: "Prediction",
              data: chartData.predictions,
              borderColor: "#8B5CF6",
              borderWidth: 3,
              borderDash: [5, 5],
              tension: 0.4,
              fill: false,
              pointBackgroundColor: "#8B5CF6"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              display: true,
              labels: { color: "#9CA3AF" }
            }
          },
          scales: {
            x: {
              ticks: { color: "#9CA3AF" },
              grid: { color: "rgba(156, 163, 175, 0.1)" }
            },
            y: {
              ticks: {
                color: "#9CA3AF",
                callback: value => value ? "$" + value.toLocaleString() : ""
              },
              grid: { color: "rgba(156, 163, 175, 0.1)" }
            }
          }
        }
      });
    }

    return () => {
      destroyChart(mainChartInstance.current);
    };
  }, [predictionData]); // Re-render ketika predictionData berubah

  const generatePrediction = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setPredictionData(prevData => ({
        ...prevData,
        prediction: "+8.2%",
        confidence: 92
      }));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-6">
      {/* Header dengan Market Data */}
      <div className="max-w-6xl mx-auto mb-5">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">Market Prediction AI</h1>
        
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
              <div className="text-lg font-semibold text-green-400">{predictionData.prediction}</div>
            </div>
          </div>
        </div>

        {/* CHART TAMBAHAN DI ATAS TOMBOL */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-3 mb-8 h-[300px]">
          <canvas ref={topChartRef}></canvas>
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button 
            onClick={generatePrediction}
            disabled={isLoading}
            className={`bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Generating Prediction...' : 'Generate Prediksi Market'}
          </button>
        </div>
      </div>

{/* Back Login */}
<div className="flex justify-center mb-10"> {/* tambahkan margin top jika perlu */}
  <Link className="block" to="/login">
    <button className="py-3 px-8 rounded-lg font-semibold text-center 
        border border-gray-600 hover:border-purple-500 transition-all duration-300
        hover:bg-purple-500/10 w-48">
        Back To Login
    </button>
  </Link>
</div>

      {/* AI Prediction Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-8">AI Prediksi Harga Pergerakan</h2>

        {/* Main Prediction Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Visual Trend Prediction */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-center">Prediksi Visual Tren</h3>
            <div className="h-64 bg-gray-900 rounded-xl border border-gray-600">
              <canvas ref={mainChartRef} />
            </div>
          </div>

          {/* Right: Prediction Percentage */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-center">Prediksi Persentase</h3>
            <div className="h-64 flex flex-col items-center justify-center">
              <div className="text-6xl font-bold text-green-400 mb-2">
                {predictionData.prediction}
              </div>
              <div className="text-gray-400 mb-6">Predicted Movement</div>
              
              {/* Confidence Meter */}
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Confidence Level</span>
                  <span>{predictionData.confidence}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div 
                    className="bg-linear-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${predictionData.confidence}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-400">
                  Model Confidence: {predictionData.confidence}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation & Key Factors */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
          <h3 className="text-xl font-bold mb-4">Penjelasan Prediksi:</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Model AI kami menganalisis data historis dan pola market untuk memprediksi pergerakan harga 
            <strong> {predictionData.prediction}</strong> dengan tingkat kepercayaan <strong>{predictionData.confidence}%</strong>.
          </p>
          
          <h3 className="text-xl font-bold mb-4">Key Factors:</h3>
          <div className="flex flex-wrap gap-3">
            {[
              `Prediction: ${predictionData.prediction}`,
              `Confidence: ${predictionData.confidence}%`,
              `Volume: ${predictionData.volume}`,
              "Technical Analysis Strong",
              "Market Sentiment Positive",
              "Institutional Activity High",
              "Low Volatility Period",
              "Bullish Pattern Detected"
            ].map((item, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-gray-700 text-gray-200 text-sm border border-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}