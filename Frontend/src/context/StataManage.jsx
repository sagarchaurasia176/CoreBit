import React, { createContext, useEffect, useState } from "react";
import { authAPI, blogAPI } from "../api/backednToFrontendApi";
console.log(blogAPI, "this is api blog");
//create context there  => its used in all over the states , wherever you used
export const ContextCreation = createContext();
//This is provider
export const StataManage = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState([]);


  //FetchedBlogGetPostApi
  useEffect(() => {
    const fetchBlogApiUrls = async () => {
      try {
        setLoading(true); // Start loading
        const apiFetchedBlogLinks = await blogAPI.getAllBlogs(); // Call the API function
        setBlog(apiFetchedBlogLinks.data);
        console.log(apiFetchedBlogLinks, "data from the states");
      } catch (er) {
        console.log("error form frontend sides", er);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchBlogApiUrls();
  }, []);
  // // 👉Pending the task
  // //create blog
  // useEffect(()=>{
  //   const createBlogs = async()=>{
  //     try{
  //       const CreateBlogApi = await blogAPI.createBlog();
  //       console.log("api resp" , CreateBlogApi);

  //     }catch(er){
  //         console.log("error at craete blogs", er)
  //     }
  //   }

  // },[])

  // Values
  const values = {
    loading,
    setLoading,
    blog,
    setBlog,
  };
  return (
    <ContextCreation.Provider value={values}>
      {children}
    </ContextCreation.Provider>
  );
};
