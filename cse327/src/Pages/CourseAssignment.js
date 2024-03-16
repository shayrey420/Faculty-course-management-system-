import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/CourseAssign.css';

const CourseAssignment = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [section, setSection] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [day, setDay] = useState('');
  const [room, setRoom] = useState('');
  const [initial, setInitial] = useState('');
  const [courseCode, setCode] = useState('');
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    document.title = 'Assign Course';
    // Check if user is logged in
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
    }

    // Fetch courses and faculties
    fetchCourses();
    fetchFaculties();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('http://localhost:8081/admin/Allcourses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };
  
  const fetchFaculties = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('http://localhost:8081/admin/allFaculties', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFaculties(response.data);
    } catch (error) {
      console.error('Failed to fetch faculties:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(
        'http://localhost:8081/admin/assignCourse',
        {
          section,
          start,
          end,
          day,
          room,
          initial,
          courseCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Successful course assignment
        console.log('Course assigned successfully');
        toast.success('Course assigned successfully!', {
          position: toast.POSITION.TOP_CENTER,
          name:'',
          initial:'',
          password:'',
          email:'',
          ext:'',
          room:'',
          mobile:'',
          role:''
        });
      } else {
        // Course assignment failed
        toast.error('Course assignment failed!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error('Error: ' + error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  if (!isLoggedIn) {
    return null; // Render nothing if not logged in
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Course Assignment</h2>
        <form className="card-form" onSubmit={handleSubmit}>
        <select
            className="input-field"
            name="initial"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            required
          >
            <option value="">Select Initial</option>
            {faculties.map((faculty) => (
              <option key={faculty.initial} value={faculty.initial}>
                {faculty.initial}
              </option>
            ))}
          </select>
          <select
            className="input-field"
            name="courseCode"
            value={courseCode}
            onChange={(e) => setCode(e.target.value)}
            required
          >
            <option value="">Select Course Code</option>
            {courses.map((course) => (
              <option key={course.courseCode} value={course.courseCode}>
                {course.courseCode}
              </option>
            ))}
          </select>
          
          <select
            className="input-field"
            name="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          >
            <option value="">Select Section</option>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <select
  className="input-field"
  name="start"
  value={start}
  onChange={(e) => setStart(e.target.value)}
  required
>
  <option value="">Select Start Time</option>
  <option value="8:00 AM">8:00 AM</option>
  <option value="9:10 AM">9:10 AM</option>
  <option value="10:20 AM">10:20 AM</option>
  <option value="11:30 AM">11:30 AM</option>
  <option value="12:40 PM">12:40 PM</option>
  <option value="1:50 PM">1:50 PM</option>
  <option value="3:00 PM">3:00 PM</option>
  <option value="4:10 PM">4:10 PM</option>
  {/* Add more options for other start times */}
</select>

<select
  className="input-field"
  name="end"
  value={end}
  onChange={(e) => setEnd(e.target.value)}
  required
>
<option value="">Select End Time</option>
<option value="9:00 AM">9:00 AM</option>
  <option value="10:10 AM">10:10 AM</option>
  <option value="11:20 AM">11:20 AM</option>
  <option value="12:30 AM">12:30 AM</option>
  <option value="1:40 PM">1:40 PM</option>
  <option value="2:50 PM">2:50 PM</option>
  <option value="4:00 PM">4:00 PM</option>
  <option value="5:10 PM">5:10 PM</option>

</select>

<select
  className="input-field"
  name="day"
  value={day}
  onChange={(e) => setDay(e.target.value)}
  required
>
  <option value="">Select Day</option>
  <option value="ST">ST</option>
  <option value="RA">RA</option>
  <option value="MW">MW</option>
  {/* Add more options for other days */}
</select>

          <input
            type="text"
            placeholder="Room"
            className="input-field"
            name="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <button type="submit" className="btn-assign">
            Assign Course
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CourseAssignment;
