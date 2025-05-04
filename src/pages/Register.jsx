import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/register', form);
            alert(res.data.msg);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl mb-4 font-bold text-center text-orange-600">
                Register
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                >
                    Register
                </button>
                <p className="mt-6 text-sm text-center">
                    Already have an account?{" "}
                    <a
                    href="/login"
                    className="text-blue-500 hover:underline font-medium"
                    >
                    Login here
                    </a>
                </p>
            </form>
            {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
        </div>
    );
}

export default Register;
