import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import AllBlogs from "../components/Blog/AllBlogs";

const BlogPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <AllBlogs />
      <Footer />
    </div>
  );
};

export default BlogPage;
