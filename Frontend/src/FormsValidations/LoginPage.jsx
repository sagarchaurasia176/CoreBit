import React, { useState } from "react";
import Banner from "../assest/img.jpg";
import contents from "../api/AllContent";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authAPI } from "../api/backednToFrontendApi";

// Login page
const LoginPage = () => {
  const moveToDashboardPage = useNavigate();
  const moveToDashboardPageNavigation = () => {
    moveToDashboardPage("/");
  };

  // Login states apply !
  const [LoginStates, setLoginStates] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { email, password, role } = LoginStates;
  // Onchange handler
  const ChangeHandlerForFormSubmission = (e) => {
    e.preventDefault();
    setLoginStates({
      ...LoginStates,
      [e.target.name]: e.target.value,
    });
  };

  const LoginFormSubmission = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("loading....");
    try {
      if (!email || !password || !role) {
        toast.error("Please fill all the fields, including an image");
      }
      if (!email) {
        toast.error("email not valid");
        return;
      }
      if (!password) {
        toast.error("Invalid password");
        return;
      }
      const LoginResponse = await authAPI.login(
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(LoginResponse , "login resp");
      // Check response and handle success or errors accordingly
      if (LoginResponse.success) {
        toast.success("Login successfully done!");
        // Redirect to dashboard or perform further actions
      } else {
        toast.error(LoginResponse.message || "Error while login");
      }

      // Dashboard page pending 👉👉
    } catch (er) {
      toast.error("error while login");
    } finally {
      toast.dismiss(toastId);
    }
  };

  //submit handler call form the backen
  return (
    <div className="relative">
      <section className="text-gray-400 max-h-fit">
        {/* Image for large screens */}
        <div className="relative  blur-sm ">
          <img src={Banner} alt="" className="w-full h-screen object-cover" />
        </div>

        {/* Overlay for the form */}
        <div className="absolute top-0 lg:top-0 p-4 w-full h-full flex items-center justify-center sm:bg-none bg-black  bg-opacity-65 ">
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:w-3/5 lg:w-2/6 w-full">
            <Link
              to="/"
              className="flex items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl text-black font-extrabold">
                CoreBit
              </span>
            </Link>

            {/* some login filed */}
            <form onSubmit={LoginFormSubmission}>
              <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row">
                <div className="mt-4 w-full">
                  <select
                    name="role"
                    value={role}
                    required
                    onChange={ChangeHandlerForFormSubmission}
                    className="mt-1 block w-full py-2 px-3 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm sm:text-sm"
                  >
                    <option value="">Select an option</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  required
                  value={email}
                  onChange={ChangeHandlerForFormSubmission}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  required
                  name="password"
                  onChange={ChangeHandlerForFormSubmission}
                  value={password}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                type="submit"
                className="text-white w-full bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Click To Login
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                If you're new kindly &nbsp;{" "}
                <span className=" text-blue-950 border-3 border-b-2">
                  <Link to="/Register">Click To Register</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
