import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import EditBlogpost from "../components/Admin/EditBlogpost";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";

const AdminDashboardCreateBlogPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px]">
          <AdminSideBar />
        </div>
        <div className="w-full justify-center flex">
          <EditBlogpost />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCreateBlogPage;
