import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ContextCreation } from "../context/StataManage";
import { ClimbingBoxLoader } from "react-spinners";
import CurrentTopicsCard from "./Cards/CurrentTopicsCard";
import FeaturedPost from "./Cards/FeaturedPost";

const CurrentTopicsPage = () => {
  const { blog, loading } = useContext(ContextCreation);
  console.log(blog);
  return (
    <div className="bg-slate-950 text-black text-1xl h-screen items-start capitalize font-bold">
      <div className="flex items-start ml-12">
        <h2 className="font-bold text-white border-b-4 border-white inline-block pb-2">
          Recent Post
        </h2>
      </div>
      <br />

      {loading ? (
        <ClimbingBoxLoader />
      ) : blog && blog.length === 0 ? (
        <div>
          <h3 className=" text-white text-center">No Post available</h3>
        </div>
      ) : (
        <Swiper
          className=" h-[20rem] rounded-md"
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {blog.map((blogDatas) => (
            <SwiperSlide key={blogDatas.id}>
              <CurrentTopicsCard blogDatas={blogDatas} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <br />
      {/* Others componentss */}
      <div>
        <div className="flex items-start ml-12">
          <h2 className="font-bold text-white border-b-4 border-white inline-block pb-2">
            Featured Post
          </h2>
        </div>
        <FeaturedPost />
      </div>
      <br></br>
      {/* pending mobile views */}
    </div>
  );
};

export default CurrentTopicsPage;
