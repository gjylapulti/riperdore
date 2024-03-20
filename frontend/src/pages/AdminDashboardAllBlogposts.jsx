import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AllBlogposts from "../components/Admin/AllBlogposts";

const AdminDashboardAllBlogposts = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px]">
          <AdminSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllBlogposts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardAllBlogposts;
