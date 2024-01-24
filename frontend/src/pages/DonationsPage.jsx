import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import DonationCard from "./../components/Donations/DonationCard";

const DonationsPage = () => {
  const { allDonations, isLoading } = useSelector((state) => state.donations);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allDonations.map((donation, index) => (
            <DonationCard key={index} active={true} data={donation} />
          ))}
        </div>
      )}
    </>
  );
};

export default DonationsPage;
