import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Booking from './pages/Booking';
import Login from "./pages/login";
import Appointments from './pages/Appointments.jsx';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl text-center mb-6">Medical Appointment System</h1>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
