import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import AuthPanel from "./components/AuthPanel";
import FeedTikTok from "./pages/FeedTikTok";
import MyCloset from "./pages/MyCloset";
import AddClothing from "./pages/AddClothing";
import Matches from "./pages/Matches";

function LoginPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/feed" replace />;
  }

  return <AuthPanel onAuthSuccess={() => navigate("/feed")} />;
}

function AppContent() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const location = useLocation();

  const pagesWithoutGlobalLayout = [
    "/",
    "/feed",
    "/feed-tiktok",
    "/closet",
    "/add-clothing",
    "/matches",
  ];

  const hideGlobalLayout = pagesWithoutGlobalLayout.includes(location.pathname);

  return (
    <>
      {!hideGlobalLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/feed"
          element={<FeedTikTok theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/feed-tiktok"
          element={<FeedTikTok theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route path="/closet" element={<MyCloset />} />
        <Route path="/add-clothing" element={<AddClothing />} />
        <Route path="/matches" element={<Matches />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideGlobalLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
