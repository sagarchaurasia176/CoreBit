import React, { createContext, useEffect, useState } from "react";
import {authAPI , blogAPI} from '../api/backednToFrontendApi'

import toast from "react-hot-toast";
// create context
export const ContextCreation = createContext();
// This is the provider
export const StataManage = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const [authenticated, isAuth] = useState(false);

  
  // FetchedBlogGetPostApi
  useEffect(() => {
    const AdminProfileDatas = async () => {
      try {
        // Retrieve the token from cookies
        const tokenVerify = document.cookie
          .split('; ')
          .find(row => row.startsWith('core='))
          ?.split('=')[1];
  
        console.log(tokenVerify);
  
        // Check if the token exists
        if (tokenVerify) {
          // Optionally, decode or verify the token here (e.g., with jwt-decode)
          const profileResponse = await blogAPI.getMyBlogs();
          console.log(profileResponse.data);
          isAuth(true);
          setBlog(profileResponse); // Assuming profileResponse has a 'data' field
          toast.success("token valid");
        } 
      } catch (er) {
        isAuth(false);
        toast.error("You're not authorized admin");
        setBlog([]); // Clear the blog state on error
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
  };
  return (
    <ContextCreation.Provider value={values}>
      {children}
    </ContextCreation.Provider>
  );
};
