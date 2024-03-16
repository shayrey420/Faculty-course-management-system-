import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [initial, setInitial] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Login';
  })
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:8081/auth/login',
        {
          initial,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        // Successful login
        console.log('Login successful');
        const token = response.data.jwtToken;
        console.log(token)
        // Store the token in local storage
        localStorage.setItem('jwtToken', token);
        navigate('/dashboard');
        window.location.reload();
      } else {
        // Incorrect credentials
        setError('Incorrect initial or password');
      }
    } catch (error) {
      // Handle error
      setError('Incorrect initial or password');
    }
  };
  

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">Login Page</h1>
        <form className="card-form" onSubmit={handleLogin}>
          <div className="input-field">
            <label htmlFor="initial">Initial:<br/></label>
            <br/>
            <input
              id="initial"
              type="text"
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <br/>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="btn-login" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
  }  
export default Login;