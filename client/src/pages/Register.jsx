import React, { useState } from 'react'
import { Link, UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useNavigate } from 'react-router-dom'
import axios from 'axios';

export const Register = () => {
  const [inputs, setInputs]=useState({
    username:"",
    email:"",
    password:""
  });
  const [err, setError]=useState(null);
  const navigate=useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault()
    try{
      console.log('work');
      console.log(inputs);
      const res=await axios.post("/api/auth/register", inputs);
      navigate('/login');
    }
    catch(err){
      setError(err.response.data);
      console.log(err);
    }
  };

  const handleChange=(e)=>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
  }
  return (
    <div className='auth'>
        <h1>Register</h1>
        <form action="">
            <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
            <input required type="email" placeholder='email' name='email' onChange={handleChange}/>
            <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>Have an account? <Link to="/login">Login</Link> </span>
        </form>
    </div>
  )
}
