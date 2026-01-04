import "./App.css"
import SignIn from "./LeftComponent/SignIn"
import Background from "./LeftComponent/Background"
function App() {
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";

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
