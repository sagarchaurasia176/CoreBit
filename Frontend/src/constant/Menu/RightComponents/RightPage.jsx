import React, { useContext } from "react";
import { ContextCreation } from "../../../context/StataManage";
import { FaPen } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { blogAPI } from "../../../api/backednToFrontendApi";
import CreatePage from "../LeftComponents/DashboardComponents/CreatePage";
import { useNavigate } from "react-router-dom";

const RightPage = () => {
  const { uniqueBlogBasedUponNewAdminCreated, blog, setBlog } =
    useContext(ContextCreation);

  // Admin profile
  const DeletePost = async (id) => {
    let dismis = toast.loading("loading....");
    try {
      const DeleteBlog = await blogAPI.deleteBlog(id);
      setBlog((postFilter) => postFilter.filter((data) => data._id !== id));
      console.log(DeleteBlog);
      toast.success("Post Deleted Successfully");
    } catch (er) {
      setBlog([]);
      console.log("error from frontend in admin profile", er);
    } finally {
      toast.dismiss(dismis);
    }
  };

  // Defensive check for empty or undefined blog data
  if (
    !uniqueBlogBasedUponNewAdminCreated ||
    uniqueBlogBasedUponNewAdminCreated.length === 0
  ) {
    return (
      <div className="ml-[13rem] flex justify-center">
        <span className="text-white  text-center text-3xl">
          No blogs available
        </span>
      </div>
    );
  }

  const navaiageteToPostPage = useNavigate();

  // ➡️PENDING 
  const UpdateBlogCard = () => {
    toast.loading('loading...')
    navaiageteToPostPage('/update')
    

  };

  return (
    <div className="ml-[13rem] lg:flex lg:flex-1 lg:flex-grow-0 lg:flex-row md:flex md:flex-wrap sm:flex sm:flex-wrap">
      {uniqueBlogBasedUponNewAdminCreated.map((blogDatas) => (
        <div className="p-2">
          <div className="max-w-sm sm:max-w-md md:max-w-md px-4 py-2 bg-white shadow-md rounded-lg dark:bg-gray-800 mx-auto">
            <div className="mb-4">
              <span className="text-sm sm:text-base font-light text-gray-800 dark:text-gray-400">
                {blogDatas.category}
              </span>
            </div>
            <div className="cursor-pointer">
              <div className="p-6 flex rounded-3xl justify-center">
                <img
                  src={blogDatas.blogImg}
                  className="w-[7rem] mt-[-1rem] h-auto object-cover rounded-lg"
                  alt="Blog"
                />
              </div>
              {/* update delete btn */}
              <div className=" flex items-center  justify-between">
                <div className=" bg-green-400   text-slate-900 p-2 rounded-lg">
                  <button
                    onClick={() => UpdateBlogCard()}
                    className="   float-left p-1"
                  >
                    <span>Update</span>
                  </button>
                  <FaPen />
                </div>
                {/* delete */}
                <div className=" flex text-white text-1xl bg-yellow-500  p-4 rounded-lg">
                  <button
                    onClick={() => {
                      DeletePost(blogDatas._id);
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RightPage;
