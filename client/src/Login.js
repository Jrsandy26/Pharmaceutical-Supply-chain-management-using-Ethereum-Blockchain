import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "./assets/animations/medload.json";
import galaxyVideo from "./assets/galaxy.mp4";
import encryptionBg from "./assets/encryption-bg.webm";

const containerStyle = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  zIndex: 10,
};

const formStyle = {
  width: "90%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  padding: "30px",
  background: "transparent", // ← fully transparent
  borderRadius: "15px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)", // optional subtle shadow for visibility
  alignItems: "center",
  position: "relative",
  zIndex: 20,
};

const logoStyle = {
  width: "80px",
  height: "80px",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid rgba(255, 255, 255, 0.5)", // transparent border
  borderRadius: "5px",
  fontSize: "16px",
  background: "transparent", // transparent background
  color: "white", // white text color
};

const buttonStyle = {
  background: "#8a2be2", // violet color
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "5px",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  transition: "0.4s ease-in-out",
};

const headingStyle = {
  color: "#fff",
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "20px",
  textShadow: "0 1px 3px rgba(0,0,0,0.8)"
};

const textStyle = {
  color: "#b49bff", // Soft color for the text
  fontSize: "16px",
  fontStyle: "italic",
  marginBottom: "20px",
  textAlign: "center",
};

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://pharma-backend-z97z.onrender.com/login", { name, password, userID });
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userID", res.data._id);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("userName", res.data.name);

      setTimeout(() => {
        setLoading(false);
        window.location.href =
          res.data.role === "Manufacturer" ? "/manufacturer" :
          res.data.role === "Distributor" ? "/distributor" :
          res.data.role === "Customer" ? "Customer-Home" :
          "/deliverypartner";
      }, 4000);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Login Failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: "#fff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Lottie animationData={loadingAnimation} style={{ width: 100, height: 100 }} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Background Galaxy Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2
        }}
      >
        <source src={galaxyVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Center Overlay Encryption Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.7,
          pointerEvents: "none",
        }}
      >
        <source src={encryptionBg} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Login Form */}
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleLogin}>
          <img src="images/logo.png" alt="Logo" style={logoStyle} />
          <h2 style={headingStyle}>Login</h2>
          
          {/* Additional Text Here */}
          <p style={textStyle}>
            Welcome! Please enter your credentials to access the platform.
          </p>

          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="4-Digit ID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle} disabled={loading}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
