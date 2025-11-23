import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; 

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
  console.log('Sending:', form);
  try {
    const res = await axios.post('/api/auth/login', form);
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    alert('Login successful!');
    navigate('/dashboard'); 
  } catch (err) {
    alert('Login failed');
    console.error(err);
  }
};
// const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("Token:", token);
    if (token) {
      navigate("/");
    }
  }, []); 


  const goToRegister = () => {
    navigate('/Register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="login-input"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="login-input"
        />
        <button onClick={login} className="login-button">Login</button>

        {token && <p className="login-token">Token: {token}</p>}

        <div className="login-footer">
          <button onClick={goToRegister} className="register-link">
            Not registered? Register here
          </button>
        </div>
        <br />
        <div className="mt-6 text-center bg-gray-100 p-4 rounded-md shadow-sm">
  <h4 className="text- font-semibold text-gray-700 mb-10">Demo Credentials</h4>
  
  <p className="text-sm text-gray-600">
    Email: <span className="font-medium text-gray-800">vaibhavkgupta.2004@gmail.com</span>
  </p>
  <p className="text-sm text-gray-600">
    Password: <span className="font-medium text-gray-800">vvv</span>
  </p>
</div>

      </div>
    </div>
  );
};

export default LoginForm;
