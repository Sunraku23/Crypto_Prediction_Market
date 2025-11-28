#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simplified AI prediction - No emoji to avoid encoding issues
"""

import sys
import json
import random
from datetime import datetime

def generate_prediction(coin_symbol):
    """
    Generate AI prediction tanpa emoji untuk avoid encoding issues
    """
    try:
        # Print tanpa emoji
        print(f"Generating AI prediction for {coin_symbol}...")
        
        # Base prices untuk setiap coin
        base_prices = {
            'BTC': 45000,
            'ETH': 3000, 
            'BNB': 600,
            'ADA': 0.5,
            'SOL': 100
        }
        
        current_price = base_prices.get(coin_symbol, 1000)
        
        # Simulasi AI prediction
        volatility = 0.08  # 8% volatility
        random_change = (random.random() * volatility * 2) - volatility
        predicted_price = current_price * (1 + random_change)
        price_change_pct = random_change * 100
        
        # Generate recommendation tanpa emoji
        if price_change_pct > 5.0:
            recommendation = "STRONG BUY"
            confidence = "Tinggi"
            reason = "Prediksi kenaikan kuat dengan momentum positif"
        elif price_change_pct > 2.0:
            recommendation = "BUY" 
            confidence = "Sedang"
            reason = "Prediksi kenaikan dengan kondisi teknikal baik"
        elif price_change_pct < -5.0:
            recommendation = "STRONG SELL"
            confidence = "Tinggi" 
            reason = "Prediksi penurunan kuat dengan tekanan jual"
        elif price_change_pct < -2.0:
            recommendation = "SELL"
            confidence = "Sedang"
            reason = "Prediksi penurunan dengan momentum negatif"
        else:
            recommendation = "HOLD"
            confidence = "Sedang"
            reason = "Harga diprediksi stabil dalam range sempit"
        
        # Technical indicators
        rsi = 40 + (random.random() * 40)
        volume_ratio = 0.7 + (random.random() * 0.8)
        
        prediction_result = {
            'coin': coin_symbol,
            'current_price': round(current_price, 2),
            'predicted_price': round(predicted_price, 2),
            'price_change_pct': round(price_change_pct, 2),
            'recommendation': recommendation,
            'confidence': confidence,
            'reason': reason,
            'rsi': round(rsi, 1),
            'volume_ratio': round(volume_ratio, 2),
            'timestamp': datetime.now().isoformat(),
            'model_version': '1.0-simple'
        }
        
        print(f"Prediction generated for {coin_symbol}")
        return prediction_result
        
    except Exception as e:
        # Error message tanpa emoji
        print(f"Error in prediction: {str(e)}")
        return None

if __name__ == "__main__":
    # Dijalankan dari command line
    if len(sys.argv) > 1:
        coin_symbol = sys.argv[1]
        result = generate_prediction(coin_symbol)
        if result:
            print(json.dumps(result))
        else:
            sys.exit(1)
    else:
        print("Usage: python run_prediction_simple.py <COIN_SYMBOL>")
        sys.exit(1)