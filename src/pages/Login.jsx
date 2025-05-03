import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", form);
      alert(res.data.msg);
      navigate("/appointments"); // redirect to appointments page
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-400">
        Please sign in
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

      <p className="mt-6 text-sm text-center">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-blue-500 hover:underline font-medium"
        >
          Register here
        </a>
      </p>
    </div>
  );
}

export default Login;
