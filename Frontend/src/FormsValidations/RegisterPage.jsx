import React from "react";
import contents from "../api/AllContent";
const RegisterPage = () => {
  return (
    <>
      <div className=" container">
        <div>
          <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg   h-[30rem] dark:bg-gray-800 md:flex-row">
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

            <div className="flex items-center bg-white p-4  justify-center pb-6 md:py-0 md:w-1/2">
              <form>
                {/* Role applied over there so we get */}
                <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row">
                  {/* select options  */}
                  <div className="mt-4 w-full">
                    <select
                      name="topic-select"
                      className="mt-1 block w-full py-2 px-3  bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm  sm:text-sm"
                    >
                      <option value="">Select an option</option>
                      <option value="Admin">Admin</option>
                      <option value="Users">Users</option>
                    </select>
                  </div>
                </div>

                <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row ">
                  <input
                    className="px-6 py-2 rounded-md  w-[300px] sm:  text-white bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row  focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                  <input
                    className="px-6 py-2 rounded-md  w-[300px] sm:  text-white bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row  focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                  <input
                    className="px-6 py-2 rounded-md  w-[300px] sm:  text-white bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                    type="text"
                    name="email"
                    placeholder="Enter your password"
                    aria-label="Enter your email"
                  />
                </div>
                {/* Choose pic */}
                <div className=" ">
                  <div className=" text-white ">
                    <input
                      type="file"
                      className="px-4 cursor-pointer  py-2 rounded-md  w-[300px]  text-black  outline-none  focus:placeholder-transparent dark:focus:placeholder-transparent"
                    />
                  </div>
                </div>
                <br />
                <div className="px-4  py-1 rounded-md  w-[300px]  text-black text-center  bg-orange-300 outline-none  focus:placeholder-transparent dark:focus:placeholder-transparent">
                  <button class="px-6 py-2 font-medium tracking-wide text-black  capitalize transition-colors duration-300 transform  ">
                    Click To Register
                  </button>
                </div>

                <div class="flex items-center my-4">
                  <hr class="flex-grow border-t border-gray-300" />
                  <span class="mx-2 text-gray-600">OR</span>
                  <hr class=" flex-grow border-t border-gray-300" />
                </div>

                {/* googel connections */}
                <div className="px-4  py-1 rounded-md  w-[300px]  text-black text-center  bg-orange-300 outline-none  focus:placeholder-transparent dark:focus:placeholder-transparent">
                  <button class="px-6 py-2 font-medium tracking-wide text-black  capitalize transition-colors duration-300 transform  ">
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
