import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ContextCreation } from "../context/StataManage";
import {ClimbingBoxLoader} from 'react-spinners'

const CurrentTopicsPage = () => {
  const { blog, loading } = useContext(ContextCreation);

  return (
    
    <div className="bg-slate-950 text-black text-1xl h-screen items-start capitalize font-bold">
      <div className="flex items-start ml-12">
        <h2 className="font-bold text-white border-b-4 border-white inline-block pb-2">
          Recent Post
        </h2>
      </div>
      {loading ? (
        <ClimbingBoxLoader />
      ) : (
        blog && blog.length === 0 ? (
          <div>
            <h3>No Current Post available</h3>
          </div>
        ) : (
          <Swiper
            className="bg-white rounded-md"
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {blog.map((blogDatas) => (
              <SwiperSlide key={blogDatas.id}>
                <div className="text-white font-medium">
                  <span>{blogDatas.title}</span>
                  <div>
                    <img src={blogDatas.blogImg} alt={blogDatas.title} />
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* pending here ➡️ */}
          </Swiper>
        )
      )}
    </div>
  );
};

export default CurrentTopicsPage;
