import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Number of blog posts per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${backend_url}api/v2/blog/get-all-blogs`
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((blog) => (
          <div key={blog._id} className="bg-white shadow-md rounded-lg">
            {blog.images && blog.images.length > 0 ? (
              <img
                src={`${backend_url}${blog.images && blog.images[0]}`}
                alt={blog.title}
                className="w-full h-64 object-cover object-center rounded-t-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-t-lg"></div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700 mb-4">
                {blog.content.substring(0, 150)}...
              </p>
              <Link
                to={`/blog/${blog._id}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={blogs.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold mx-1 rounded"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AllBlogs;
