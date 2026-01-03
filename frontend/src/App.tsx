import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import "./App.css";
import SignIn from "./components/SignIn";

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
