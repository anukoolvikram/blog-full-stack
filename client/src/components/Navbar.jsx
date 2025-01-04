import React, { useContext } from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

export const Navbar = () => {
  const {currentUser, logout}=useContext(AuthContext);
  
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to='/'><img src={logo} alt="" /></Link>
        </div>
        <div className="links">
          <Link className='link' to='/?cat=art'>
            <h4>Art</h4>
          </Link>
          <Link className='link' to='/?cat=science'>
            <h4>Science</h4>
            </Link>
          <Link className='link' to='/?cat=technology'>  
            <h4>Technology</h4>
          </Link>
          <Link className='link' to='/?cat=cinema'>  
            <h4>Cinema</h4>
          </Link>
          <Link className='link' to='/?cat=design'>  
            <h4>Design</h4>
          </Link>
          <Link className='link' to='/?cat=food'>  
            <h4>Food</h4>
          </Link>
          <span className='name'>{currentUser?.username}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : (<Link className='link' to='/login'>Login</Link>)} 
          <span className='write'>
            <Link to='/write'>Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
