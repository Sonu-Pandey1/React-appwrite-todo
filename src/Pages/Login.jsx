import { useState } from 'react';
import './Login.css';
import { account } from '../appwrite/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Email:', email);
    // console.log('Password:', password);
    // Add your login logic here
    if(email == "" || password == ""){
      alert("wrong email,password")
    }
    else{
      loginUser();
    }
    setEmail("")
    setPassword("")
  };

  const loginUser = async ()=>{
    try {
      const details =await account.createEmailPasswordSession(email,password);
    // console.log(details)
      
    } catch (error) {
      alert("please Verified your email then try to login")
      console.log(error)
      
    }
    navigate("/dashboard")

  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
