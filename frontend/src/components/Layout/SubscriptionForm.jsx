import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "./../../server";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server}/mailsubscriptions/subscribe`, {
        email,
      });
      toast.success("User subscribed successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("User subscribed with email:", email);
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe user. Please try again later.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Failed to subscribe user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#f7cdd1] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#a76a30]">Subscribe </span> to us for news{" "}
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
            value={email} // Bind the input value to the email state
            onChange={(e) => setEmail(e.target.value)} // Update the email state when input changes
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubscriptionForm;
