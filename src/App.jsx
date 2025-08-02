import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import OtpPage from "./pages/OtpPage";
import MemoryDetails from "./pages/MemoryDetails";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/verify" element={<OtpPage />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memory/:id"
            element={
              <ProtectedRoute>
                <MemoryDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      {/* 🟢 Step 3: Toast container visible globally */}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        pauseOnHover={false}
        draggable
        theme="dark"
      />
    </div>
  );
}

export default App;
