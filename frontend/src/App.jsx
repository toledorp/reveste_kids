import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Features from "./pages/Features";
import Characters from "./pages/Characters";
import Films from "./pages/Films";
import Planets from "./pages/Planets";
import Starships from "./pages/Starships";
import Species from "./pages/Species";
import Vehicles from "./pages/Vehicles";

import Feed from "./pages/Feed";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/films" element={<Films />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/starships" element={<Starships />} />
        <Route path="/species" element={<Species />} />
        <Route path="/vehicles" element={<Vehicles />} />

        <Route path="/feed" element={<Feed />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
