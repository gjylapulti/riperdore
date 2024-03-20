import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_url } from "../../server";
import { useNavigate } from "react-router-dom";

const EditBlogpost = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [blogPost, setBlogPost] = useState({
    title: "",
    content: "",
    author: "",
    images: [],
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `${backend_url}api/v2/blog/get-blog/${id}`
        );
        const { title, content, author, images } = response.data.blog;
        setBlogPost({ title, content, author, images });
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogPost({
      ...blogPost,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backend_url}api/v2/blog/update-blog/${id}`, blogPost);
      toast.success("Blog post updated successfully!");
      navigate("/admin/all-blog-posts"); // Corrected function name
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-lg py-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-semibold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogPost.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-semibold">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={blogPost.content}
            onChange={handleChange}
            required
            rows={10}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block mb-2 font-semibold">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={blogPost.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 text-white rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlogpost;
