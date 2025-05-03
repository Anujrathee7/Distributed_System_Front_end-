import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Appointments() {
  const [username, setUsername] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setError("");
    setHasSearched(true);
    try {
      const res = await axios.get(`http://localhost:8001/appointments/${username}`);
      setAppointments(res.data);
    } catch (err) {
      setAppointments([]);
      setError(err.response?.data?.detail || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Your Appointments</h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Enter Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={fetchAppointments}
            className="flex-1 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Load Appointments
          </button>
          <button
            onClick={() => navigate("/book")}
            className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Book Appointment
          </button>
        </div>

        <div className="mt-6">
          <ul className="space-y-4">
            {appointments.length === 0 && hasSearched ? (
              <li className="text-center text-gray-500">No appointments found.</li>
            ) : (
              appointments.map((a, i) => (
                <li key={i} className="border border-gray-300 rounded-lg p-4 bg-gray-100">
                  <p className="text-lg font-semibold">Dr. {a.doctor}</p>
                  <p className="text-sm text-gray-600">Time: {new Date(a.time).toLocaleString()}</p>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
