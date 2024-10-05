// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressFileUpload = require("express-fileupload");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;
const FrontendConnection = process.env.FRONTEND;

// Database and Cloudinary configurations
const dbConnection = require("./config/MongoDb");
const cloudinary = require("./config/Cloudinary.config");

// Routers
const blogRouter = require("./Routes/Blog.Routes");
const { process } = require("ipaddr.js");

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration to allow frontend connection
app.use(
  cors({
    origin: FrontendConnection,
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

// Basic route for the server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
