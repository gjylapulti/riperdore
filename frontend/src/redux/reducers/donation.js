import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const donationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("donationCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("donationCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.donation = action.payload;
      state.success = true;
    })
    .addCase("donationCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    .addCase("getAllDonationsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllDonationsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.donations = action.payload;
    })
    .addCase("getAllDonationsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("deleteDonationRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteDonationSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteDonationFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("getAllDonationsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllDonationsSuccess", (state, action) => {
      state.isLoading = false;
      state.allDonations = action.payload;
    })
    .addCase("getAllDonationsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
