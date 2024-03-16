import React, { useEffect, useState } from 'react';
import '../css/Course.css';
import axios from 'axios';
import {toast } from 'react-toastify';


const CourseForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('');
  const [type, setType] = useState('');
  const [parallelCourseType, setParallelCourseType] = useState('');
  useEffect(() => {
    document.title = 'Course';
    // Check if user is logged in
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);

    }
  }, []);
  if (!isLoggedIn) {
    return null; // Render nothing if not logged in
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token1 = localStorage.getItem('jwtToken');
      const response = await axios.post(
        'http://localhost:8081/admin/addCourse',
        {
          courseCode,
          title,
          credits,
          type,
          parallelCourseType
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token1}`,
          },
        }
      );

      if (response.status === 200) {
        // Successful signup
        console.log('successful');
        toast.success('Course Added', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        // Incorrect credentials
        toast.error('Course Add failed!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      // Handle error
      toast.error('Course Add failed!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
  <div className="container">
      <div className="card">
        <h2 className="card-title">Add Courses</h2>
        <form className="card-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Course Code"
            className="input-field"
            name="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Title"
            className="input-field"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Credits"
            className="input-field"
            name="credits"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type"
            className="input-field"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Parallel Course Type"
            className="input-field"
            name="parallelCourseType"
            value={parallelCourseType}
            onChange={(e) => setParallelCourseType(e.target.value)}
          />
          
          <button type="submit" className="btn-register">Add Course</button>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
