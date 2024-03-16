import React, { useEffect, useState } from 'react';
import '../css/CourseInformation.css'; // Import the custom CSS file

const CourseInformation = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    document.title = 'All course';
    // Fetch the data from your API or data source
    // Update the 'tableData' state with the fetched data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/auth/allCourseInformation');
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="course-information-container">
      
      <table className="table">
        <thead>
          <tr>
            <th>Initial</th>
            <th>Course Code</th>
            <th>Section</th>
            <th>Start</th>
            <th>End</th>
            <th>Day</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>{row[4]}</td>
              <td>{row[5]}</td>
              <td>{row[6]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseInformation;
