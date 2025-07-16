// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // show loader while verifying
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/verify", {
          withCredentials: true, // Send cookie to backend
        });

        if (res.status === 200) {
          setAuthorized(true);
        } else {
          navigate("/auth/login");
        }
      } catch (err) {
        navigate("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Checking authentication...</p>;

  return authorized ? children : null;
};

export default ProtectedRoute;
