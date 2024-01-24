import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteDonation,
  getAllDonationsShop,
} from "../../redux/actions/donation";
import Loader from "../Layout/Loader";

const AllDonations = () => {
  const { donations, isLoading } = useSelector((state) => state.donations);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDonationsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    dispatch(deleteDonation(id));
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Donation Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "condition",
      headerName: "Condition",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const donation_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/donation/${donation_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  // Ensure donations is an array before mapping
  const rows = Array.isArray(donations)
    ? donations.map((donation) => ({
        id: donation._id,
        name: donation.name,
        category: donation.category,
        quantity: donation.quantity,
        condition: donation.condition,
      }))
    : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllDonations;
