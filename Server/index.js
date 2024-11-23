// Import necessary modules
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressFileUpload = require("express-fileupload");
require('dotenv').config()
// Load environment variables

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000


// Database and Cloudinary configurations
const dbConnection = require("./config/MongoDb");
const cloudinary = require("./config/Cloudinary.config");

// Routers
const blogRouter = require("./Routes/Blog.Routes");
// Middleware
app.use(express.json());
app.use(cookieParser());
// CORS configuration to allow frontend connection
app.use(
  cors({
    origin: process.env.FRONTEND,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
   
  })
);



// File upload configuration using express-fileupload
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


// Initialize Cloudinary
cloudinary();

// Establish MongoDB connection
dbConnection();

// Define routes
app.use("/api/v1", blogRouter);

app.post('/' , (req,res)=>{
  res.send("server working fine");
})
app.listen(port , ()=>{
    console.log("port" , port)
})
module.exports = app;