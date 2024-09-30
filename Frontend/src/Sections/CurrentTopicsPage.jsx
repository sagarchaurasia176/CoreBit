import React, { useContext } from "react";
import { ContextCreation } from "../context/StataManage";
import { ClimbingBoxLoader } from "react-spinners";
import FeaturedPost from "./Cards/FeaturedPost";
import Carousel from "react-multi-carousel";
import CurrentTopicsCard from "./Cards/CurrentTopicsCard";
import "react-multi-carousel/lib/styles.css";

// Current topics page
const CurrentTopicsPage = () => {
  const { blog, loading } = useContext(ContextCreation);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="bg-slate-950 text-black text-1xl items-start capitalize font-bold">
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
          <h3 className="text-white text-center">No Post available</h3>
        </div>
      ) : (
        <>
          {/* Render the Carousel only once */}
          <Carousel responsive={responsive}>
            {blog.slice(0, 5).map((blogDatas) => (
              <CurrentTopicsCard key={blogDatas?.id} blogDatas={blogDatas} />
            ))}
          </Carousel>
        </>
      )}
      <br />

      {/* Featured Post Section */}
      <div>
        <div className="flex items-start ml-12">
          <h2 className="font-bold text-white border-b-4 border-white inline-block pb-2">
            Category
          </h2>
        </div>
        {/* Featured Posts */}
        <div className="">
          {blog.slice(0, 4).map((featuredData) => (
            <FeaturedPost key={featuredData.id} featuredData={featuredData} />
          ))}
        </div>
      </div>

      <br />
    </div>
  );
};

export default CurrentTopicsPage;
