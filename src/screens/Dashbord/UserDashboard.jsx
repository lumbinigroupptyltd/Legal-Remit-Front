import { Grid, Typography } from "@mui/material";
import React from "react";

const UserDashboard = () => {
  return (
    <>
      <Grid container spacing={2} mt={5}>
        <Grid item sx={{margin: "auto 12rem", textAlign: "center"}}>
          <Typography
            variant="p"
            sx={{ fontSize: "3rem", fontWeight: "600", color: "green" }}
          >
            Welcome To Legal Remit! Thank you for choosing us.....
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default UserDashboard;
