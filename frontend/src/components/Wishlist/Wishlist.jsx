import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "./../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 256gb ssd, 8gb ram silver color",
      description: "test",
      price: 999,
    },
    {
      name: "Macbook pro max 256gb ssd, 8gb ram silver color",
      description: "test",
      price: 999,
    },
    {
      name: "Headphones pro max 256gb ssd, 8gb ram silver color",
      description: "test",
      price: 999,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={20} // Adjusted the size to 20
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cartData.length} items
            </h5>
          </div>

          {/* Cart Single Items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => (
                <CartSingleStatic key={index} data={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingleStatic = ({ data }) => {
  const [value] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1
          size={15} // Adjusted the size to 15
          className="cursor-pointer ml-2"
        />
        <img
          src="./logo0.png"
          alt="product"
          className="w-[80px] h-[80px] ml-2 object-contain" // Adjusted the styling
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>

          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            EUR{totalPrice}
          </h4>
        </div>
        <BsCartPlus
          size={25} // Adjusted the size to 25
          className="cursor-pointer"
          title="Add to cart"
        />
      </div>
    </div>
  );
};

export default Wishlist;
