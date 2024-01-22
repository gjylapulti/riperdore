import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import CreateDonation from "../../components/Shop/CreateDonation";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopCreateDonations = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <CreateDonation />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateDonations;
