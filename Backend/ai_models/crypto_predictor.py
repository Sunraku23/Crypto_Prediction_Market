# -*- coding: utf-8 -*-
"""Crypto price prediction - FIXED VERSION"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from datetime import datetime, timedelta
import requests
import time
import warnings
warnings.filterwarnings('ignore')

# Set random seeds untuk reproducibility yang berbeda tiap crypto
np.random.seed(42)
tf.random.set_seed(42)

class CoinGeckoAPI:
    def __init__(self):
        self.base_url = "https://api.coingecko.com/api/v3"

    def get_coin_list(self):
        """Get list of available coins"""
        url = f"{self.base_url}/coins/list"
        response = requests.get(url)
        return response.json()

    def get_coin_data(self, coin_id, days='max', interval='daily'):
        """Get historical market data"""
        url = f"{self.base_url}/coins/{coin_id}/market_chart"
        params = {
            'vs_currency': 'usd',
            'days': days,
            'interval': interval
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            # Convert to DataFrame
            prices = data['prices']
            df = pd.DataFrame(prices, columns=['timestamp', 'price'])
            df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
            df.set_index('timestamp', inplace=True)

            # Get volume data if available
            if 'total_volumes' in data:
                volumes = data['total_volumes']
                vol_df = pd.DataFrame(volumes, columns=['timestamp', 'volume'])
                vol_df['timestamp'] = pd.to_datetime(vol_df['timestamp'], unit='ms')
                vol_df.set_index('timestamp', inplace=True)
                df['volume'] = vol_df['volume']

            return df

        except requests.exceptions.RequestException as e:
            print(f"Error fetching data: {e}")
            return None

class CryptoPredictor:
    def __init__(self):
        self.coins = {
            'BTC': 'bitcoin',
            'ETH': 'ethereum', 
            'BNB': 'binancecoin',
            'ADA': 'cardano',
            'SOL': 'solana'
        }
        self.api = CoinGeckoAPI()
        self.models = {}  # Store separate models for each coin
        self.scalers = {} # Store separate scalers for each coin
        
    def create_realistic_dummy_data(self, coin, days=730):
        """Membuat data dummy yang realistis dengan karakteristik unik setiap crypto"""
        print(f"Membuat realistic dummy data untuk {coin}...")
        
        dates = pd.date_range(end=datetime.now(), periods=days, freq='D')
        
        # Karakteristik unik setiap cryptocurrency
        crypto_profiles = {
            'BTC': {'base_price': 50000, 'volatility': 0.08, 'trend': 0.0002, 'seasonality': 0.05},
            'ETH': {'base_price': 3000, 'volatility': 0.12, 'trend': 0.0003, 'seasonality': 0.08},
            'BNB': {'base_price': 500, 'volatility': 0.15, 'trend': 0.0004, 'seasonality': 0.10},
            'ADA': {'base_price': 1.0, 'volatility': 0.20, 'trend': 0.0001, 'seasonality': 0.12},
            'SOL': {'base_price': 100, 'volatility': 0.25, 'trend': 0.0005, 'seasonality': 0.15}
        }
        
        profile = crypto_profiles.get(coin, {'base_price': 100, 'volatility': 0.1, 'trend': 0.0002, 'seasonality': 0.05})
        
        # Set unique random seed berdasarkan nama coin
        seed = hash(coin) % 10000
        np.random.seed(seed)
        
        # Generate price series dengan karakteristik realistis
        returns = np.random.normal(profile['trend'], profile['volatility'], days)
        
        # Add seasonality (pattern mingguan/bulanan)
        t = np.arange(days)
        seasonal_pattern = profile['seasonality'] * np.sin(2 * np.pi * t / 30)  # Monthly pattern
        returns += seasonal_pattern
        
        # Add some random spikes (news events)
        spike_days = np.random.choice(days, size=days//30, replace=False)
        returns[spike_days] += np.random.normal(0, 0.1, len(spike_days))
        
        # Calculate price series
        price_series = profile['base_price'] * np.exp(np.cumsum(returns))
        
        # Ensure positive prices
        price_series = np.abs(price_series)
        
        data = pd.DataFrame({
            'Close': price_series,
            'Volume': np.random.lognormal(14, 1.5, days),  # Realistic volume
            'Open': price_series * (1 + np.random.normal(0, 0.01, days)),
            'High': price_series * (1 + np.abs(np.random.normal(0, 0.02, days))),
            'Low': price_series * (1 - np.abs(np.random.normal(0, 0.02, days)))
        }, index=dates)
        
        return data

    def get_data(self, coin, days=730):
        """Mengambil data harga crypto dari CoinGecko dengan fallback realistic"""
        print(f"Mengambil data {coin} dari CoinGecko...")

        coin_id = self.coins[coin]
        data = self.api.get_coin_data(coin_id, days=days, interval='daily')

        if data is not None and len(data) > 100:  # Pastikan data cukup
            print(f"Data {coin} berhasil diambil: {len(data)} records")
            # Rename columns to match expected format
            data = data.rename(columns={'price': 'Close', 'volume': 'Volume'})
            data['Open'] = data['Close'] * (1 + np.random.normal(0, 0.01, len(data)))
            data['High'] = data['Close'] * (1 + np.abs(np.random.normal(0, 0.02, len(data))))
            data['Low'] = data['Close'] * (1 - np.abs(np.random.normal(0, 0.02, len(data))))
        else:
            print(f"Gagal mengambil data {coin}, menggunakan realistic dummy data")
            data = self.create_realistic_dummy_data(coin, days)

        return data

    def create_features(self, data):
        """Membuat feature engineering yang lebih robust"""
        df = data.copy()

        # Basic price features
        df['Price_Change'] = df['Close'].pct_change()
        df['High_Low_Pct'] = (df['High'] - df['Low']) / df['Close'] * 100

        # Moving averages dengan windows berbeda
        df['MA_7'] = df['Close'].rolling(window=7).mean()
        df['MA_21'] = df['Close'].rolling(window=21).mean()
        df['MA_50'] = df['Close'].rolling(window=50).mean()
        
        # Moving average crossovers
        df['MA_7_21_Cross'] = df['MA_7'] - df['MA_21']
        df['MA_7_50_Cross'] = df['MA_7'] - df['MA_50']

        # Volatility measures
        df['Volatility_7'] = df['Price_Change'].rolling(window=7).std()
        df['Volatility_21'] = df['Price_Change'].rolling(window=21).std()

        # RSI dengan handling division by zero
        delta = df['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        
        # Avoid division by zero
        rs = np.where(loss != 0, gain / loss, 1.0)
        df['RSI'] = 100 - (100 / (1 + rs))

        # Volume indicators dengan error handling
        if 'Volume' in df.columns:
            df['Volume_MA_10'] = df['Volume'].rolling(window=10).mean()
            df['Volume_Ratio'] = np.where(
                df['Volume_MA_10'] > 0,
                df['Volume'] / df['Volume_MA_10'],
                1.0
            )
            df['Volume_Change'] = df['Volume'].pct_change()
        else:
            df['Volume_Ratio'] = 1.0
            df['Volume_Change'] = 0.0

        # Price momentum dengan berbagai timeframes
        for period in [3, 5, 10, 21]:
            df[f'Momentum_{period}'] = df['Close'].pct_change(period)

        # Support Resistance levels (simplified)
        df['Resistance'] = df['High'].rolling(window=21).max()
        df['Support'] = df['Low'].rolling(window=21).min()
        df['Distance_To_Resistance'] = (df['Close'] - df['Resistance']) / df['Close'] * 100
        df['Distance_To_Support'] = (df['Close'] - df['Support']) / df['Close'] * 100

        # Target variable
        lookahead = 7
        df['Future_Price'] = df['Close'].shift(-lookahead)
        df['Price_Change_7d'] = ((df['Future_Price'] - df['Close']) / df['Close']) * 100

        df = df.dropna()
        print(f"Features created: {df.shape}, Columns: {len(df.columns)}")
        return df

    def prepare_lstm_data(self, data, lookback=30, coin='BTC'):
        """Mempersiapkan data untuk LSTM dengan scaler per coin"""
        # Pilih features yang tersedia
        base_features = ['Close', 'High_Low_Pct', 'Volume_Ratio', 'RSI', 'Volatility_7', 
                        'Momentum_5', 'MA_7_21_Cross', 'Distance_To_Resistance']
        
        available_features = [col for col in base_features if col in data.columns]
        
        # Pastikan ada variasi dalam features
        if len(available_features) < 3:
            available_features = ['Close', 'High_Low_Pct', 'Volume_Ratio', 'RSI']
            available_features = [col for col in available_features if col in data.columns]
        
        print(f"{coin} - Using features: {available_features}")

        # Gunakan scaler khusus untuk coin ini
        if coin not in self.scalers:
            self.scalers[coin] = MinMaxScaler()
        
        scaler = self.scalers[coin]
        scaled_data = scaler.fit_transform(data[available_features])

        X, y = [], []
        for i in range(lookback, len(scaled_data)):
            X.append(scaled_data[i-lookback:i])
            y.append(scaled_data[i, 0])  # Predict Close price

        return np.array(X), np.array(y), available_features, scaler

    def build_coin_specific_model(self, lookback, n_features, coin):
        """Membangun model LSTM dengan architecture berbeda untuk setiap coin"""
        # Architecture berbeda berdasarkan coin
        architectures = {
            'BTC': [100, 80, 50],  # BTC: Complex model
            'ETH': [80, 60, 40],   # ETH: Medium complex
            'BNB': [60, 40, 30],   # BNB: Simpler
            'ADA': [50, 30, 20],   # ADA: Even simpler
            'SOL': [70, 50, 30]    # SOL: Medium
        }
        
        units = architectures.get(coin, [50, 30, 20])
        
        model = Sequential()
        
        # First LSTM layer
        model.add(LSTM(units[0], return_sequences=True, 
                      input_shape=(lookback, n_features),
                      dropout=0.2, recurrent_dropout=0.2))
        
        # Second LSTM layer
        if len(units) > 1:
            model.add(LSTM(units[1], return_sequences=len(units) > 2,
                          dropout=0.2, recurrent_dropout=0.2))
        
        # Third LSTM layer jika ada
        if len(units) > 2 and units[2] > 0:
            model.add(LSTM(units[2], dropout=0.2, recurrent_dropout=0.2))
        
        # Dense layers
        model.add(Dense(25, activation='relu'))
        model.add(Dropout(0.3))
        model.add(Dense(1))

        model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
                     loss='mean_squared_error', 
                     metrics=['mae'])
        
        return model

    def train_model(self, coin):
        """Melatih model untuk coin tertentu dengan konfigurasi unik"""
        print(f"🚀 Training model untuk {coin}...")

        # Get data
        data = self.get_data(coin, days=365)
        print(f"{coin} - Data range: {data.index.min()} to {data.index.max()}")
        print(f"{coin} - Price stats: Min=${data['Close'].min():.2f}, Max=${data['Close'].max():.2f}")

        data_with_features = self.create_features(data)

        if len(data_with_features) < 50:
            print("❌ Data tidak cukup untuk training")
            return None, None, None, None, None, None

        # Prepare data dengan parameter unik
        lookback = 30
        X, y, features_used, scaler = self.prepare_lstm_data(data_with_features, lookback, coin)

        print(f"{coin} - Data shape - X: {X.shape}, y: {y.shape}")

        if len(X) == 0:
            print("❌ Tidak ada data untuk training")
            return None, None, None, None, None, None

        # Split data
        split = int(0.8 * len(X))
        X_train, X_test = X[:split], X[split:]
        y_train, y_test = y[:split], y[split:]

        # Build and train model khusus untuk coin ini
        self.models[coin] = self.build_coin_specific_model(lookback, X.shape[2], coin)
        model = self.models[coin]

        print(f"Memulai training {coin} dengan architecture khusus...")
        history = model.fit(
            X_train, y_train,
            batch_size=32,  # Batch size berbeda
            epochs=25,      # Epochs berbeda
            validation_data=(X_test, y_test),
            verbose=1,
            shuffle=False
        )

        # Evaluate model
        train_predict = model.predict(X_train, verbose=0)
        test_predict = model.predict(X_test, verbose=0)

        train_rmse = np.sqrt(mean_squared_error(y_train, train_predict))
        test_rmse = np.sqrt(mean_squared_error(y_test, test_predict))

        print(f"✅ {coin} - Train RMSE: {train_rmse:.4f}, Test RMSE: {test_rmse:.4f}")

        return history, X_test, y_test, test_predict, features_used, scaler

    def get_trading_recommendation(self, coin, features_used, scaler):
        """Memberikan rekomendasi trading dengan analisis mendalam"""
        print(f"📊 Menganalisis {coin} untuk rekomendasi...")

        # Get recent data
        data = self.get_data(coin, days=120)  # 4 months untuk konteks lebih baik
        data_with_features = self.create_features(data)

        if len(data_with_features) < 30:
            print("❌ Data tidak cukup untuk prediksi")
            return None

        # Prepare latest data for prediction
        recent_data = data_with_features[features_used].tail(30)
        if len(recent_data) < 30:
            print("❌ Data terakhir tidak cukup")
            return None

        scaled_data = scaler.transform(recent_data)

        # Predict next price
        model = self.models[coin]
        latest_data = scaled_data.reshape(1, 30, len(features_used))
        predicted_price_scaled = model.predict(latest_data, verbose=0)

        # Inverse transform to get actual price
        dummy = np.zeros((1, len(features_used)))
        dummy[0, 0] = predicted_price_scaled[0, 0]
        predicted_price = scaler.inverse_transform(dummy)[0, 0]

        current_price = data_with_features['Close'].iloc[-1]
        price_change_pct = ((predicted_price - current_price) / current_price) * 100

        # Technical analysis mendalam
        current_rsi = data_with_features['RSI'].iloc[-1] if 'RSI' in data_with_features.columns else 50
        current_volume = data_with_features['Volume_Ratio'].iloc[-1] if 'Volume_Ratio' in data_with_features.columns else 1
        
        # Trend analysis
        price_trend = data_with_features['Close'].pct_change(7).iloc[-1] if len(data_with_features) > 7 else 0
        ma_trend = (data_with_features['MA_7'].iloc[-1] - data_with_features['MA_21'].iloc[-1]) / data_with_features['Close'].iloc[-1] * 100 if 'MA_7' in data_with_features.columns and 'MA_21' in data_with_features.columns else 0

        # Generate recommendation dengan multiple factors
        bullish_factors = 0
        bearish_factors = 0
        
        if price_change_pct > 3.0:
            bullish_factors += 2
        elif price_change_pct > 1.0:
            bullish_factors += 1
        elif price_change_pct < -3.0:
            bearish_factors += 2
        elif price_change_pct < -1.0:
            bearish_factors += 1
            
        if current_rsi < 40:
            bullish_factors += 1
        elif current_rsi > 70:
            bearish_factors += 1
            
        if current_volume > 1.2:
            bullish_factors += 1
        elif current_volume < 0.8:
            bearish_factors += 1
            
        if price_trend > 0.02:
            bullish_factors += 1
        elif price_trend < -0.02:
            bearish_factors += 1

        # Decision logic berdasarkan multiple factors
        if bullish_factors >= 4 and bearish_factors <= 1:
            recommendation = "🟢 STRONG BUY"
            confidence = "Tinggi"
            reason = "Multiple faktor bullish converged"
        elif bullish_factors >= 3:
            recommendation = "🟢 BUY" 
            confidence = "Sedang-Tinggi"
            reason = "Beberapa faktor mendukung kenaikan"
        elif bearish_factors >= 4 and bullish_factors <= 1:
            recommendation = "🔴 STRONG SELL"
            confidence = "Tinggi"
            reason = "Multiple faktor bearish converged"
        elif bearish_factors >= 3:
            recommendation = "🔴 SELL"
            confidence = "Sedang-Tinggi" 
            reason = "Beberapa faktor mendukung penurunan"
        elif abs(price_change_pct) < 2 and abs(bullish_factors - bearish_factors) <= 1:
            recommendation = "🟡 HOLD"
            confidence = "Sedang"
            reason = "Market sideways, tunggu konfirmasi"
        else:
            recommendation = "🟡 HOLD"
            confidence = "Rendah"
            reason = "Sinyal mixed, risk tinggi"

        return {
            'coin': coin,
            'current_price': current_price,
            'predicted_price': predicted_price,
            'price_change_pct': price_change_pct,
            'recommendation': recommendation,
            'confidence': confidence,
            'reason': reason,
            'rsi': current_rsi,
            'volume_ratio': current_volume,
            'bullish_factors': bullish_factors,
            'bearish_factors': bearish_factors,
            'timestamp': datetime.now()
        }

# Main execution dengan multiple coin support
def main():
    predictor = CryptoPredictor()

    print("🎯 Crypto Price Prediction - ENHANCED VERSION")
    print("=" * 50)
    print("Pilih coin untuk prediksi:")
    print("1. Bitcoin (BTC) - Store of Value")
    print("2. Ethereum (ETH) - Smart Contracts") 
    print("3. Binance Coin (BNB) - Exchange Token")
    print("4. Cardano (ADA) - Proof of Stake")
    print("5. Solana (SOL) - High Speed")
    print("6. All Coins (Comparative Analysis)")
    print("=" * 50)

    coin_choice = input("Masukkan pilihan (1-6): ").strip()

    coin_map = {
        '1': 'BTC',
        '2': 'ETH',
        '3': 'BNB', 
        '4': 'ADA',
        '5': 'SOL'
    }

    if coin_choice == '6':
        # Analyze all coins
        results = []
        for coin_name in ['BTC', 'ETH', 'BNB', 'ADA', 'SOL']:
            print(f"\n🔍 Analyzing {coin_name}...")
            try:
                result = predictor.train_model(coin_name)
                if result[0] is not None:
                    history, X_test, y_test, test_predict, features_used, scaler = result
                    recommendation = predictor.get_trading_recommendation(coin_name, features_used, scaler)
                    if recommendation:
                        results.append(recommendation)
            except Exception as e:
                print(f"❌ Error processing {coin_name}: {e}")
        
        # Display comparative results
        print("\n" + "=" * 80)
        print("📊 COMPARATIVE CRYPTO ANALYSIS")
        print("=" * 80)
        for rec in results:
            print(f"\n🪙  {rec['coin']}:")
            print(f"   💰 Current: ${rec['current_price']:.2f} | 🎯 Predicted: ${rec['predicted_price']:.2f}")
            print(f"   📈 Change: {rec['price_change_pct']:+.2f}% | RSI: {rec['rsi']:.1f}")
            print(f"   ✅ {rec['recommendation']} ({rec['confidence']})")
            print(f"   💡 {rec['reason']}")
            print(f"   📊 Bullish: {rec['bullish_factors']}/5 | Bearish: {rec['bearish_factors']}/5")

    elif coin_choice in coin_map:
        selected_coin = coin_map[coin_choice]

        try:
            print(f"\n🔍 Memproses {selected_coin}...")
            # Training model
            result = predictor.train_model(selected_coin)

            if result[0] is None:
                print("❌ Gagal training model")
                return

            history, X_test, y_test, test_predict, features_used, scaler = result

            # Get recommendation
            recommendation = predictor.get_trading_recommendation(selected_coin, features_used, scaler)

            if recommendation:
                print("\n" + "=" * 70)
                print("📊 HASIL PREDIKSI & REKOMENDASI TRADING")
                print("=" * 70)
                print(f"🪙  Coin: {recommendation['coin']}")
                print(f"💰 Harga Sekarang: ${recommendation['current_price']:.2f}")
                print(f"🎯 Prediksi Harga: ${recommendation['predicted_price']:.2f}")
                print(f"📈 Perubahan Prediksi: {recommendation['price_change_pct']:+.2f}%")
                print(f"✅ Rekomendasi: {recommendation['recommendation']}")
                print(f"🎲 Confidence: {recommendation['confidence']}")
                print(f"💡 Alasan: {recommendation['reason']}")
                print(f"📊 Bullish Factors: {recommendation['bullish_factors']}/5")
                print(f"📉 Bearish Factors: {recommendation['bearish_factors']}/5")
                print("=" * 70)

                # Technical analysis detail
                print("\n📋 DETAILED TECHNICAL ANALYSIS:")
                print(f"• RSI: {recommendation['rsi']:.1f}", end=" ")
                if recommendation['rsi'] > 70:
                    print("(OVERBOUGHT ⚠️)")
                elif recommendation['rsi'] < 30:
                    print("(OVERSOLD ⚠️)") 
                else:
                    print("(NORMAL ✅)")
                
                print(f"• Volume Ratio: {recommendation['volume_ratio']:.2f}x", end=" ")
                if recommendation['volume_ratio'] > 1.5:
                    print("(HIGH VOLUME 📈)")
                elif recommendation['volume_ratio'] < 0.7:
                    print("(LOW VOLUME 📉)")
                else:
                    print("(NORMAL ✅)")

            # Plot results
            plot_results(history, y_test, test_predict, selected_coin)

            # Disclaimer
            print("\n⚠️  DISCLAIMER: Prediksi AI untuk edukasi dan research saja!")
            print("   Bukan financial advice! Risiko trading ditanggung sendiri!")
            print("   Always do your own research (DYOR)!") 

        except Exception as e:
            print(f"❌ Error: {str(e)}")
            import traceback
            traceback.print_exc()

    else:
        print("❌ Pilihan tidak valid! Silakan pilih 1-6")

def plot_results(history, y_test, test_predict, coin):
    """Plot training history dan predictions"""
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 10))

    # Plot training history
    ax1.plot(history.history['loss'], label='Training Loss', linewidth=2)
    ax1.plot(history.history['val_loss'], label='Validation Loss', linewidth=2)
    ax1.set_title(f'{coin} - Model Training History', fontsize=14, fontweight='bold')
    ax1.set_ylabel('Loss', fontsize=12)
    ax1.legend(fontsize=10)
    ax1.grid(True, alpha=0.3)

    # Plot predictions vs actual
    ax2.plot(y_test, label='Actual Prices', alpha=0.8, linewidth=2, color='blue')
    ax2.plot(test_predict, label='Predicted Prices', alpha=0.8, linewidth=2, color='red')
    ax2.set_title(f'{coin} - Actual vs Predicted Prices', fontsize=14, fontweight='bold')
    ax2.set_ylabel('Price (Normalized)', fontsize=12)
    ax2.legend(fontsize=10)
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    main()