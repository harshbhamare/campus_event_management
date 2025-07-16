import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "student", 
    email: "",
    password: "",
    otp: "",
  });

  const [step, setStep] = useState(1); // 1 = initial form, 2 = otp input
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProceed = async (e) => {
    e.preventDefault();
    try {
      // Send OTP to email
      const res = await axios.post("http://localhost:3000/auth/send-otp", {
        name: form.name,
        role: form.role,
        email: form.email,
        password: form.password,
      });
      setMessage("OTP sent to your email.");
      setError("");
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to send OTP");
      setMessage("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/register", form, {
        withCredentials: true,
      });
      if (res.data.redirect) {
        navigate(res.data.redirect); // ✅ redirect after success
      }
      setMessage("Registration successful!");
      setError("");
      setForm({ name: "", email: "", password: "", role: "student", otp: "" });
      setStep(1);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-slate-800 p-8 rounded-md shadow-md w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Register Here</h2>

        {step === 1 && (
          <form onSubmit={handleProceed} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none"
              required
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
            >
              <option value="student">Student</option>
              <option value="faculty">Teacher</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-200 text-black py-2 rounded-md hover:bg-pink-300 font-semibold"
            >
              Proceed
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-200 text-black py-2 rounded-md hover:bg-pink-300 font-semibold"
            >
              Register
            </button>
          </form>
        )}

        {/* Messages */}
        {message && <p className="text-green-400 mt-4">{message}</p>}
        {error && <p className="text-red-400 mt-4">{error}</p>}

        {/* Redirect */}
        <p className="mt-4 text-sm text-right">
          Already Registered?{" "}
          <a href="/auth/login" className="text-blue-300 hover:underline">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
