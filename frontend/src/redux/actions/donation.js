import axios from "axios";
import { server } from "../../server";

// create donation
export const createdonation = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "donationCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/donation/create-donation`,
      newForm,
      config
    );
    dispatch({
      type: "donationCreateSuccess",
      payload: data.donation,
    });
  } catch (error) {
    dispatch({
      type: "donationCreateFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllDonationsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllDonationsShopRequest",
    });

    console.log("Request sent to server");

    const { data } = await axios.get(
      `${server}/donation/get-all-donations/${id}`
    );

    console.log("Response received from server:", data);

    dispatch({
      type: "getAllDonationsShopSuccess",
      payload: data.donations,
    });
  } catch (error) {
    console.error("Error occurred:", error);

    dispatch({
      type: "getAllDonationsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete donation of a shop
export const deleteDonation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteDonationRequest",
    });

    const { data } = await axios.delete(
      `${server}/donation/delete-shop-donation/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteDonationSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteDonationFailed",
      payload: error.response.data.message,
    });
  }
};

// get all donations
export const getAllDonations = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllDonationsRequest",
    });

    const { data } = await axios.get(`${server}/donation/get-all-donations`);
    dispatch({
      type: "getAllDonationsSuccess",
      payload: data.donations,
    });
  } catch (error) {
    dispatch({
      type: "getAllDonationsFailed",
      payload: error.response.data.message,
    });
  }
};
