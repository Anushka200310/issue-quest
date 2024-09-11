import express from 'express'
import connectDB from './db/connectDb.js';
import authRouter from './routes/authRouter.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import cors  from "cors";
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import path from 'path';

const app = express();
let PORT = 3000;

const __dirname = path.resolve();

const corsOptions = {
    origin : "http://localhost:5173",
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true,
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// middleware to parse JSON data
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use(errorMiddleware);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`The server is running at port no ${PORT}`);
})
})

