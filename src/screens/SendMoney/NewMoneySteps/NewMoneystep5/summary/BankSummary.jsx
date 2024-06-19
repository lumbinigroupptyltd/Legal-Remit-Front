import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Person } from "@mui/icons-material";

const BankSummary = () => {
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
          Recipient Bank Details
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
            <Person
              sx={{ fontSize: "1.6rem", color: theme.palette.background.main }}
            />{" "}
            Sameer Bhatt
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
            <Person
              sx={{ fontSize: "1.6rem", color: theme.palette.background.main }}
            />{" "}
            Citizen Bank Limited
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
            <Person
              sx={{ fontSize: "1.6rem", color: theme.palette.background.main }}
            />{" "}
            0248938573843894363
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default BankSummary;
