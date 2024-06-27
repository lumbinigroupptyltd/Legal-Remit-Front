import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormModal from "../../components/formModal/FormModal";
import OtpVerification from "../Auth/SignupNew/newSignUp/OTP/OtpVerification";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/actions";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  useEffect(() => {
    const modalShown = sessionStorage.getItem('modalShown');
    if (!modalShown) {
      dispatch(openModal());
      sessionStorage.setItem('modalShown', 'true');
    }
  }, [dispatch, isModalOpen]);

  return (
    <>
      <Grid container spacing={2} mt={5}>
        <Grid item sx={{ margin: "auto 12rem", textAlign: "center" }}>
          <Typography
            variant="p"
            sx={{ fontSize: "3rem", fontWeight: "600", color: "green" }}
          >
            Welcome To Legal Remit! Thank you for choosing us.....
          </Typography>
        </Grid>
      </Grid>
      <FormModal
        open={isModalOpen}
        onClose={() => dispatch(closeModal())}
        width={700}
        height={"auto"}
        maxHeight={"80vh"}
        header={"SMS Verification"}
        formComponent={
          <>
            <OtpVerification />
          </>
        }
      />
    </>
  );
};

export default UserDashboard;
