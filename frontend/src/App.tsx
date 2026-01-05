import "./App.css"
import Background from "./pages/Landing/Background"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12 }}>
        <Link to="/" style={{ marginRight: 12 }}>
          Home
        </Link>
        <Link to="/signin">Sign In</Link>
      </nav>

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Background />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
