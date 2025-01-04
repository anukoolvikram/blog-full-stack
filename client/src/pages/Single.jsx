import React, { useContext, useEffect, useState } from 'react';
import Edit from '../images/edit.png';
import Delete from '../images/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '../components/Menu';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

export const Single = () => {
  const [post, setPost]=useState({});
  const location=useLocation()

  const postId=location.pathname.split("/")[2];
  const {currentUser}=useContext(AuthContext);
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const res=await axios.get(`/api/posts/${postId}`);
        console.log(res.data);
        setPost(res.data);
      }
      catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async()=>{
    try{
      await axios.delete(`/api/posts/${postId}`);
      navigate('/');
    }
    catch(err){
      console.log(err);
    }
  }

  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`../../public/upload/${post[0]?.img}`} alt="" />
        <div className="user">
          {post[0]?.userImg && <img src={post[0]?.userImg} alt="" />}

          <div className="info">
            <span>{post[0]?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {
            currentUser.username===post[0]?.username && (
              <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <img onClick={handleDelete} src={Delete} alt="" />
              </div>
            )}
          
        </div>
        <h1>{post[0]?.title}</h1>
        {getText(post[0]?.description)}

      </div>
      <Menu cat={post[0]?.cat}/>
    </div>
  )
}
