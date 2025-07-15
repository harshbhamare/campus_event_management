import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Optional for redirect

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      setMessage(res.data.message || "Login successful!");
      // Example redirect:
      // navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-slate-800 p-8 rounded-md shadow-md w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Login Here</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-pink-200 text-black py-2 rounded-md hover:bg-pink-300 font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-right">
          <Link to="/forgot-password" className="text-blue-300 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {message && (
          <p className={`mt-4 ${message.includes("failed") ? "text-red-400" : "text-green-400"}`}>
            {message}
          </p>
        )}

        <p className="mt-4 text-sm text-right">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-300 hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
