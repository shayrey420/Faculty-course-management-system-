import React, { useEffect, useState } from 'react';
import '../css/FacultyCoursePage.css';

const FacultyCoursesPage = () => {
  const [facultyCourses, setFacultyCourses] = useState([]);

  useEffect(() => {
    document.title = 'Courses of Faculties';
    fetchFacultyCourses();
  }, []);

  const fetchFacultyCourses = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const response = await fetch('http://localhost:8081/admin/facultyCourses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFacultyCourses(data);
        } else {
          console.error('Failed to fetch faculty courses');
        }
      }
    } catch (error) {
      console.error('An error occurred while fetching faculty courses', error);
    }
  };

  return (
    <div>
      <h1>Faculty Courses</h1>
      <div className="course-card-container">
        {facultyCourses.map((course, index) => (
          <div className="course-card" key={index}>
            <h3>{course[1]}</h3>
            <div className="course-details">
       
              <p><span>Credits:</span> {course[2]}</p>
              <p><span>Section:</span> {course[4]}</p>
              <p><span>Day:</span> {course[7]}</p>
              <p><span>Start Time:</span> {course[5]}</p>
              <p><span>End Time:</span> {course[6]}</p>
              <p><span>Room:</span> {course[8]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyCoursesPage;
