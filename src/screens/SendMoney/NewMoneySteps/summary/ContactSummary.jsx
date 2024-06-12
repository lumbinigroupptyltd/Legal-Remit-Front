import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Person } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import PeopleIcon from "@mui/icons-material/People";

const ContactSummary = () => {
  const theme = useTheme();

  return (
    <>
      <Grid
        item
        md={12}
        sm={12}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.background.main}`,
        }}
      >
        <Typography
          variant="p"
          sx={{
            display: "flex",
            color: theme.palette.background.main,
            fontSize: "1.6rem",
            fontWeight: "500",
          }}
        >
          Recipient Contact Details
        </Typography>
        <CheckCircleOutlineIcon
          sx={{ fontSize: "1.6rem", color: theme.palette.background.main }}
        />
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "-webkit-fill-available",
        }}
      >
        <Box>
          <Typography
            sx={{
              background: theme.palette.primary.light,
              padding: "1rem 2rem",
              borderRadius: "2rem",
            }}
          >
            <LocationOnIcon
              sx={{ fontSize: "1.6rem", color: theme.palette.background.main }}
            />{" "}
            Baneshwor, Kathmandu
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              background: theme.palette.primary.light,
              padding: "1rem 2rem",
              borderRadius: "2rem",
              width: "100%",
            }}
          >
            <SmartphoneIcon
              sx={{ fontSize: "1.6rem", color: theme.palette.background.main }}
            />{" "}
            9861989252
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              background: theme.palette.primary.light,
              padding: "1rem 2rem",
              borderRadius: "2rem",
              width: "100%",
            }}
          >
            <PeopleIcon
              sx={{ fontSize: "1.6rem", color: theme.palette.background.main }}
            />{" "}
            Brother
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default ContactSummary;
