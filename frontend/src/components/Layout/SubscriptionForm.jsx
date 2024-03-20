import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-dom-confetti";
import { server } from "./../../server";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [confettiActive, setConfettiActive] = useState(false);

  const handleSubmit = async (e) => {
    setConfettiActive(false); // Activate confetti animation

    e.preventDefault();
    try {
      await axios.post(`${server}/mailsubscriptions/subscribe`, {
        email,
      });
      setEmail("");
      setConfettiActive(true); // Activate confetti animation
      toast.success("Thank You For Subscribing to Our Newsletter!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error("Failed to subscribe user. Please try again later.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Failed to subscribe user:", error);
    }
  };

  const confettiConfig = {
    angle: 360,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <div>
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
      {/* Confetti Animation */}
      <Confetti active={confettiActive} config={confettiConfig} />
    </div>
  );
};

export default SubscriptionForm;
