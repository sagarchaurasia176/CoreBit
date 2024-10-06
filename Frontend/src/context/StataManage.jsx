import React, { createContext, useEffect, useState } from "react";
import { authAPI, blogAPI } from "../api/backednToFrontendApi";

import toast from "react-hot-toast";
// create context this is the context global name which
//you can used everywhere
export const ContextCreation = createContext();

// This is the provider
export const StataManage = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const [profile, setProfile] = useState("");
  const [authenticated, isAuth] = useState(false);
  const [components, setComponents] = useState("HomePage");
  const [uniqueBlogBasedUponNewAdminCreated, setAdminBlog] = useState([]);
  // states which give you all api data
  // FetchedBlogGetPostApi
  // It good to fetch the apis
  useEffect(() => {
    // getBlogDetails
    const AdminBlogsCreations = async (id) => {
      const dismis = toast.loading("loading....");
      try {
        // Pass the `id` and `data` as arguments to the `getMyBlogs` function
        const GetMyBlog = await blogAPI.getAdminBlogs(id);
        setAdminBlog(GetMyBlog.data); // Since you're already returning the data, no need for `.data`
        isAuth(true);
      } catch (er) {
        setAdminBlog([]);
        console.log("error from frontend ", er);
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
          const GetMyBlog = await blogAPI.getProfileDetails();
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

    // All blogs
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
    components,
    setComponents,
    loading,
    uniqueBlogBasedUponNewAdminCreated,
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
