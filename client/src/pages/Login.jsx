import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export const Login = () => {
  const [inputs, setInputs]=useState({
    username:"",
    password:""
  });
  const [err, setError]=useState(null);
  const navigate=useNavigate();

  const {login}=useContext(AuthContext);

  const handleSubmit= async (e)=>{
    // console.log(inputs);
    e.preventDefault()
    try{
      await login(inputs);
      navigate('/');
    }
    catch(err){
      setError(err.response.data);
      console.log(err);
    }
  };

  const handleChange=(e)=>{
    setInputs(prev=>({...prev, [e.target.name]:[e.target.value]}));
  }

  return (
    <div className='auth'>
        <h1>Login</h1>
        <form action="">
            <input required type="text" name='username' placeholder='username' onChange={handleChange}/>
            <input required type="password" name='password' placeholder='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>Don't have an account? <Link to="/register">Register</Link> </span>
        </form>
    </div>
  );
}
