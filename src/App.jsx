import { Link } from "react-router-dom";

// Import function login & register


// import komponen

import imgRafi from "./assets/1000011184.jpg";
import imgIrbil from "./assets/IMG_0552.PNG";
import imgZidan from "./assets/IMG_3181.JPG";
import imgAlif from "./assets/IMG_20250726_155204.jpg";

function App() {
  const team = [
  {
    name: "Muhammad Rafi Fadillah",
    role: "Hipster",
    img: imgRafi,
  },
  {
    name: "Irbil Al Muzaffar",
    role: "Project Manager",
    img: imgIrbil,
  },
  {
    name: "Zidan",
    role: "Hustler",
    img: imgZidan,
  },
  {
    name: "Alif",
    role: "Hacker",
    img: imgAlif,
  }
]

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header / Navbar */}
      <header className="flex items-center gap-20 p-4 justify-between w-full border-b">
        <div className="flex items-center">
          <img className="w-20 h-20" src="src/assets/logoCryptoin.svg" alt="CryptoIn logo" />
          <h1 className="ml-3 text-xl font-semibold">CryptoIn.AI</h1>
        </div>
        <div className="hidden md:flex space-x-8 text-xl list-none gap-20">
          <li><a href="#overview" className="hover:underline transition">Overview</a></li>
          <li><a href="#about" className="hover:underline transition">About</a></li>
          <li><a href="#why-us" className="hover:underline transition">Why Us?</a></li>
          <li><a href="#how-it-works" className="hover:underline transition">How It Works</a></li>
          <li><a href="#team" className="hover:underline transition">Team</a></li>
        </div>

        <button className="bg-black-600/40 border text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition glow mr-10">
            <Link className="p-8" to="/login">Login</Link>
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex items-center gap-10">
        <img className="ml-30 mt-20" src="src/assets/3D-logo.png" alt="" />
        <section className="ml-10">
          <div>
            <p className="text-6xl">Predict the Future of</p>
            <p className="text-6xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Crypto with AI</p>
            <p className="text-2xl">Our decentralized predictive engine analyzes real-time</p>
            <p className="text-2xl">blockchain data using LTSM to</p>
            <p className="text-2xl">generate high-accuracy crypto insights.</p>
          </div>
          <div className="mt-6 ">
            <button className="bg-black-600/40 border text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition glow mr-6 bold font-bold">
              <a className="p-8" href="View More">View More →</a>
            </button>
            <button className="bg-black-600/40 border text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition glow font-bold">
              <a className="p-8" href="Try Now">Try Now</a>
            </button>
          </div>
        </section>
      </section>

      {/* About Section */}
      <section id="about" className="flex items-center justify-center mt-32 gap-16 px-20">
        {/* Hoverable stacked images */}
        <div className="relative group cursor-pointer w-[320px] h-80">
          {/* Image Back */}
          <img
          src="src/assets/Mask group back.png"
          className="absolute top-0 left-0 w-full h-full rounded-xl transition-transform duration-500 group-hover:-translate-x-10 opacity-70"
          />


          {/* Image Front */}
          <img
          src="src/assets/Mask group.png" 
          className="absolute -top-5 -left-5 w-full h-full rounded-xl transition-transform duration-500 group-hover:-translate-x-20 group-hover:-rotate-12"
          />
        </div>

        {/* Text */}
        <div className="max-w-xl">
          <h2 className="text-center text-3xl font-bold mb-4">ABOUT OUR PROJECT</h2>
          <p className="text-lg mb-4">
            Platform ini membantu pengguna memahami arah pergerakan crypto tanpa harus jago membaca grafik.
          </p>
          <p className="text-lg mb-6 opacity-80">
            AI kami menganalisis data dan menjelaskan tren dengan cara yang sederhana, sehingga siapapun bisa mulai berinvestasi dengan percaya diri.
          </p>

          <button className="bg-black-600/40 border text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition glow">
            View More →
          </button>
        </div>
      </section>
      {/* WHY US Section */}
      <section id="why-us" className="mt-32 text-center">
        <h2 className="text-3xl font-bold mb-12">WHY US</h2>


        <div className="flex justify-center gap-10 px-10 flex-wrap">
          <div className="w-[300px] p-6 rounded-xl bg-purple-900/40 border border-purple-600 shadow-lg">
            <img src="src/assets/Group 1.png" className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold">Easy to Understand Predictions</h3>
            <p className="text-sm mt-2 opacity-80">Prediksi yang jelas dan mudah dipahami, tanpa istilah teknis yang membingungkan</p>
          </div>


          <div className="w-[300px] p-6 rounded-xl bg-purple-900/40 border border-purple-600 shadow-lg">
            <img src="src/assets/Group 1 (1).png" className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold">High Accuracy</h3>
            <p className="text-sm mt-2 opacity-80">AI realtime dengan akurasi tinggi.</p>
          </div>


          <div className="w-[300px] p-6 rounded-xl bg-purple-900/40 border border-purple-600 shadow-lg">
            <img src="src/assets/Group 1 (2).png" className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold">Beginner Friendly</h3>
            <p className="text-sm mt-2 opacity-80">Mudah dipahami pemula.</p>
          </div>
        </div>


      {/* Wrapper untuk center */}
<div className="w-full flex justify-center">
  <div className="flex overflow-hidden space-x-14 group max-w-5xl">
    
    {/* Loop 1 */}
    <div className="flex w-full py-6 gap-12.5 loop-scroll group-hover:paused">
      <img loading="lazy" className="max-w-none" src="src/assets/12114250 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/14446160 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/14446202 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/14446234 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/14446237 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/15301504 2.png" alt="" />
    </div>

    {/* Loop 2 */}
    <div className="flex w-full py-6 gap-12.5 loop-scroll" aria-hidden="true">
      <img loading="lazy" className="max-w-none" src="src/assets/12114250 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/14446160 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/14446202 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/14446234 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/14446237 1.png" alt="" />
      <img loading="lazy" className="max-w-none" src="src/assets/15301504 2.png" alt="" />
    </div>
    
  </div>
</div>
      </section>

      {/* HOW IT WORKS Section */}
      <section id="how-it-works" className="mt-32 text-center px-10">
        <h2 className="text-3xl font-bold mb-12">HOW IT WORKS?</h2>

        <div className="flex justify-center gap-10 flex-wrap">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flip-card w-[300px] h-[360px]">
              <div className="flip-card-inner w-full h-full rounded-xl border border-purple-500">

                {/* FRONT */}
                <div className="flip-card-front absolute inset-0 bg-linear-to-b from-purple-800 to-purple-900 rounded-xl p-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center text-2xl font-bold text-white mb-4">
                    {step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI Membaca pergerakan harga</h3>
                  <p className="text-sm opacity-80">
                    Sistem AI kami menganalisis data harga crypto secara real time.
                  </p>
                </div>

                {/* BACK */}
                <div className="flip-card-back absolute inset-0 bg-purple-900 rounded-xl p-6 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold mb-4">Detail Step {step}</h3>
                  <p className="text-sm opacity-80">
                    Pada tahap ini, AI memproses data lanjutan dan menyiapkan prediksi.
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ===== TEAM SECTION (replace the manual cards with this) ===== */}
      <section id="team" className="mt-32 text-center px-10">
        <h2 className="text-3xl font-bold mb-12">OUR TEAM</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {team.map((person, idx) => (
            <div key={idx} className="relative bg-purple-400/40 rounded-xl w-full h-[230px] overflow-hidden shadow-lg">
              <img
                src={person.img}
                alt={`${person.name} photo`}
                className="w-full h-full object-cover rounded-xl object-[50%_40%]" // atur foto
                onError={(e) => {
                  // fallback kalau path broken — tampilkan warna background
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* overlay dark gradient supaya teks terbaca */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent rounded-xl"></div>

              {/* Info box di pojok kiri bawah */}
              <div className="absolute left-4 bottom-4 text-left z-10">
                <h3 className="text-white text-lg font-semibold">{person.name}</h3>
                <p className="text-sm text-white/80">{person.role}</p>
              </div>

              {/* Logo pojok kanan atas (tetap kalau mau) */}
              <img
                src="src/assets/Universitas Gunadarma [KoleksiLogo.com] 2.png"
                className="absolute top-3 right-3 w-14 h-14 rounded-full bg-white p-1"
                alt="logo"
              />
            </div>
          ))}
        </div>
      </section>


      {/* FOOTER */}
      <footer className="w-full bg-[#0f0f0f] border-t border-white/10 mt-20 py-10 px-10">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Logo + Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-6 bg-linear-to-b from-green-500 to-red-500 rounded-sm"></div>
              <h2 className="text-xl font-semibold">Cryptoin</h2>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-4 text-xl opacity-80">
              <a href="#"><i className="fa-brands fa-instagram"></i></a> 
              <a href="#"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#"><i className="fa-brands fa-youtube"></i></a>
              <a href="#"><i className="fa-brands fa-discord"></i></a>
            </div>

            <div className="flex items-center gap-5 mt-2 text-xl opacity-80">
              {/* <a href="#"><i className="fa-brands fa-github"></i></a> */}
              {/* <a href="#"><i className="fa-brands fa-linkedin"></i></a> */}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center mt-10 opacity-70 text-sm">
          © 2022 - 2025 Cryptoin.com. All rights reserved
        </div>
      </footer>


    </main>
  )
}

export default App;