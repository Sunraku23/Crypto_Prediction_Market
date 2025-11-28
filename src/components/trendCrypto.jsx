import React from "react";
import PriceTicker from "./PriceTicker";
import TrendingSection from "./TrendingSection";
import { Link } from "react-router-dom";
import imgLogo from "../assets/logoCryptoin.svg"


export default TrendCrypto;

function TrendCrypto(){

    return(
        <div className="min-h-screen bg-[#0b0a12]">
      <div className="max-w-6xl mx-auto">
        {/* Header (logo centered) */}
        <header className="py-6 flex justify-center">
          <img src={imgLogo} alt="logo" className="w-10 h-10" />
        </header>

        {/* Price ticker */}
        <PriceTicker />

        {/* Main trending */}
        <TrendingSection />
        
      </div>
    </div>
    )
}