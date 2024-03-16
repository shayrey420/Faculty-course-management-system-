import React, { useEffect, useState } from 'react';
import '../css/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    // Check if the user is logged in (e.g., by checking a token)
    const token = localStorage.getItem('jwtToken'); // Replace 'jwtToken' with your token key

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8081/admin/initial', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Replace 'jwtToken' with your token key
          },
        }); // Replace with your API endpoint to fetch user information
        const data = await response.json();
        const role = data.role; // Extract the role from the server response

        setIsLoggedIn(true);
        setUserRole(role);
      } catch (error) {
        console.error('Failed to fetch user information', error);
      }
    };

    fetchUser();
  }, []);

  if (!isLoggedIn) {
    return null; // Hide the sidebar if the user is not logged in
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <React.Fragment>
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <h1 className="sidebar-title">Menu</h1>
        <ul className="sidebar-list">
          {userRole === 'Admin' && (
            <>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/addCourse">
                  <b>Add Course</b>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/assignCourse">
                  <b>Assign Course</b>
                </Link>
              </li>
            </>
          )}
          {userRole === 'Faculty' && (
            <>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/myCourse">
                  <b>My Courses</b>
                </Link>
              </li>
              
          
          <li className="sidebar-item">
          <Link className="sidebar-link" to="/dropCourse">
                  <b>Drop Course</b>
                </Link>
          </li>
          </>
          )}
        </ul>
      </div>
      <div className="sidebar-toggle" onClick={toggleSidebar}></div>
    </React.Fragment>
  );
};

export default Sidebar;
