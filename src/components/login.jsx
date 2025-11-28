import imgLogo from "../assets/logoCryptoin.svg"
import iconGoogle from "../assets/iconGoogle.png"
import iconSecure from "../assets/iconSecure.png"
import iconRobot from "../assets/iconRobot.png"
import iconPredict from "../assets/iconPredict.png"
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Handle OAuth callback success - HAPUS bagian ini karena sudah ada di AuthSuccess
  // useEffect(() => {
  //   const token = searchParams.get('token');
  //   const userData = searchParams.get('user');

  //   if (token && userData) {
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('user', userData);
  //     navigate('/dashboard');
  //     return;
  //   }

  //   const error = searchParams.get('error');
  //   if (error) {
  //     alert(`Login failed: ${error}`);
  //   }
  // }, [searchParams, navigate]);

// Handle Google Login
const handleGoogleLogin = () => {
  // Coba kedua URL ini
  const backendURL = 'http://localhost:5000/api/auth/google';
  console.log('Redirecting to:', backendURL);
  window.location.href = backendURL;
};
  // Handle Regular Login
  const handleRegularLogin = async (e) => {
    e.preventDefault();
    
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Save token and user data
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        
        // Redirect to PredictAI page instead of dashboard
        navigate('/trendCrypto');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
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

      {/* CARD LOGIN */}
      <form onSubmit={handleRegularLogin} className="bg-[#1b1723] p-8 w-[90%] max-w-md rounded-2xl border border-white/10 shadow-xl">
        
        {/* Email */}
        <label className="text-sm">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="mt-1 mb-4 w-full px-4 py-3 rounded-lg bg-transparent border border-purple-400/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 outline-none"
          required
        />

        {/* Password */}
        <label className="text-sm">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="mt-1 mb-2 w-full px-4 py-3 rounded-lg bg-transparent border border-purple-400/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 outline-none"
          required
        />

        <Link className="text-sm text-purple-400 cursor-pointer hover:underline" to="/forgetPass">
          <p className="mb-3">Forgot Password?</p>
        </Link>

        {/* Sign In */}
        <button 
          type="submit"
          className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-300 hover:from-purple-600 hover:to-purple-400 transition"
        >
          Sign In
        </button>

        {/* or */}
        <p className="text-center my-4 opacity-60">or</p>

        {/* Google Login */}
        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 border border-purple-400/40 py-3 w-full rounded-lg hover:bg-purple-600/30 transition"
        >
          <img src={iconGoogle} className="w-6" alt="Google" />
          Sign in with Google
        </button>

        <p className="text-center mt-6 text-sm opacity-80">
          Don't have an account?{" "}
          <Link className="text-purple-400 cursor-pointer hover:underline" to="/register">
            Create Account
          </Link>
        </p>
      </form>

      {/* FOOTER ICONS */}
      <div className="flex gap-10 mt-10 opacity-70 text-center text-xs">
        <div>
          <div className="mx-auto bg-purple-400 rounded-full">
            <img className="p-2" src={iconSecure} alt="Secure" />
          </div>
          Secure
        </div>
        <div>
          <div className="mx-2 bg-purple-400 rounded-full">
            <img className="p-2" src={iconRobot} alt="AI Powered" />
          </div>
          AI Powered
        </div>
        <div>
          <div className="mx-3 bg-purple-400 rounded-full">
            <img className="p-2" src={iconPredict} alt="Predictions" />
          </div>
          Predictions
        </div>
      </div>
    </main>
  );
}

export default Login;