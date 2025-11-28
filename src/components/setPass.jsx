import { useState } from "react";
import imgLogo from "../assets/logoCryptoin.svg";
import iconSecure from "../assets/iconSecure.png";
import iconRobot from "../assets/iconRobot.png";
import iconPredict from "../assets/iconPredict.png";
import { Link } from "react-router-dom";

// Icon SVG untuk eye open dan eye close
const EyeOpen = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeClose = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export default function SetPass() {
  const [showPassword, setShowPassword] = useState({
    create: false,
    recreate: false
  });
  const [passwords, setPasswords] = useState({
    create: "",
    recreate: ""
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <main className="min-h-screen bg-[#0b0a12] text-white flex flex-col items-center py-16">
      
      {/* LOGO + TITLE */}
      <section className="text-center mb-10">
        <img src={imgLogo} alt="logo" className="w-20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-sm opacity-70 mt-2">
          Secure • Private • Powered by AI Predictions
        </p>
      </section>

      {/* CARD SET PASSWORD */}
      <div className="bg-[#1b1723] p-8 w-[90%] max-w-md rounded-2xl border border-white/10 shadow-xl">

        {/* Welcome */}
        <h1 className="text-2xl font-bold mb-3">Set a password</h1>
        <p className="text-sm mb-6 text-gray-300">
          Your previous password has been reset. Please set a new password for your account.
        </p>

        {/* Create Password */}
        <div className="mb-4">
          <label className="text-sm block mb-2">Create Password</label>
          <div className="relative">
            <input
              type={showPassword.create ? "text" : "password"}
              placeholder="Set your new password"
              value={passwords.create}
              onChange={(e) => handlePasswordChange("create", e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg bg-transparent border border-purple-400/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("create")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword.create ? <EyeClose /> : <EyeOpen />}
            </button>
          </div>
        </div>

        {/* Re-create Password */}
        <div className="mb-6">
          <label className="text-sm block mb-2">Re-create Password</label>
          <div className="relative">
            <input
              type={showPassword.recreate ? "text" : "password"}
              placeholder="Confirm your new password"
              value={passwords.recreate}
              onChange={(e) => handlePasswordChange("recreate", e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg bg-transparent border border-purple-400/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("recreate")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword.recreate ? <EyeClose /> : <EyeOpen />}
            </button>
          </div>
        </div>

        {/* Password Match Validation */}
        {passwords.create && passwords.recreate && passwords.create !== passwords.recreate && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg">
            <p className="text-red-400 text-sm">Passwords do not match</p>
          </div>
        )}

        {/* Set Password Button */}
        <Link to="/afterSetPass">
          <button 
            className={`w-full py-3 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-purple-300 hover:from-purple-600 hover:to-purple-400 transition-all duration-300 ${
              passwords.create && passwords.recreate && passwords.create !== passwords.recreate 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-lg hover:shadow-purple-500/25'
            }`}
            disabled={passwords.create && passwords.recreate && passwords.create !== passwords.recreate}
          >
            Set Password
          </button>
        </Link>
      </div>

{/* FOOTER ICONS */}
      <div className="flex gap-10 mt-10 opacity-70 text-center text-xs">
        <div>
          <div className="mx-auto bg-purple-400 rounded-full">
            <img className="p-2" src={iconSecure} alt="" />
          </div>
          Secure
        </div>
        <div>
          <div className="mx-2 bg-purple-400 rounded-full">
            <img className="p-2" src={iconRobot} alt="" />
          </div>
          AI Powered
        </div>
        <div>
          <div className="mx-3 bg-purple-400 rounded-full">
            <img className="p-2" src={iconPredict} alt="" />
          </div>
          Predictions
        </div>
      </div>
    </main>
  );
}