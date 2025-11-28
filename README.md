# 🚀 Aplikasi Prediksi Cryptocurrency

Aplikasi pintar untuk prediksi harga cryptocurrency yang didukung oleh AI dan machine learning, dilengkapi dengan analisis pasar real-time dan rekomendasi trading.
## ✨ Fitur Utama

### 🔐 Autentikasi & Keamanan
- **Sistem Login Ganda**: Email/Password + Google OAuth 2.0
- **Autentikasi JWT Token**
- **Enkripsi Password** dengan bcrypt
- **Protected Routes** dan middleware keamanan

### 🤖 Prediksi Berbasis AI
- **Model Machine Learning** untuk prediksi harga
- **Integrasi Python AI** dengan analisis real-time
- **Indikator Teknikal**: RSI, Analisis Volume, Momentum
- **Rekomendasi Trading**: sinyal BUY/SELL/HOLD
- **Skor Kepercayaan** untuk setiap prediksi

### 📊 Analisis Pasar
- **Harga Cryptocurrency Real-time** dari CoinGecko API
- **Chart Interaktif** dengan Chart.js
- **Analisis Trend** dan pengenalan pola
- **Multiple Cryptocurrency**: BTC, ETH, BNB, ADA, SOL

### 🎯 Pengalaman Pengguna
- **Desain Responsif** dengan Tailwind CSS
- **Update Real-time** dan data live
- **Dashboard Intuitif** dengan insight pasar
- **Interface Mobile-Friendly**

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React.js** + Vite - Framework UI modern
- **Tailwind CSS** - CSS framework utility-first
- **Chart.js** - Visualisasi data interaktif
- **React Router** - Client-side routing
- **Axios** - HTTP client untuk API calls

### Backend
- **Node.js** + Express.js - Server runtime
- **MongoDB** + Mongoose - Database & ODM
- **JWT** - JSON Web Tokens untuk autentikasi
- **bcryptjs** - Password hashing
- **Passport.js** - Integrasi Google OAuth

### AI & Data
- **Python** - Model machine learning
- **CoinGecko API** - Data cryptocurrency real-time
- **Analisis Teknikal** - RSI, Volume, indikator harga

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js (v16 atau lebih tinggi)
- MongoDB (local atau Atlas)
- Python (v3.8 atau lebih tinggi)
- Akun Google Cloud Console (untuk OAuth)

### 1. Clone Repository

git clone https://github.com/Sunraku23/Crypto_Prediction_Market.git
cd Crypto_Prediction_Market
2. Setup Backend
bash
cd backend

# Install dependencies
npm install

# Konfigurasi environment
cp .env.example .env
Edit backend/.env:


env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crypto_prediction
JWT_SECRET=your_super_secret_jwt_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

CLIENT_URL=http://localhost:5173
3. Setup Frontend
bash
cd ../STC
npm install
4. Setup Model AI
bash
cd ../backend/ai_models

# Install dependencies Python
pip install -r requirements.txt

# Atau install satu per satu
pip install pandas numpy requests
5. Setup Database
Jalankan service MongoDB

Database akan dibuat otomatis saat pertama run

🎮 Cara Menggunakan
Menjalankan Aplikasi
Jalankan Backend Server:

bash
cd backend
npm run dev
Jalankan Frontend Development Server:

bash
cd STC
npm run dev
Akses Aplikasi:

Frontend: http://localhost:5173

Backend API: http://localhost:5000

Alur Aplikasi
Registrasi/Login

Buat akun baru atau gunakan Google OAuth

Autentikasi JWT yang aman

Trend Pasar

Lihat harga cryptocurrency real-time

Analisis trend dan pola pasar

Prediksi AI

Pilih cryptocurrency untuk dianalisis

Generate prediksi harga berbasis AI

Dapatkan rekomendasi trading

Analisis Teknikal

Indikator RSI

Analisis volume trading

Sinyal momentum harga

🔧 Endpoint API
Autentikasi
POST /api/auth/register - Registrasi user

POST /api/auth/login - Login user

GET /api/auth/google - Inisiasi Google OAuth

GET /api/auth/me - Dapatkan profil user saat ini

Prediksi AI
POST /api/ai/predict - Generate prediksi AI

GET /api/ai/coins - Dapatkan list cryptocurrency

GET /api/ai/health - Health check service AI

Data Pasar
Terintegrasi dengan CoinGecko API untuk harga real-time

🤖 Fitur Prediksi AI
Model Machine Learning
Analisis Trend Harga menggunakan data historis

Pengenalan Pola untuk pergerakan market

Prediksi Volatilitas berdasarkan kondisi pasar

Indikator Teknikal
RSI (Relative Strength Index)

Analisis Volume Trading

Momentum Harga

Moving Averages

Output Fitur
Prediksi Harga dengan interval kepercayaan

Rekomendasi Trading (BUY/SELL/HOLD)

Assesmen Risiko dan skor kepercayaan

Analisis Sentimen Pasar

👨‍💻 Pengembangan
Menambah Cryptocurrency Baru
Update coinMap di aiController.js

Tambah data coin ke model prediksi

Update pilihan coin di frontend

Mengembangkan Model AI
Modifikasi script Python di folder ai_models/

Tambah indikator teknikal baru

Update algoritma prediksi

Pengembangan API
Ikuti konvensi RESTful

Implementasi error handling yang proper

Tambah validasi input

Sertakan dokumentasi yang komprehensif

🐛 Pemecahan Masalah
Masalah Umum
Error Koneksi MongoDB

Pastikan service MongoDB berjalan

Periksa connection string di file .env

Error Model Python

Verifikasi instalasi Python

Periksa dependencies di requirements.txt

Selesaikan issues encoding untuk Windows

Gagal Google OAuth

Verifikasi callback URLs di Google Cloud Console

Periksa client ID dan secret di .env

Issues CORS

Pastikan URL frontend dan backend match

Periksa konfigurasi CORS di app.js

📈 Pengembangan Selanjutnya
Model ML Lanjutan - Jaringan neural LSTM

Manajemen Portfolio - Virtual trading

Lebih Banyak Cryptocurrency - Ekspansi cakupan coin

Aplikasi Mobile - Versi React Native

Notifikasi Real-time - Price alerts

Fitur Sosial - Prediksi komunitas

⚠️ Disclaimer
Aplikasi ini dibuat untuk tujuan edukasi dan penelitian saja. Investasi cryptocurrency memiliki risiko tinggi, dan prediksi tidak boleh dianggap sebagai saran finansial. Selalu lakukan penelitian sendiri dan konsultasi dengan penasihat keuangan sebelum membuat keputusan investasi.
