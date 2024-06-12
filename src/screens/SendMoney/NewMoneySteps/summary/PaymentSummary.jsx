import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Person } from "@mui/icons-material";
import CreditCardIcon from '@mui/icons-material/CreditCard';

const PaymentSummary = () => {
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
          Recipient Payment Details
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
            <CreditCardIcon
              sx={{ fontSize: "1.6rem", color: theme.palette.background.main }}
            />{" "}
            Bank Transfer
          </Typography>
        </Box>

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
            Recipient Payment Details
          </Typography>
        </Grid>

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
            You Send
          </Typography>
          <Typography
            sx={{
              background: theme.palette.primary.light,
              padding: "1rem 2rem",
              borderRadius: "2rem",
              width: "100%",
            }}
          >
            4342 NPR
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
            They Receive
          </Typography>
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
            7654300 NPR
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
            Total Payable:
          </Typography>
          <Typography
            sx={{
              background: theme.palette.primary.light,
              padding: "1rem 2rem",
              borderRadius: "2rem",
              width: "100%",
            }}
          >
            9876 AUD
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default PaymentSummary;
