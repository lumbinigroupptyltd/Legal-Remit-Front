import React from "react";
import pending from "../assets/images/doc/pending.jpg";
import { Grid, Typography } from "@mui/material";

const PendingStatusComp = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Typography
        variant="p"
        sx={{
          color: "green",
          textTransform: "uppercase",
          fontSize: "3rem",
          fontWeight: "600",
        }}
      >
        Application Pending!
      </Typography>
      <Typography
        variant="p"
        sx={{
          color: "green",
          textTransform: "uppercase",
          fontSize: "2rem",
          fontWeight: "600",
        }}
      >
        <Typography
          variant="p"
          sx={{
            color: "green",
            textTransform: "uppercase",
            fontSize: "3rem",
            fontWeight: "600",
          }}
        >
          Application Pending!
        </Typography>
      </Typography>
      <img width={500} src={pending} alt="img-pending" />
      <Typography
        variant="p"
        sx={{ color: "purple", fontSize: "1.2rem", fontWeight: "400" }}
      >
        Please wait untill your application is verified.... Your application is
        in Pending form.
      </Typography>
    </Grid>
  );
};

export default PendingStatusComp;
