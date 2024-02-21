import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import DonationCard from "./DonationCard";

const Donations = () => {
  const { allDonations, isLoading } = useSelector((state) => state.donations);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Current Donations</h1>
          </div>

          <div className="w-full grid">
            <DonationCard data={allDonations && allDonations[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;
