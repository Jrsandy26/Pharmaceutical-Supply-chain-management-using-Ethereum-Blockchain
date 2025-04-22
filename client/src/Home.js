import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "./assets/animations/medload.json";
import galaxyVideo from "./assets/galaxy.mp4";
import blackholeVideo from "./assets/blackhole.webm";

function Home() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push(path);
    }, 4000);
  };

  if (loading) {
    return (
      <div className="bg-white h-screen flex items-center justify-center">
        <Lottie animationData={loadingAnimation} style={{ width: 150, height: 150 }} />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src={galaxyVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40 mix-blend-screen -z-10"
      >
        <source src={blackholeVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Overlay Dark Layer for Contrast */}
      <div className="absolute inset-0 bg-black/30 -z-10" />

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-5 relative z-10">

        <img
          src="images/logo.png"
          alt="Logo"
          className="w-24 h-24 object-contain absolute top-5 left-5"
        />

        <button
          onClick={() => handleNavigation("/admin")}
          className="absolute top-5 right-5 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-sm py-2 px-4 rounded-lg transition-all duration-300"
        >
          Admin
        </button>

        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide mb-4 text-white drop-shadow-md">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500" >Pharmaceutical Supply Chain Management </span>
        </h1>

        <div className="max-w-3xl bg-white/10 p-10 rounded-xl shadow-2xl backdrop-blur-md">
          <h3 className="text-lg md:text-xl font-medium mb-6 text-white"> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-200 via-red-300 to-cyan-500" > Secure & Transparent Management using Blockchain</span>
          </h3>

          <h2 className="text-2xl font-semibold mb-2">Login or Register</h2>
          <p className="mb-4 text-sm">(Click below to log in or create an account)</p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={() => handleNavigation("/login")}
              className="bg-gradient-to-r from-blue-800 via-blue-400 to-cyan-400 text-red-600 font-bold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="bg-gradient-to-r from-blue-800 via-blue-400 to-cyan-400 text-red-600 font-bold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
