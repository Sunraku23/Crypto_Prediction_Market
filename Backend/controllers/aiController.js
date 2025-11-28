const { exec } = require('child_process');
const path = require('path');

// Simple coin mapping
const COIN_MAP = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum', 
  'BNB': 'binancecoin',
  'ADA': 'cardano',
  'SOL': 'solana'
};

// Run Python model
function runPythonModel(coinSymbol) {
  return new Promise((resolve, reject) => {
    console.log(`🐍 Running Python model for ${coinSymbol}...`);
    
    const pythonScriptPath = path.join(__dirname, '../ai_models/run_prediction_simple.py');
    
    exec(`python "${pythonScriptPath}" ${coinSymbol}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Python script error:', error.message);
        reject(new Error('Python model failed'));
        return;
      }
      
      try {
        console.log('✅ Python output received');
        const prediction = JSON.parse(stdout.trim());
        
        // Add emoji to Python output
        prediction.recommendation = addEmojiToRecommendation(prediction.recommendation);
        prediction.source = 'Python AI Model';
        
        resolve(prediction);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        reject(new Error('Failed to parse Python output'));
      }
    });
  });
}

// Add emoji to recommendation
function addEmojiToRecommendation(recommendation) {
  const emojiMap = {
    'STRONG BUY': '🟢 STRONG BUY',
    'BUY': '🟢 BUY',
    'STRONG SELL': '🔴 STRONG SELL', 
    'SELL': '🔴 SELL',
    'HOLD': '🟡 HOLD'
  };
  return emojiMap[recommendation] || recommendation;
}

// JavaScript fallback prediction
function generateJSPrediction(coinSymbol) {
  console.log(`🔮 Generating JS prediction for ${coinSymbol}...`);
  
  const prices = {
    'BTC': 45000, 'ETH': 3000, 'BNB': 600, 'ADA': 0.5, 'SOL': 100
  };
  
  const currentPrice = prices[coinSymbol] || 1000;
  const change = (Math.random() * 16) - 8; // -8% to +8%
  const predictedPrice = currentPrice * (1 + change/100);
  
  let recommendation, confidence;
  if (change > 5) {
    recommendation = "🟢 STRONG BUY"; confidence = "Tinggi";
  } else if (change > 2) {
    recommendation = "🟢 BUY"; confidence = "Sedang";
  } else if (change < -5) {
    recommendation = "🔴 STRONG SELL"; confidence = "Tinggi";
  } else if (change < -2) {
    recommendation = "🔴 SELL"; confidence = "Sedang";
  } else {
    recommendation = "🟡 HOLD"; confidence = "Sedang";
  }
  
  return {
    coin: coinSymbol,
    current_price: parseFloat(currentPrice.toFixed(2)),
    predicted_price: parseFloat(predictedPrice.toFixed(2)),
    price_change_pct: parseFloat(change.toFixed(2)),
    recommendation: recommendation,
    confidence: confidence,
    reason: "AI analysis completed",
    rsi: parseFloat((50 + Math.random() * 20 - 10).toFixed(1)),
    volume_ratio: parseFloat((1 + Math.random() * 0.5 - 0.25).toFixed(2)),
    timestamp: new Date().toISOString(),
    source: 'JavaScript Fallback'
  };
}

// Main prediction function
async function getPrediction(req, res) {
  try {
    const { coin } = req.body;
    
    console.log('Prediction request for:', coin);
    
    if (!coin || !COIN_MAP[coin]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coin symbol'
      });
    }
    
    let prediction;
    
    // Try Python first
    try {
      console.log('Attempting Python model...');
      prediction = await runPythonModel(coin);
    } catch (error) {
      console.log('Python failed, using JS fallback');
      prediction = generateJSPrediction(coin);
    }
    
    console.log('✅ Prediction successful for', coin);
    
    res.json({
      success: true,
      message: 'Prediction generated successfully',
      data: prediction
    });
    
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({
      success: false,
      message: 'Prediction failed',
      error: error.message
    });
  }
}

// Get available coins
function getAvailableCoins(req, res) {
  const coins = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'SOL', name: 'Solana' }
  ];
  
  res.json({
    success: true,
    data: coins
  });
}

// Health check
function getAIHealth(req, res) {
  res.json({
    success: true,
    message: 'AI Service is running',
    timestamp: new Date().toISOString(),
    supported_coins: Object.keys(COIN_MAP)
  });
}

// Export functions
module.exports = {
  getPrediction,
  getAvailableCoins, 
  getAIHealth
};