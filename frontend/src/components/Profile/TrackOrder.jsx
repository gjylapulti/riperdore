import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import Lottie from "lottie-react";
import animationData from "../../Assets/animations/processingorder.json";
import transferedAnimationData from "../../Assets/animations/transferedtodelivery.json";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <>
        {data && data.status === "Processing" ? (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "300px",
                height: "300px",
                margin: "auto",
                marginBottom: "20px",
              }}
            >
              <Lottie animationData={animationData} loop autoplay />
            </div>
            <h1 className="text-[20px] font-bold">
              Your Order is currently being processed.
            </h1>
          </div>
        ) : data?.status === "Transferred to delivery partner" ? (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "300px",
                height: "300px",
                margin: "auto",
                marginBottom: "50px",
              }}
            >
              <Lottie animationData={transferedAnimationData} loop autoplay />
            </div>
            <h1 className="text-[20px] font-bold">
              Your Order is transfered to our Delivery Partner.
            </h1>
          </div>
        ) : data?.status === "Shipping" ? (
          <h1 className="text-[20px]">
            Your Order is transfered to our Delivery Partner.
          </h1>
        ) : data?.status === "Received" ? (
          <h1 className="text-[20px]">
            Your Order is currently in your city and will be shipped shortly.
          </h1>
        ) : data?.status === "On the way" ? (
          <h1 className="text-[20px]">
            Your Order is on the way, expect it today from 9:00 AM to 7:00 PM.
          </h1>
        ) : data?.status === "Delivered" ? (
          <h1 className="text-[20px]">
            Your order is Delivered. Thank you for choosing us!
          </h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
