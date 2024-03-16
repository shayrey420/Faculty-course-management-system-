import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [facultyInitial, setFacultyInitial] = useState('');
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalCourses, setTotalCourse] = useState(0);
  

  useEffect(() => {
    document.title = 'Dashboard';
    // Fetch faculty initial and courses here
    const fetchFacultyData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const response = await fetch('http://localhost:8081/admin/dashboard', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setTotalCredits(data.totalCredits);
            setTotalCourse(data.totalCourses)
            setFacultyInitial(data.initial);
          } else {
            console.error('Failed to fetch faculty data');
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching faculty data', error);
      }
    };

    fetchFacultyData();
  }, []);

  return (
    <div>
      
      <h1>Welcome, {facultyInitial}!</h1>
      <h2>Total Courses: {totalCourses}</h2>
      <h2>Total Credits: {totalCredits}</h2>
      
    </div>
  );
};

export default Dashboard;
