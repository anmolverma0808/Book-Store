import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:0808',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

app.get('/',(req,res) => {
    return res.status(200).send("Welcome to BOOK Store.");
})

app.use('/books',bookRoutes)

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("DataBase Connected");
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`)
    })
})
.catch((err) => {
    console.log(err);
})