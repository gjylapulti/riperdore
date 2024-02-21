import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "lottie-react";
import animationData from "../Assets/animations/successpink.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  console.log("Animation Data:", animationData);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet", // Change preserveAspectRatio value
    },
  };

  console.log("Default Options:", defaultOptions);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "50vh",
        }}
      >
        <div style={{ width: "300px", height: "300px" }}>
          <Lottie animationData={animationData} options={defaultOptions} />
        </div>
      </div>

      <h5 className="text-center mb-14 text-[25px] text-black font-semibold">
        Order Placed Successfully !
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
