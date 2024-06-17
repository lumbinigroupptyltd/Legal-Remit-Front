import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const CardTotalPayable = (props) => {
  const theme = useTheme();

  return (
    <div
      style={{ background: theme.palette.primary.light, borderRadius: "2rem" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.4rem 1rem 0 1rem",
          }}
        >
          <Typography
            variant="p"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            {props?.serviceChargeTitle} :
          </Typography>
          <Typography
            variant="p"
            sx={{ fontSize: "1.3rem", fontWeight: "600" }}
          >
            {props?.serviceCharge} <span  style={{ fontSize: "1rem", fontWeight: "500" }}>AUD</span>
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.4rem 1rem 0 1rem",
          }}
        >
          <Typography
            variant="p"
            sx={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            {props?.discountTitle} :
          </Typography>
          <Typography
            variant="p"
            sx={{ fontSize: "1.3rem", fontWeight: "600" }}
          >
            {props?.discount} <span  style={{ fontSize: "1rem", fontWeight: "500" }}>AUD</span>
          </Typography>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: theme.palette.background.main,
          padding: "0.8rem 1rem",
          borderRadius: "0 0 2rem 2rem",
          color: "#fff",
        }}
      >
        <Typography variant="p" sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
          {props?.totalTitle} :
        </Typography>
        <Typography variant="p"  sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
          {props?.total} <span  style={{ fontSize: "1rem", fontWeight: "500" }}>AUD</span>
        </Typography>
      </Box>
    </div>
  );
};

export default CardTotalPayable;
