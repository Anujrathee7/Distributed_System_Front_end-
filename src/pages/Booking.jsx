import React, { useState, useEffect } from "react";
import axios from "axios";

function Booking() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctor: "", time: "", patient: "" });
  
  useEffect(() => {
    axios.get("http://localhost:8002/doctors").then(res => setDoctors(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8001/book", form);
    alert(res.data.status);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">Book Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" placeholder="Your Name" onChange={(e) => setForm({...form, patient: e.target.value})} className="input" />
        <select onChange={(e) => setForm({...form, doctor: e.target.value})} className="input">
          <option value="">Choose Doctor</option>
          {doctors.map((doc, i) => <option key={i} value={doc.name}>{doc.name}</option>)}
        </select>
        <input type="datetime-local" onChange={(e) => setForm({...form, time: e.target.value})} className="input" />
        <button type="submit" className="btn">Book</button>
      </form>
    </div>
  );
}

export default Booking;
