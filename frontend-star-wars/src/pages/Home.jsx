import { useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AuthPanel from "../components/AuthPanel";

function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleStart = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  if (isAuthenticated) {
    return <Features />;
  }

  if (showAuth) {
    return <AuthPanel onAuthSuccess={handleAuthSuccess} />;
  }

  return <Hero onStart={handleStart} />;
}

export default Home;