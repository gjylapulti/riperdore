import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backend_url } from "../../server";
import "./../../../src/App.css";

const SingleBlogpost = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams(); // Get the blog post ID from the URL

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${backend_url}api/v2/blog/get-blog/${id}`
        );
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row">
        {blog.images && blog.images.length > 0 && (
          <img
            src={`${backend_url}${blog.images[0]}`}
            alt={blog.title}
            className="w-full md:w-1/2 h-auto rounded-lg mb-4 md:mr-8 md:mb-0" // Image styles
          />
        )}
        <div className="md:w-1/2">
          {" "}
          {/* Text content container */}
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="text-gray-500 mb-4">
            Published on {new Date(blog.createdAt).toLocaleDateString()} by{" "}
            {blog.author}
          </div>
          <p className="text-lg leading-relaxed mb-4">{blog.content}</p>
          {/* Additional content here */}
        </div>
      </article>
    </div>
  );
};

export default SingleBlogpost;
