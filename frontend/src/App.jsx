import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthPanel from "./components/AuthPanel";
import Feed from "./pages/Feed";
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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/closet" element={<MyCloset />} />
        <Route path="/add-clothing" element={<AddClothing />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
