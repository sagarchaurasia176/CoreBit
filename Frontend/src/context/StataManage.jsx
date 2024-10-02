import React, { createContext, useEffect, useState } from "react";
import { authAPI, blogAPI } from "../api/backednToFrontendApi";

import toast from "react-hot-toast";
// create context
export const ContextCreation = createContext();
// This is the provider
export const StataManage = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const [profile, setProfile] = useState("");
  const [authenticated, isAuth] = useState(false);
  // FetchedBlogGetPostApi
  useEffect(() => {
    // getBlogDetails
    const AdminBlogsCreations = async () => {
      const dismis = toast.loading("loading....");

      try {
        const GetMyBlog = await blogAPI.getMyBlogs();
        setProfile(GetMyBlog.data);
        // Apply the catch
      } catch (er) {
        setBlog([]);
        console.log("error from frontend in admin profile", er);
      } finally {
        toast.dismiss(dismis);
      }
    };

    // Admin profile
    const AdminProfileDatas = async () => {
      const getTheTokeFromTheLocalStorage = await localStorage.getItem(
        "coreBits"
      );
      console.log(getTheTokeFromTheLocalStorage);
      const dismis = toast.loading("loading....");

      try {
        if (getTheTokeFromTheLocalStorage) {
          const GetMyBlog = await blogAPI.getDetails();
          setProfile(GetMyBlog.data);
          // Apply the catch
        }
      } catch (er) {
        setBlog([]);
        console.log("error from frontend in admin profile", er);
      } finally {
        toast.dismiss(dismis);
      }
    };

    // All blogs so I used here blog states
    const fetchBlogApiUrls = async () => {
      setLoading(true); // Start loading
      try {
        const apiFetchedBlogLinks = await blogAPI.getAllBlogs(); // Call the API function
        setBlog(apiFetchedBlogLinks.data); // Assuming the response has a 'data' field
      } catch (er) {
        console.log("error from frontend side", er);
      } finally {
        setLoading(false); // End loading
      }
    };
    AdminBlogsCreations();
    AdminProfileDatas();
    fetchBlogApiUrls();
  }, []);

  // Values
  const values = {

    loading,
    setLoading,
    blog,
    authenticated,
    isAuth,
    setBlog,
    profile,
    setProfile,
  };
  return (
    <ContextCreation.Provider value={values}>
      {children}
    </ContextCreation.Provider>
  );
};
