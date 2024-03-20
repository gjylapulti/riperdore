import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import SingleBlogpost from "./../components/Blog/SingleBlogpost";

const SingleBlogpostPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <SingleBlogpost />
      <Footer />
    </div>
  );
};

export default SingleBlogpostPage;
