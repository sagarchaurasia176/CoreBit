// Import necessary modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressFileUpload = require("express-fileupload");
const path = require("path");
require('dotenv').config()
// Load environment variables

// Initialize Express app
const app = express();
// Port defined
const port = process.env.PORT || 8000;
console.log("this is port")


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
    allowedHeaders: [
      "Origin",
      "X-Requested-With",   
      "Content-Type",
      "Authorization",
    ],
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

// // Basic route for the server

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"))
// });

// Start the server
app.get('/' , (req,res)=>{
  res.send("core bit backend running ")
  console.log("it works ")
})

app.listen(port, () => {
  console.log(`core bit Server is running on port ${port}`);
});
