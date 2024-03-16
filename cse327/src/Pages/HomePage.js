import React from 'react';
import '../css/HomePage.css';
import { useEffect } from 'react';
const HomePage = () => {
  useEffect(() => {
    document.title = 'Course Management'; // Set your desired page title here
  }, []);
  return (
    <div className="home-container">
   

      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="animated-text">Welcome to Course Management System</h1>
          <p className="extra-message">Learn and Build Skill</p>
        </div>
        
      </section>

      <section className="additional-features-section">
        {/* Add your additional features here */}
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>If you have any questions or inquiries, feel free to reach out to us via email or phone.</p>
        <p>Email: mos@gmail.com</p>
        <p>Phone: +880 1792566966</p>
      </section>

      <footer>
        <p>&copy; 2023 Course Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
