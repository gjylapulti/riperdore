import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import Header from "./../../components/Layout/Header";

const ShopPreviewPage = () => {
  return (
    <div>
      <Header />
      <div className={`${styles.section} bg-[#f5f5f5]`}>
        <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm  max-h-[90vh]  ">
            <ShopInfo isOwner={false} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
