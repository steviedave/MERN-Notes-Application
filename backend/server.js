// importing dependencies
import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import connectDB from './config/db.js';

dotenv.config(); //reads the .env file and loads variables to our file

// creating app
const app = express();

// connect DB
connectDB();


// allocating port where app runs on
const PORT = process.env.PORT || 4000;


// middleware - functions that run in between requests and responses
app.use(cors());
app.use(express.json()); // converts requests in JSON to normal JavaScript before they are used


// routes
app.get('/', (req, res) => {
  res.send('API WORKING!');
});


//starting the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
