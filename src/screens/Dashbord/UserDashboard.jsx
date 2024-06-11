import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import FormModal from "../../components/formModal/FormModal";
import OtpVerification from "../Auth/SignupNew/newSignUp/OTP/OtpVerification";

const UserDashboard = () => {
  const [open, setOpen] = useState(true);

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
        open={open}
        onClose={() => setOpen(false)}
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
