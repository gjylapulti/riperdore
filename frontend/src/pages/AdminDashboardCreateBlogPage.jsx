import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import CreateBlogpost from "../components/Admin/CreateBlogpost";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";

const AdminDashboardCreateBlogPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px]">
          <AdminSideBar active={7} />
        </div>
        <div className="w-full justify-center flex">
          <CreateBlogpost />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCreateBlogPage;
