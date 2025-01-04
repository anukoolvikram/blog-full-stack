import {React, useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

export const Write = () => {
  
  const location=useLocation();
  const state = location.state || [{}]; 

  const [value, setValue]=useState(state[0]?.description || '');
  const [title, setTitle]=useState(state[0]?.title ||'');
  const [file, setFile]=useState(null);
  const [cat, setCat]=useState( state[0]?.cat||'');

  const upload=async()=>{
    try {
      const formData=new FormData();
      formData.append('file', file);

      if(file){
        const res=await axios.post('/api/upload', formData);
        return res.data;
      }
      else return null;

    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const imgUrl=await upload();

    try {
      if (state[0]?.id) {
        console.log(title, value, cat, imgUrl);
        await axios.put(`/api/posts/${state[0]?.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : state[0].img,
        });
      } else {
        await axios.post(`/api/posts`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : '',
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
      }
      navigate("/")

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='add'>
        <div className="content">
          <input type="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
          <div className="editorContainer">
            <ReactQuill className='editor' theme='snow' value={value} onChange={setValue}></ReactQuill>
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input type="file" style={{display:'none'}} id='file-input'onChange={e=>setFile(e.target.files[0])} />
            <label className='file' htmlFor="file-input">Upload Image</label>
            <div className="buttons">
              <button>Save Draft</button>
              <button onClick={handleSubmit}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input type="radio" checked={cat==='art'} name='cat' value='art' id='art' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==='science'} name='cat' value='science' id='science' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==='technology'} name='cat' value='technology' id='technology' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==='cinema'} name='cat' value='cinema' id='cinema' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==='design'} name='design' value='design' id='design' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat==='food'} name='food' value='food' id='food' onChange={e=>setCat(e.target.value)}/>
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>

    </div>
  )
}
