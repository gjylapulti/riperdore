import React from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import "./../../../src/App.css";

const DonationCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <div
      className={`donationcontainer w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={`${backend_url}${data.images[0]}`}
          alt=""
          className="image-container"
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <br />
        <p>
          <span style={{ fontWeight: "bold" }}>Category: </span>
          {data.category}
        </p>
        <br />
        <p>
          <span style={{ fontWeight: "bold" }}>Condition: </span>
          {data.condition}
        </p>
        <br />
        <p>
          <span style={{ fontWeight: "bold" }}>Price: </span>
          <span className="font-bold text-[20px] text-[green] font-Roboto">
            FREE
          </span>
        </p>

        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
