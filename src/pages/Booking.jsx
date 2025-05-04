import React, { useState, useEffect } from "react";
import axios from "axios";

function Booking() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctor: "", time: "", patient: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8002/doctors")
      .then(res => setDoctors(res.data))
      .catch(() => setError("Failed to load doctors"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation before sending request
    if (!form.patient.trim() || !form.doctor || !form.time) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8001/book", form);
      alert(res.data.status || "Appointment booked!");
      setForm({ doctor: "", time: "", patient: "" }); // clear form
    } catch (err) {
      setError("Failed to book appointment");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2 text-orange-600">Book Appointment</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="input w-full"
          value={form.patient}
          required
          onChange={(e) => setForm({ ...form, patient: e.target.value })}
        />

        <select
          className="input w-full"
          value={form.doctor}
          required
          onChange={(e) => setForm({ ...form, doctor: e.target.value })}
        >
          <option value="">Choose Doctor</option>
          {doctors.map((doc, i) => (
            <option key={i} value={doc.name}>{doc.name}</option>
          ))}
        </select>

        <input
          type="datetime-local"
          className="input w-full"
          value={form.time}
          required
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <button type="submit" className="btn bg-green-600 text-white w-full">
          Book
        </button>
        <p className="mt-6 text-sm text-center">
                    Go back to appointments{" "}
                    <a
                    href="/appointments"
                    className="text-blue-500 hover:underline font-medium"
                    >
                    Click here
                    </a>
                </p>
      </form>
    </div>
  );
}

export default Booking;
