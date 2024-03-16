import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DropCourseForm = () => {
  const [facultyCourses, setFacultyCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Drop Course';
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
          setIsLoading(false);
        } else {
          console.error('Failed to fetch faculty courses');
        }
      }
    } catch (error) {
      console.error('An error occurred while fetching faculty courses', error);
    }
  };

  const handleCourseSelection = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const [courseCode, section] = selectedCourse.split('-');
        const response = await fetch(`http://localhost:8081/admin/dropCourse/${courseCode.trim()}/${section.trim()}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          // Course dropped successfully
          toast.success('Course dropped successfully');
        } else {
          // Failed to drop course
          toast.error('Failed to drop course');
        }
      }
    } catch (error) {
      console.error('An error occurred while dropping the course', error);
    }
  };

  return (
    <div>
      <h1>Drop Course</h1>
      {isLoading ? (
        <p>Loading faculty courses...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Select Course:</label>
            <select value={selectedCourse} onChange={handleCourseSelection}>
              <option value="">-- Select Course --</option>
              {facultyCourses.map((course, index) => (
                <option key={index} value={`${course[1]} - ${course[4]}`}>
                  {course[3]} - {course[1]} - Section: {course[4]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Drop</button>
        </form>
      )}
    </div>
  );
};

export default DropCourseForm;
