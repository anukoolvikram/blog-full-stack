import express from 'express';
import postRoutes from './routes/posts.js'; 
import authRoutes from './routes/auth.js'; 
import userRoutes from './routes/users.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app=express()
app.use(express.json())
app.use(cors()); 
app.use(cookieParser());



// Recreate __dirname using fileURLToPath and import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'client', 'public', 'upload');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), function(req, res){
    const file=req.file;
    return res.status(200).json(file.filename);
});

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.listen(8001, ()=>{
    console.log('connected to db');
});