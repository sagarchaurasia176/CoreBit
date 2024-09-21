const express = require("express");
const app = express();
//Middleware only for express instance
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 8000;
const dbConnection = require("./config/MongoDb");
// Routers
const router = require("./Routes/RegisterPage.Routes");
const BlogRouter = require("./Routes/Blog.Routes");
const AdminRouter = require('./Routes/Admin.Routes');
// FileUploader
const expressFileUpload = require("express-fileupload");
//cloudinary
const cloudinary = require("./config/Cloudinary.config");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
// Note that this option available for versions 1.0.0 and newer.
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
//cloudinary setup
cloudinary();
//Dbconnection called here
dbConnection();
//Router for Authentication page
app.use("/api/v1", router);
//Blog router
app.use("/api/v1/blog", BlogRouter);
//Admin Routs
app.use('/api/v1/admin' , AdminRouter);


// Send the msg to the server !
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//Port
app.listen(port, () => {
  console.log(`server run at ${port}`);
});
