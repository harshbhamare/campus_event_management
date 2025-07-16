import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />   
            </ProtectedRoute>       
          } />

      </Routes>
    </>
  );
}

export default App;
