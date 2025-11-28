import imgLogo from "../assets/logoCryptoin.svg"
import iconSecure from "../assets/iconSecure.png"
import iconRobot from "../assets/iconRobot.png"
import iconPredict from "../assets/iconPredict.png"

import { Link } from "react-router-dom";

export default VerifyCode;

function VerifyCode(){
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
        
              {/* CARD VERIFY CODE */}
              <div className="bg-[#1b1723] p-8 w-[90%] max-w-md rounded-2xl border border-white/10 shadow-xl">

                {/* Welcome */}
                <h1 className="text-2xl font-bold mb-3">Verify Code</h1>
                <p className="tect-sm mb-4">An authenticatiAon code has been sent to your email.</p>

                {/* Email */}
                <label className="text-sm">Code*</label>
                <input
                  type="email"
                  placeholder="Enter your code"
                  className="mt-1 mb-4 w-full px-4 py-3 rounded-lg bg-transparent border border-purple-400/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 outline-none"
                />
        
        
                {/* Sign In */}
                <Link to="/login">
                    <button className="w-full py-3 rounded-lg font-semibold bg-linear-to-r from-purple-500 to-purple-300 hover:from-purple-600 hover:to-purple-400 transition">
                        Submit
                    </button>
                </Link>
                
        
                <p className="text-sm text-purple-400 mt-3 mb-6 cursor-pointer hover:underline">
                  Didn’t receive a code? Resend
                </p>

                {/* Back Login */}
                <Link className="block" to="/login">
                    <button className="w-full py-3 rounded-lg font-semibold text-center 
                        border border-white-600 hover:border-purple-500 transition">
                        Back To Login
                    </button>

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