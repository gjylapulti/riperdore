import React from "react";
import styles from "./../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="Hero flex justify-end pt-8 pr-7">
      {/* Loading */}
      <div className="Loading">
        <div className="Spiner"></div>
      </div>
      {/* Hero Section */}
      <div className="heroSection sm:w-full  md:w-6/12 h-full flex flex-col items-center justify-start">
        <br />
        <br />
        <h1 className="text-6xl title text-center">
          Discover Vintage
          <br />
          Treasures on Riperdore
        </h1>
        <h3 className="sub-title relative bottom-0  text-3xl">
          Find Unique Pieces
        </h3>
        <p className="py-10 text-center">
          Explore a curated collection of vintage items from various eras and
          styles. From clothing and accessories to home decor and collectibles,
          Riperdore offers a platform for sellers and buyers passionate about
          preserving and celebrating the past.
        </p>
        <button className="py-4 px-9 bg-green-700 rounded-2xl border-none text-lg text-white cursor-pointer">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default Hero;
