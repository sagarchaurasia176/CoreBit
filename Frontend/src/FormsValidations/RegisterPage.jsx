import React, { useContext, useEffect, useState } from "react";
import contents from "../api/AllContent";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api/backednToFrontendApi";
import toast from "react-hot-toast";
import axios from "axios";
import { ContextCreation } from "../context/StataManage";
// Register page applied here so we get,
const RegisterPage = () => {
  const { setLoading, setProfile, isAuth } = useContext(ContextCreation);

  const moveToLoginPage = useNavigate();
  const moveToLogin = () => {
    moveToLoginPage("/Login");
  };

  // Register page applie here so we get !
  const [registerStates, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    UserImage: "",
    photoPreview: "",
  });

  const ChangeHandlerForFormSubmission = (e) => {
    setRegisterState({
      ...registerStates,
      [e.target.name]: e.target.value,
    });
  };

  // Update photo preview
  const ChangePhotoHandlers = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setRegisterState({
        ...registerStates,
        photoPreview: reader.result,
        UserImage: file,
      });
    };
    reader.readAsDataURL(file);
  };

  // Submit handler with async fix
  const SubmitHandler = async (e) => {
    const toastId = toast.loading("loading.....");
    e.preventDefault();
    const formData = new FormData();
    const { name, email, password, role, UserImage } = registerStates;
    // Basic validation with UserImage check
    if (!name || !email || !password || !role || !UserImage) {
      toast.error("Please fill all the fields, including an image");
      return;
    }
    if (!password) {
      toast.error("invalid password");
    }
    if (!email) {
      toast.error("invalid email");
    }

    // Form Data , an object
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("UserImage", UserImage);
    console.log(registerStates);

    try {
      // Success notification
      const Register = await authAPI.register(formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem(
        "coreBits",
        Register.token
      );

      // Data aptplied there so we get !
      setProfile(Register);
      isAuth(true);
      setLoading(true);
      toast.dismiss(toastId);
      toast.success("Register successfully done!");
      moveToLogin();
      // Error handling
    } catch (er) {
      setLoading(false);
      toast.error("Something went wrong while registering");
      console.error("Error:");

      setRegisterState({
        name: "",
        email: "",
        password: "",
        role: "",
        UserImage: "",
        photoPreview: "",
      });
    }
  };

  return (
    <>
      <div className="">
        <div className="p-1 lg:p-1 h sm:p-3">
          <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg h-[36rem] dark:bg-gray-800 md:flex-row">
            <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
              <div className="px-6 py-6 md:px-8 md:py-0">
                <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
                  Sign Up For{" "}
                  <span className="text-blue-600 dark:text-blue-400 md:text-blue-300">
                    Latest Blog
                  </span>{" "}
                  Updates
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">
                  {contents.para}
                </p>
              </div>
            </div>

            <div className="flex items-center bg-white p-4 justify-center pb-6 md:py-0 md:w-1/2">
              <form onSubmit={SubmitHandler}>
                <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row">
                  <div className="mt-4 w-full">
                    <select
                      name="role"
                      required
                      value={registerStates.role}
                      onChange={ChangeHandlerForFormSubmission}
                      className="mt-1 block w-full py-2 px-3 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm sm:text-sm"
                    >
                      <option value="">Select an option</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>

                <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row">
                  <input
                    className="px-6 py-2 rounded-md w-full text-white bg-white outline-none dark:bg-gray-800 "
                    type="text"
                    required
                    name="name"
                    value={registerStates.name}
                    onChange={ChangeHandlerForFormSubmission}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                  <input
                    className="px-6 py-2 rounded-md w-full  text-white bg-white outline-none dark:bg-gray-800"
                    type="email"
                    name="email"
                    required
                    value={registerStates.email}
                    onChange={ChangeHandlerForFormSubmission}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                  <input
                    className="px-6 py-2 rounded-md w-full  text-white bg-white outline-none dark:bg-gray-800 "
                    type="password"
                    name="password"
                    required
                    value={registerStates.password}
                    onChange={ChangeHandlerForFormSubmission}
                    placeholder="Enter your password"
                  />
                </div>
                <br />

                <div className="flex justify-between">
                  <div>
                    {registerStates.photoPreview ? (
                      <img
                        className="w-12 rounded-2xl"
                        src={registerStates.photoPreview}
                        alt="Preview"
                      />
                    ) : (
                      <img
                        className="w-12 rounded-2xl"
                        src={
                          registerStates.UserImage
                            ? `${registerStates.UserImage}`
                            : "UserImage"
                        }
                        alt="user Image"
                      />
                    )}
                  </div>

                  <div className="text-white">
                    <input
                      type="file"
                      name="file"
                      required
                      onChange={ChangePhotoHandlers}
                      className="px-4 cursor-pointer py-2 rounded-md w-[300px]  text-white outline-none"
                    />
                  </div>
                </div>
                <br />
                <div className="flex items-center justify-center">
                  <span>Already registered?</span>
                  <Link to="/Login">
                    <p className="text-blue-950 underline">Login Now</p>
                  </Link>
                </div>
                <br />
                <div className="px-4 py-1 rounded-md w-[300px]  text-white text-center bg-orange-300 outline-none">
                  <button
                    type="submit"
                    required
                    className="px-6 py-2 font-medium tracking-wide  text-white capitalize transition-colors duration-300 transform"
                  >
                    Click To Register
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
