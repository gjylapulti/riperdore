import React from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";

const DonationCard = ({ active, data }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-1/2 m-auto">
        <img
          src={`${backend_url}${data.images[0]}`}
          alt={data.name}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4">
        <h2 className={`${styles.productTitle} text-2xl font-semibold mb-2`}>
          {data.name}
        </h2>
        <p className="text-gray-600 mb-4">{data.description}</p>
        <div className="flex flex-col mb-4">
          <p className="text-lg font-semibold">Category: {data.category}</p>
          <p className="text-lg font-semibold">Tags: {data.tags}</p>
          <p className="text-lg font-semibold">Quantity: {data.quantity}</p>
          <p className="text-lg font-semibold">Condition: {data.condition}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
