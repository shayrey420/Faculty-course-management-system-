import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Registration.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const Registration = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [initial, setInitial] = useState('');
  const [email, setEmail] = useState('');
  const [ext, setExt] = useState('');
  const [room, setRoom] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');


  useEffect(() => {
    document.title = 'Sign Up';
  })
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8081/auth/signup',
        {
          name,
          initial,
          password,
          email,
          ext,
          room,
          mobile,
          role
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Successful signup
        console.log('successful');
        toast.success('Signup successful!', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        // Incorrect credentials
        toast.error('Signup failed!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      // Handle error
      toast.error('Error: ' + error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Faculty Registration</h2>
        <form className="card-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Initial"
            className="input-field"
            name="initial"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8} // Minimum password length of 8 characters
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input-field"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Extension"
            className="input-field"
            name="ext"
            value={ext}
            onChange={(e) => setExt(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room"
            className="input-field"
            name="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile"
            className="input-field"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <select
            className="input-field"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Faculty">Faculty</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" className="btn-register">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
