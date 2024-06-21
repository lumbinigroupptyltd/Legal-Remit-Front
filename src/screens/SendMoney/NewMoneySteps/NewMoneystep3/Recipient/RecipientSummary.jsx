import React, { useEffect } from "react";
import RecipientBankDetails from "./RecipientBankDetails";
import RecipientContactDetails from "./RecipientContactDetails";
import { recipientSummaryForm } from "../../../../../forms/sendmoney/recipient/recipientForm";
import { Box, Button, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { CButton } from "../../../../../components/MaterialUI/CButton";

const RecipientSummary = ({ onFormValidate, onClose, method }) => {
  const theme = useTheme();
  const { recipientBank, recipientContact } = useSelector(
    (state) => state.sendMoney
  );
  const data = { ...recipientBank, recipientContact };
  const { formik } = recipientSummaryForm(onClose, data);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  useEffect(() => {}, [recipientBank, recipientContact]);

  return (
    <Box sx={{ height: "65vh", overflowY: "scroll" }}>
      <RecipientBankDetails
        onFormValidate={onFormValidate}
        method={method}
        data={data}
      />
      <RecipientContactDetails onFormValidate={onFormValidate} data={data} />
      <Button
        onClick={handleFormSubmit}
        variant={"contained"}
        sx={{
          marginTop: "1.6rem",
          padding: "0.5rem 3rem",
          borderRadius: "24px",
          fontSize: "1rem",
          width: "100%",
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default RecipientSummary;
