import React from "react";
import RecipientBankDetails from "./RecipientBankDetails";
import RecipientContactDetails from "./RecipientContactDetails";
import { recipientSummaryForm } from "../../../../../forms/sendmoney/recipient/recipientForm";
import { Box, Button } from "@mui/material";

const RecipientSummary = ({ onFormValidate, onClose }) => {
  const { formik } = recipientSummaryForm(onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Box sx={{height: "65vh",overflowY: "scroll"}}>
      <RecipientBankDetails onFormValidate={onFormValidate} />
      <RecipientContactDetails onFormValidate={onFormValidate} />
    </Box>
  );
};

export default RecipientSummary;
