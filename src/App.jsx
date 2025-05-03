import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Appointments from './pages/Appointments';
import Register from './pages/Register'; // Added

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl text-center mb-6 text-orange-600">
          Medical Appointment System
        </h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* New Route */}
          <Route path="/book" element={<Booking />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
