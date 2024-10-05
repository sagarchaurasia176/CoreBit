import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { ContextCreation } from "../../../../context/StataManage";
import { blogAPI } from "../../../../api/backednToFrontendApi";

const MyProfile = () => {
  const { isAuth, blog, setBlog } = useContext(ContextCreation);

  // API call for user profile
  const apiForUserProfile = async () => {
    let dismis = toast.loading("Processing...");
    try {
      const GetMyBlog = await blogAPI.getProfileDetails();
      setBlog(GetMyBlog.data);
      isAuth(true); // Assuming isAuth is a setter function
    } catch (er) {
      toast.error("Failed to load profile data.");
    } finally {
      toast.dismiss(dismis);
    }
  };

  useEffect(() => {
    apiForUserProfile();
  }, []);

  return (
    <div className="max-w-md m-auto ml-[30rem] lg:ml-[30rem] md:ml-[23rem]  sm:ml-[12rem] mt-[8rem]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-slate-400">
          <img
            className="w-32 h-32 rounded-full mx-auto mt-5"
            src={blog.Image}
            alt="Profile"
          />
        </div>
        <div className="p-1 text-center">
          <h3 className="text-lg  capitalize font-semibold text-gray-800">
            {blog.name || "Loading..."}
          </h3>
        </div>
        <div className="text-center">
          <h3 className="text-lg capitalize font-semibold text-gray-800">
            {blog.email || "Loading..."}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
