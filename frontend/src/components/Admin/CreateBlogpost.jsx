import React, { useState } from "react";
import axios from "axios";
import { backend_url } from "../../server";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlogpost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(""); // Add author state
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(
        `${backend_url}api/v2/blog/create-blog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      toast.success("Blog post created successfully");

      // Optionally handle success response
    } catch (error) {
      console.error("Error creating blog post:", error);
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
      // Optionally handle error response
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="container mx-auto max-w-lg py-8">
      <h2 className="text-2xl font-semibold mb-4">Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-semibold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block mb-2 font-semibold">
            Images:
          </label>
          <input
            type="file"
            id="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 text-white rounded"
        >
          Create Blog Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlogpost;
