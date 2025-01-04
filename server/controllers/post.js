import {db} from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getPosts = (req, res)=>{
    const q=req.query.cat 
    ? 'SELECT * FROM posts WHERE cat=?' 
    : 'SELECT * FROM posts';

    db.query(q, [req.query.cat], (err, data)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).json(data);
    });
};



export const getPost = (req, res)=>{
    const q=`SELECT p.id, u.username, p.title, p.description, p.img, u.img AS userImg, cat, date FROM users u JOIN posts p ON u.id = p.user_id WHERE p.id = ?`

    db.query(q, [req.params.id], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
    
}

export const addPost = (req, res)=>{

    const token=req.cookies.access_token;
    if(!token) return res.status(401).json('Not authenticated');

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo)=>{
        if(err) return res.status(403).json('Token is not valid!');
        const q='INSERT INTO posts(title, description, img, cat, date, user_id) VALUES (?)'

        const values=[
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ];

        db.query(q, [values], (err, data)=>{
            if(err) return res.status(500).json(err);
            return res.json('Post has been created!');
        });
    });
}

export const deletePost = (req, res)=>{
    const token=req.cookies.access_token;
    if(!token) return res.status(401).json('Not authenticated');

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo)=>{
        if(err) return res.status(403).json('Token is not valid!');

        const postId=req.params.id
        const q='DELETE FROM posts WHERE id=? AND user_id=?';
        
        db.query(q, [postId, userInfo.id], (err, data)=>{
            if(err) return res.status(403).json('You can delete only your post!');

            return res.json('Post has been deleted!');
        })

    });
}

export const updatePost = (req, res)=>{

    const token=req.cookies.access_token;
    if(!token) return res.status(401).json('Not authenticated');

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo)=>{
        if(err) return res.status(403).json('Token is not valid!');

        const postId=req.params.id;
        const q='UPDATE posts SET title=?, description=?, img=?, cat=? WHERE id=? AND user_id=?'

        const values=[
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ];

        db.query(q, [...values, postId, userInfo.id], (err, data)=>{
            if(err) return res.status(500).json(err);

            return res.json('Post has been updated!');
        });
    });
}