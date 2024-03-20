import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai"; // Import delete icon
import { backend_url } from "../../server";

const AllBlogposts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3); // Number of blog posts to display per page

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(
          `${backend_url}api/v2/blog/get-all-blogs`
        );
        setBlogPosts(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        console.log("Deleting blog post:", blogId);
        await axios.delete(`${backend_url}api/v2/blog/delete-blog/${blogId}`);
        console.log("Blog post deleted successfully:", blogId);
        // Update state to remove the deleted blog post
        setBlogPosts(blogPosts.filter((blog) => blog._id !== blogId));
      } catch (error) {
        console.error("Error deleting blog post:", error);
      }
    }
  };

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">All Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentPosts.map((blogPost) => (
          <div
            key={blogPost._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {blogPost.images && blogPost.images.length > 0 ? (
              <img
                src={`${backend_url}${blogPost.images && blogPost.images[0]}`}
                alt="Blog Post"
                className="w-full h-48 object-cover object-center"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200" />
            )}

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{blogPost.title}</h3>
              <p className="text-gray-700">
                {blogPost.content.substring(0, 150)}...
              </p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-600">{blogPost.author}</p>
                <p className="text-gray-600">
                  {new Date(blogPost.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <Link to={`/admin/edit-blog/${blogPost._id}`}>
                <button className="flex items-center text-gray-600 hover:text-indigo-500">
                  <AiOutlineEye className="mr-2" />
                  View & Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(blogPost._id)}
                className="text-red-600 hover:text-red-800"
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={blogPosts.length}
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
    <nav>
      <ul className="flex justify-center mt-4">
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

export default AllBlogposts;
