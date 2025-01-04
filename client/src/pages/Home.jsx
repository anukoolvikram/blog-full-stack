import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

export const Home = () => {

  const [posts, setPosts]=useState([]);
  const cat=useLocation().search

  useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const res=await axios.get(`/api/posts/${cat}`);
        console.log('all posts');
        console.log(res.data);
        setPosts(res.data)
      }
      catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  
  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className="posts">
        {posts.map(post => (
          <div className="post" key={post.id}>
            <div className="image">
              <img src={`../../public/upload/${post.img}`} alt={post.title} />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
                <p>{getText(post.description)}</p>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
