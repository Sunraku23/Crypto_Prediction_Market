import imgLogo from "../assets/logoCryptoin.svg"
import iconGoogle from "../assets/iconGoogle.png"
import iconSecure from "../assets/iconSecure.png"
import iconRobot from "../assets/iconRobot.png"
import iconPredict from "../assets/iconPredict.png"

import { Link } from "react-router-dom";

export default ForgetPass;

function ForgetPass(){
    return(
        <main className="min-h-screen bg-[#0b0a12] text-white flex flex-col items-center py-16">
              
              {/* LOGO + TITLE */}
              <section className="text-center mb-10">
                <img src={imgLogo} alt="logo" className="w-20 mx-auto mb-4" />
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-sm opacity-70 mt-2">
                  Secure • Private • Powered by AI Predictions
                </p>
              </section>
        
              {/* CARD LOGIN */}
              <div className="bg-[#1b1723] p-8 w-[90%] max-w-md rounded-2xl border border-white/10 shadow-xl">

                {/* Welcome */}
                <h1 className="text-2xl font-semibold mb-3">Forget your password?</h1>
                <p className="tect-sm mb-4">Don't worry, happens to all of us, Enter your email below to recover your password</p>

                {/* Email */}
                <label className="text-sm">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 mb-4 w-full px-4 py-3 rounded-lg bg-transparent border border-purple-400/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 outline-none"
                />
        
                <p className="text-sm text-purple-400 mt-1 mb-6 cursor-pointer hover:underline">
                  
                </p>
        
                {/* Sign In */}
                <button className="w-full py-3 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-purple-300 hover:from-purple-600 hover:to-purple-400 transition">
                  Submit
                </button>
        
                {/* or */}
                <p className="text-center my-4 opacity-60">or</p>
        
                {/* Google Login */}
                <button className="flex items-center justify-center gap-3 border border-purple-400/40 py-3 w-full rounded-lg hover:bg-purple-600/30 transition">
                  <img src={iconGoogle} className="w-6" />
                  Sign in with Google
                </button>
                {/* Back Login */}
                <Link className="flex items-center justify-center px-4 py-2 w-full" to = "/login">
                    Back To Login
                </Link>

        
                <p className="text-center mt-6 text-sm opacity-80">
                  Don’t have an account?{" "}
                  <Link className="text-purple-400 cursor-pointer hover:underline" to="/register">
                  Create Account
                  </Link>
                </p>
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
    )
}