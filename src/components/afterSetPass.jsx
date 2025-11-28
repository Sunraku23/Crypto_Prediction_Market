import imgLogo from "../assets/logoCryptoin.svg"
import iconSecure from "../assets/iconSecure.png"
import iconRobot from "../assets/iconRobot.png"
import iconPredict from "../assets/iconPredict.png"

import { Link } from "react-router-dom";

export default AfterSetPass;

function AfterSetPass(){
    return(
<main className="min-h-screen bg-[#0b0a12] text-white flex flex-col items-center py-16">
              
              {/* LOGO + TITLE */}
              <section className="text-center mb-10">
                <img src={imgLogo} alt="logo" className="w-20 mx-auto mb-4" />
                <h1 className="text-3xl font-bold">Password Updated!</h1>
                <p className="text-sm opacity-70 mt-2">
                  Secure • Private • Powered by AI Predictions
                </p>
              </section>
        
              {/* */}
              <div className="bg-[#1b1723] p-8 w-[90%] max-w-md rounded-2xl border border-white/10 shadow-xl">

                {/* OPTION 1: Success Focused */}
                <h1 className="text-2xl font-bold mb-3 text-center">Password Successfully Reset! </h1>
                <p className="text-sm mb-6 text-gray-300 text-center">
                    Your account is now secured with a new password. You can safely log in with your new credentials.
                </p>

                {/* Back Login */}
                <Link className="block" to="/login">
                    <button className="w-full py-3 rounded-lg font-semibold text-center 
                        border border-white-600 hover:border-purple-500 transition">
                        Back To Login
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
    )
}