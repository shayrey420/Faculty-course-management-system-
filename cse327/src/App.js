import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import { ToastContainer} from 'react-toastify';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FacultyDashboard from './Pages/FacultyDashboard';
import Registration from './Pages/Registration';
import CourseInformation from './Pages/CourseInformation';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CourseForm from './Pages/CourseForm';
import CourseAssignment from './Pages/CourseAssignment';
import FacultyCoursesPage from './Pages/FacultyCoursesPage';
import DropCourseForm from './Pages/DropCourseForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // Check if the user is logged in (e.g., by checking a token)
    const token = localStorage.getItem('jwtToken'); // Replace 'jwtToken' with your token key

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);



  return (
    <div>
      <Router>
        <ToastContainer />
        <Header />
        <Container fluid>
          {isLoggedIn && (
             <Row>
             <Col md={2}>
               {/* Render the Sidebar only for specific routes */}
               <Routes>
                 <Route path="/dashboard/*" element={<Sidebar />} />
                 <Route path="/addCourse" element={<Sidebar />} />
                 <Route path="/assignCourse" element={<Sidebar />} />
                 <Route path="/allCourseInformation" element={<Sidebar />} />
                 <Route path="/myCourse" element={<Sidebar />} />
                 <Route path="/dropCourse" element={<Sidebar />} />
               </Routes>
             </Col>
             <Col md={10}>
               <Routes>
                 <Route path="/" element={<HomePage />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/signup" element={<Registration />} />
                 <Route path="/dashboard" element={<FacultyDashboard />} />
                 <Route path="/logout" element={<Login />} />
                 <Route path="/addCourse" element={<CourseForm />} />
                 <Route path="/assignCourse" element={<CourseAssignment />} />
                 <Route path="/allCourseInformation" element={<CourseInformation />} />
                 <Route path="/myCourse" element={<FacultyCoursesPage />} />
                 <Route path="/dropCourse" element={<DropCourseForm />} />
               </Routes>
             </Col>
           </Row>
          )}
          {!isLoggedIn && (
            <Container fluid>
              <Row>
              <Col md={1}></Col>
              <Col md={11}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Registration />} />
              <Route path="/dashboard" element={<FacultyDashboard />} />
              <Route path="/logout" element={<Login />} />
              <Route path="/addCourse" element={<CourseForm />} />
              <Route path="/assignCourse" element={<CourseAssignment />} />
              <Route path="/allCourseInformation" element={<CourseInformation />} />
            </Routes>
            </Col>
            </Row>
            </Container>
          )}
          {/* <Button color="primary" outline onClick={btnHandle}>
            primary
          </Button> */}
        </Container>
      </Router>
    </div>
  );
}

export default App;
