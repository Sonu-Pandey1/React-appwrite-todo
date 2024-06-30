import { useState, } from 'react';
import './Signup.css';
import { account } from "../appwrite/config"
import { useNavigate } from 'react-router-dom';
// import { Account, ID } from 'appwrite';

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email == "" || formData.name == "" || formData.password == "") {
      alert("fill currect detailes")
    }
    else {
      // console.log('Form submitted:');
      alert("register successfuly now verify email first then try to login .")
      // Handle form submission logic here
      CreateUser();
      setFormData({
        email: "",
        name: "",
        password: ""
      })
      navigate("/login")
      

    }

  };

  const CreateUser = async () => {
    let details = await account.create('unique()', formData.email, formData.password, formData.name)
    let session = await account.createEmailPasswordSession(formData.email,formData.password)
    let link = await account.createVerification('http://localhost:5173/verify');
    // console.log(session)
    // console.log(link)

    // console.log(details)

  }

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup;
