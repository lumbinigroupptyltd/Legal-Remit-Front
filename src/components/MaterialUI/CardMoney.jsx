import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const CardMoney = (props) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: props.Display ? props?.Display : "flex",
        flexDirection: props?.Direction ? props?.Direction : "row",
        justifyContent: props?.Justify ? props?.Justify : "center",
        alignItems: props?.Align ? props?.Align : "center",
        borderRadius: props?.Radius ? props?.Radius : "1rem",
        padding: props?.Padding ? props?.Padding : "1rem",
        background: props?.Background ? props?.Background : "",
        gap: props?.Gap ? props?.Gap : "1rem",
      }}
    >
      <Box>
        <img
          width={props?.width ? props?.width : 120}
          src={props?.Image}
          alt="image"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "space-between",
        }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "1.4rem",
            fontWeight: "500",
            color: theme.palette.text.secondary,
          }}
        >
          {props?.Title1}
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "1.4rem",
            fontWeight: "700",
            color: theme.palette.text.primary,
          }}
        >
          {props?.Title2}
        </Typography>
      </Box>
      <Typography>{props?.Icon}</Typography>
    </Stack>
  );
};

export default CardMoney;
