import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper
} from "@mui/material";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import fastDeliveryAnimation from "./assets/animations/fast-delivery.json";
import loadingAnimation from "./assets/animations/loading.json";
import medLoadAnimation from "./assets/animations/medload.json";
import salesIconAnimation from "./assets/animations/sales-icon.json";
import bgGif from "./assets/bg.gif";
import verifiedAnimation from "./assets/animations/verify.json";
import shipmentAnimation from "./assets/animations/shipment.json";
import galaxyVideo from "./assets/galaxy.mp4";
import glob from "./assets/glob.mp4";
import StoreLocator from "./storelocator"; // Import the store locator component

const CustomerHome = () => {
  const [loading, setLoading] = useState(true);

  const defaultOptions = (animationData) => ({
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
            zIndex: 1000,
          }}
        >
          <Box
            component="img"
            src={bgGif}
            alt="Loading animation"
            sx={{
              width: { xs: "80%", sm: "600px", md: "800px", lg: "1024px" },
              maxWidth: "90vw",
              height: "auto",
            }}
          />
        </Box>
      ) : (
        <div style={{ position: "relative", minHeight: "100vh" }}>
          {/* Background Video Container */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -2,
            }}
          >
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
              }}
            >
              <source src={galaxyVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: "absolute",
                top: 0,
                left: 50,
                transform: "translateX(-50%)",
                width: "50%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1,
                opacity: 0.7,
                pointerEvents: "none",
              }}
            >
              <source src={glob} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Scrollable Page Content */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <Box
              sx={{
                py: 6,
                color: "#fff",
                minHeight: "100vh",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Container maxWidth="lg">
                <Box textAlign="center" mb={4}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Box
                      component="img"
                      src="/images/logo.png"
                      alt="MedChain Logo"
                      sx={{ height: 80 }}
                    />
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    👋 Welcome to MedChain
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.8 }}>
                    Your trusted pharmacy on the blockchain.
                  </Typography>
                  <Box mt={3}>
                    <Link to="/customer">
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          background: "#00bcd4",
                          color: "#000",
                          "&:hover": {
                            background: "#1de9b6",
                          },
                        }}
                      >
                        🛍️ Go to Medicine Store
                      </Button>
                    </Link>
                  </Box>
                </Box>

                <Box mb={8}>
                  <Typography variant="h4" textAlign="center" gutterBottom>
                    🏥 Why Choose Us?
                  </Typography>
                  <Grid container spacing={4}>
                    {[{
                      text: "✅ Verified Medicines: Every product is 100% verified and traceable.",
                      anim: verifiedAnimation,
                    }, {
                      text: "🔐 Transparent Tracking: Track your medicine from source to delivery.",
                      anim: shipmentAnimation,
                    }, {
                      text: "🚚 Fast & Secure Delivery: Safe, tamper-proof and quick delivery.",
                      anim: fastDeliveryAnimation,
                    }].map((item, index) => (
                      <Grid key={index} item xs={12} md={4}>
                        <Paper
                          elevation={4}
                          sx={{
                            p: 3,
                            height: "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "16px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                              transform: "translateY(5opx)",
                              boxShadow: "0 8px 24px rgba(0,255,255,0.2)",
                            },
                          }}
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                            sx={{
                              color: "#00ffff",
                              textShadow:
                                "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff",
                            }}
                          >
                            {item.text}
                          </Typography>
                          <Box sx={{ maxWidth: 300, margin: "auto", mt: 2 }}>
                            <Lottie options={defaultOptions(item.anim)} />
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                {[{
                  title: "Our Commitment to You",
                  text: "We’re dedicated to offering genuine, secure, and affordable medicines.",
                  anim: loadingAnimation,
                }, {
                  title: "🌟 Featured Medicine of the Month",
                  text: "Carefully selected based on user feedback and reliability.",
                  anim: medLoadAnimation,
                }, {
                  title: "🎁 Special Offers & Discounts",
                  text: "Don't miss out on exclusive medicine deals.",
                  anim: salesIconAnimation,
                }, {
                  title: "💬 What Our Customers Say",
                  text: `"MedChain has completely changed the way I buy medicine!" – Jack Sparrow\n"The transparency gives me peace of mind." – Tony Stark`,
                  anim: null,
                }].map((section, idx) => (
                  <Box key={idx} textAlign="center" mb={8}>
                    <Typography variant="h4" gutterBottom>
                      {section.title}
                    </Typography>
                    {section.anim && (
                      <Box sx={{ maxWidth: 200, margin: "auto", mt: 2 }}>
                        <Lottie options={defaultOptions(section.anim)} />
                      </Box>
                    )}
                    <Typography
                      variant="body1"
                      color="rgba(255,255,255,0.8)"
                      paragraph
                      sx={{ whiteSpace: "pre-line" }}
                    >
                      {section.text}
                    </Typography>
                  </Box>
                ))}
              </Container>
            </Box>
          </div>
        </div>
      )}
    </>
  );
};
export default CustomerHome;
