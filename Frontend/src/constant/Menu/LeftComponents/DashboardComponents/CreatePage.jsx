import React, { useState } from "react";
import toast from "react-hot-toast";
import { blogAPI } from "../../../../api/backednToFrontendApi";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [createBlogPost, setBlogs] = useState({
    category: "",
    title: "",
    About: "",
    UserImage: "",
    photoPreview: "",
  });
  const { title, About, UserImage, photoPreview, category } = createBlogPost;
  const navigate = useNavigate();

  // On change handler
  const OnChangeCreatePost = (e) => {
    const { name, value } = e.target;
    setBlogs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update photo preview
  const ChangePhotoHandlers = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setBlogs((prev) => ({
        ...prev,
        photoPreview: reader.result,
        UserImage: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  // API call with form data
  const PostSubmitToThDb = async () => {
    // Destructure state for easy access
    const toastId = toast.loading("loading.....");
    if (!category || !title || !About || !UserImage) {
      toast.error("Please fill all the fields");
      return;
    }
    // Form data
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("About", About);
    formData.append("UserImage", UserImage);

    try {
      const BlogPostApi = await blogAPI.createBlog(formData);
      console.log("API Response:", BlogPostApi);
      setBlogs(BlogPostApi.data);
      toast.success("post created done")
      navigate("/dashboard");
    } catch (error) {
      setBlogs({
        category: "",
        title: "",
        About: "",
        UserImage: "",
        photoPreview: "",
      });
      console.error("Error:", error);
      toast.error("Post not created");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="m-auto bg-slate-50 text-black h-screen shadow-md">
      <div className="flex items-center ml-[13rem] h-screen justify-center">
        <div className="w-[44rem] shadow-lg rounded-lg p-4 bg-white m-auto">
          <span className="border-b-4 text-black font-medium items-center">
            Create Blog
          </span>

          <form onSubmit={PostSubmitToThDb}>
            <div className="flex p-1.5 overflow-hidden rounded-lg lg:flex-row">
              <div className="mt-4 w-full">
                <p className="font-bold text-black">Category</p>
                <select
                  value={createBlogPost.category}
                  name="category"
                  onChange={OnChangeCreatePost}
                  required
                  className="mt-1 block w-full py-2 px-3 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm sm:text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="DBMS">DBMS</option>
                  <option value="OS">OS</option>
                  <option value="CN">CN</option>
                  <option value="OOPS">OOPS</option>
                </select>
              </div>
            </div>

            <br />
            <div>
              <label className="block text-sm font-bold text-justify text-blue-950">
                Title
              </label>
              <input
                type="text"
                name="title"
                onChange={OnChangeCreatePost}
                value={title}
                required
                placeholder="Enter blog title"
                className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>

            <br />
            <div className="flex justify-center">
              {photoPreview ? (
                <img
                  className="w-32 rounded-2xl"
                  src={photoPreview}
                  alt="Preview"
                />
              ) : (
                <img
                  className="w-12 rounded-2xl"
                  src={UserImage ? `${UserImage}` : "UserImage"}
                  alt="User"
                />
              )}
            </div>

            <div>
              <input
                type="file"
                name="BlogImg"
                onChange={ChangePhotoHandlers}
                required
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              />
            </div>

            <br />
            <div>
              <label className="block text-sm text-black font-bold">
                About blog...
              </label>
              <textarea
                value={About}
                name="About"
                onChange={OnChangeCreatePost}
                required
                placeholder="Lorem..."
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              ></textarea>
              <p className="mt-3 text-xs animate-pulse text-black">
                Thanks for sharing your knowledge
              </p>
            </div>

            <button
              type="submit"
              className="px-6 py-2 w-full font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-slate-900 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
              Click to post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
