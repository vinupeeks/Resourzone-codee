import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/DashBoard';
import CustomNavbar from './components/Navbar'; // Ensure the path matches your folder structure
import {jwtDecode} from 'jwt-decode';
import AddJob from './pages/AddJob.jsx';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
          if (window.location.pathname === "/") {
            navigate("/dashboard");
          }
        } else {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  return (
    <div className="container">
      {isLoggedIn && <CustomNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />}
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/add-job" element={isLoggedIn ? <AddJob /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

// Wrapping the App component with the Router here
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
