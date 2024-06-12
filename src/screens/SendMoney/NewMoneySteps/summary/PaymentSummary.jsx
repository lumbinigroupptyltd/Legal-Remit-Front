import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Person } from "@mui/icons-material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

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
          Recipient Payment Method
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
            Recipient Payment Summary
          </Typography>
        </Grid>

        <div
          style={{
            background: theme.palette.primary.light,
            borderRadius: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              background: theme.palette.primary.light,
              padding: "1rem",
              borderRadius: "2rem",
              border: `1px solid ${theme.palette.primary.main}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                background: theme.palette.primary.light,
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography variant="p">
                <Person
                  sx={{
                    fontSize: "2rem",
                    color: theme.palette.background.main,
                  }}
                />
              </Typography>
              <Typography
                variant="p"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: "400" }}>
                  You Send
                </span>
                <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  4342
                </span>
              </Typography>
            </div>
            <div>
              <Typography
                variant="p"
                style={{ fontSize: "1rem", fontWeight: "500" }}
              >
                AUD
              </Typography>
            </div>
          </Box>
          <Box
            sx={{
              background: theme.palette.background.main,
              borderRadius: "2rem",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "500",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            <Typography variant="p">
              Exchange rate: 10 AUD = 879 NPR (Locked for: 08:00AM)
            </Typography>
          </Box>
          <Box
            sx={{
              background: theme.palette.primary.light,
              padding: "1rem",
              borderRadius: "2rem",
              display: "flex",
              alignItems: "center",
              border: `1px solid ${theme.palette.primary.main}`,
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                background: theme.palette.primary.light,
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography variant="p">
                <Person
                  sx={{
                    fontSize: "2rem",
                    color: theme.palette.background.main,
                  }}
                />
              </Typography>
              <Typography
                variant="p"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: "400" }}>
                  They Receive
                </span>
                <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  347853478
                </span>
              </Typography>
            </div>
            <div>
              <Typography
                variant="p"
                style={{ fontSize: "1rem", fontWeight: "500" }}
              >
                NPR
              </Typography>
            </div>
          </Box>
        </div>

        <div style={{ background: theme.palette.primary.light, borderRadius: "2rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.4rem 1rem 0 1rem"
              }}
            >
              <Typography
                variant="p"
                sx={{ fontSize: "1.2rem", fontWeight: "400" }}
              >
                Service Charge :
              </Typography>
              <Typography
                variant="p"
                sx={{ fontSize: "1.2rem", fontWeight: "400" }}
              >
                1 AUD
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.4rem 1rem 0 1rem"
              }}
            >
              <Typography
                variant="p"
                sx={{ fontSize: "1.2rem", fontWeight: "400" }}
              >
                Promocode discount :
              </Typography>
              <Typography
                variant="p"
                sx={{ fontSize: "1.2rem", fontWeight: "400" }}
              >
                -1 AUD
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
              borderRadius: "0 0 2rem 2rem"
            }}
          >
            <Typography variant="p" sx={{color: "#fff"}} >
              Total Payable:
            </Typography>
            <Typography variant="p" sx={{color: "#fff"}} >
              9876 AUD
            </Typography>
          </Box>
        </div>
      </Grid>
    </>
  );
};

export default PaymentSummary;
