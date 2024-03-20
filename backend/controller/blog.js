const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");
const Blog = require("../model/blog"); // Changed model reference to Blog
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const fs = require("fs");

// Create blog with image
router.post(
  "/create-blog",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);

      const blogData = req.body;
      blogData.images = imageUrls;

      const blog = await Blog.create(blogData);

      res.status(201).json({
        success: true,
        blog,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all blogs with images
router.get("/get-all-blogs", async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

router.delete(
  "/delete-blog/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogId = req.params.id;

      // Retrieve blog post data from the database
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return next(new ErrorHandler("Blog not found with this id!", 404));
      }

      // Log blog post data for debugging
      console.log("Blog post data:", blog);

      // Delete images associated with the blog post
      blog.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          } else {
            console.log("Image deleted:", filename);
          }
        });
      });

      // Delete the blog post from the database
      const deletedBlog = await Blog.findByIdAndDelete(blogId);
      if (!deletedBlog) {
        return next(new ErrorHandler("Blog not found with this id!", 404));
      }

      res.status(200).json({
        success: true,
        message: "Blog post deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-blog/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogId = req.params.id;
      const updatedBlogData = req.body;

      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        updatedBlogData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedBlog) {
        return next(new ErrorHandler("Blog not found with this id!", 404));
      }

      res.status(200).json({
        success: true,
        message: "Blog post updated successfully!",
        blog: updatedBlog,
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get a single blog by ID
router.get(
  "/get-blog/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);

      if (!blog) {
        return next(new ErrorHandler("Blog not found with this id!", 404));
      }

      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
