import React from "react";
import styles from "./../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../App.css";

const Categories = () => {
  const navigate = useNavigate();

  const slideSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/?category=${category.title}`);
    window.location.reload();
  };

  return (
    <>
      <div className={`${styles.section} hidden sm:block mt-8`}>
        <div
          className={`branding my-10 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((item, index) => (
              <motion.div
                className="flex items-start"
                key={index}
                whileHover={{ scale: 1.1 }}
              >
                {item.icon}
                <div className="px-3">
                  <h3 className="font-bold  text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm">{item.Description}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="sm:mt-4 slider-container">
          {" "}
          {/* Apply margin top only for small screens */}
          <Slider {...slideSettings}>
            {categoriesData &&
              categoriesData.map((category) => (
                <div
                  className="w-full flex justify-center items-center cursor-pointer overflow-hidden"
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                >
                  <motion.h5
                    className={`text-[18px] leading-[1.3] text-center font-bold`}
                    whileHover={{ color: "#ff4500" }}
                  >
                    {category.title}
                  </motion.h5>
                  <motion.img
                    src={category.image_Url}
                    className="w-full h-[40vh] object-cover p-6"
                    alt="categoryimage"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Categories;
