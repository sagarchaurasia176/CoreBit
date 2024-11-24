import React from "react";
import "./App.css";
//Routes
import { Route, Routes, useLocation } from "react-router-dom";
import HeaderNavbar from "./components/HeaderNavbar";
import MainUi from "./components/MainUi";
import About from "./page/AboutPage";
import Contact from "./page/Contact";
import GetAllBlog from "./page/GetAllBlogsPage";
import DashboardPage from "./constant/DashboardPage";
// import MyBlog from "./constant/MyBlog";
import LoginPage from "./FormsValidations/LoginPage";
import RegisterPage from "./FormsValidations/RegisterPage";
import Footer from "./components/FooterBar";
import MyProfile from "./constant/Menu/LeftComponents/DashboardComponents/MyProfile";
import UpdatesBlogPage from "./constant/Menu/Update/UpdatesBlogPage";

const App = () => {
  const location = useLocation();
  const hiddenNavbar = ["/Login", "/Register", "/dashboard"].includes(
    location.pathname
  );
  // update the env

  return (
    <div>
      {!hiddenNavbar && <HeaderNavbar />}
      <div className="">
        <Routes>
          <Route path="/" element={<MainUi />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/Blog" element={<GetAllBlog />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/Blog" element={<GetAllBlog />}></Route>
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/Register" element={<RegisterPage />}></Route>
          {/* <Route path="/updatesBlogPage" element={<UpdatesBlogPage/>}/> */}

        </Routes>
      </div>
      {!hiddenNavbar && <Footer />}
    </div>
  );
};

export default App;
