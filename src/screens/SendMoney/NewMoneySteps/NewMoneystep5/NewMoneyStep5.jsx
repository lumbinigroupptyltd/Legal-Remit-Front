import React from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { useSendMoneyStep5Form } from "../../../../forms/sendmoney/useSendMoneyForm";
import BankSummary from "./summary/BankSummary";
import ContactSummary from "./summary/ContactSummary";
import PaymentSummary from "./summary/PaymentSummary";

const NewMoneyStep5 = ({ handleNext }) => {
  const theme = useTheme();
  const { formik } = useSendMoneyStep5Form(handleNext);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Grid container spacing={2} sx={{ width: "80%", margin: "0 2rem" }}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="p"
          sx={{
            color: theme.palette.background.main,
            fontSize: "1.8rem",
            fontWeight: "600",
          }}
        >
          Send Money
        </Typography>
        <Typography variant="p">
          Glance at the summary and submit your data for transaction
        </Typography>
      </Grid>

      <BankSummary />
      <ContactSummary />
      <PaymentSummary />

      <Grid
        item
        xs={10}
        sm={10}
        md={10}
        mt={5}
        mb={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleFormSubmit}
          variant={"contained"}
          sx={{ padding: "8px 24px", borderRadius: "24px", fontSize: "1rem" }}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewMoneyStep5;