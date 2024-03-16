import React, { useState, useEffect } from 'react';
import '../css/Header.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isSidebarVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initial, setInitial] = useState('');

  useEffect(() => {
    // Check if the user is already logged in (e.g., by checking the JWT token)
    const token = localStorage.getItem('jwtToken'); // Replace 'jwtToken' with your token key
    console.log(token)
    if (token) {
      setIsLoggedIn(true);
      // Fetch the initial for the logged-in user and update the 'initial' state
      fetchInitial();
    }
  }, []);

  const handleLogout = () => {
    // Perform logout actions (e.g., clear the JWT token)
    localStorage.removeItem('jwtToken'); // Replace 'jwtToken' with your token key
    setIsLoggedIn(false);
    setInitial('');
    navigate('/login');
    
    window.location.reload();
  };

  const fetchInitial = async () => {
    // Make an API call to fetch the initial for the logged-in user
    try {
      const response = await fetch('http://localhost:8081/admin/initial', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Replace 'jwtToken' with your token key
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setInitial(data.initial);
      } else {
        // Handle error
        console.error('Failed to fetch initial');
      }
    } catch (error) {
      // Handle error
      console.error('An error occurred during initial fetch', error);
    }
  };
  

  return (
    <nav className="navbar">
      <h1 className="navbar-title">
      <Link to="/" className="navbar-link">
      Course Management
          </Link>
        </h1>
      <ul className="navbar-list">
      {isLoggedIn && (
          <>
        <li className="navbar-item">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
        </li>
        </>
      )}
        <li className="navbar-item">
          <Link to="/allCourseInformation" className="navbar-link">
             ALL Course Information
          </Link>
        </li>
        {/* Conditionally render Signup and Login links */}
        {!isLoggedIn && (
          <>
            <li className="navbar-item">
              <Link to="/signup" className="navbar-link">
                Sign Up
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
          </>
        )}
        {/* Render Initial and Logout when logged in */}
        {isLoggedIn && (
          <>
            <li className="navbar-item">
              <span className="navbar-link"><b>{initial}</b></span>
            </li>
            <li className="navbar-item">
              <Link to="/logout" className="navbar-link" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
      {isSidebarVisible && <div className="sidebar">Sidebar Content</div>}
    </nav>
  );
};

export default Header;
