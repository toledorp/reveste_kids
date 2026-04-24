import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthPanel from "./components/AuthPanel";
import Feed from "./pages/Feed";
import FeedTikTok from "./pages/FeedTikTok";
import MyCloset from "./pages/MyCloset";
import AddClothing from "./pages/AddClothing";
import Matches from "./pages/Matches";
import ChatTest from "./pages/ChatTest";

function LoginPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/feed" replace />;
  }

  return <AuthPanel onAuthSuccess={() => navigate("/feed")} />;
}

function AppContent() {
  const location = useLocation();

  const pagesWithoutGlobalLayout = [
    "/",
    "/feed",
    "/feed-tiktok",
    "/closet",
    "/add-clothing",
  ];

  const hideGlobalLayout = pagesWithoutGlobalLayout.includes(location.pathname);

  return (
    <>
      {!hideGlobalLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/feed" element={<FeedTikTok />} />
        <Route path="/feed-tiktok" element={<FeedTikTok />} />
        <Route path="/feed-antigo" element={<Feed />} />

        <Route path="/closet" element={<MyCloset />} />
        <Route path="/add-clothing" element={<AddClothing />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/chat-test" element={<ChatTest />} />

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
