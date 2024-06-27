import React, { useState } from "react";
import RecipientBankDetails from "./RecipientBankDetails";
import RecipientContactDetails from "./RecipientContactDetails";
import RecipientType from "./RecipientType";
import { Button, Grid, useTheme } from "@mui/material";
import RecipientSummary from "./RecipientSummary";
import { useSelector } from "react-redux";
import { useGetRecipientDetailsByUserId } from "../../../../../hooks/sendMoney/recipient/useRecipient";

const Recipient = ({ onClose }) => {
  const theme = useTheme();
  const {
    sendMoneyDeliveryMethod,
    sendMoneyPaymentMethod,
    recipientBank,
    recipientContact,
    recipientType,
  } = useSelector((state) => state.sendMoney);
  const { userId } = useSelector((state) => state.auth);
  const { data: getRecipientData } = useGetRecipientDetailsByUserId(userId);

  const [step, setStep] = useState(1);
  const [formValid, setFormValid] = useState(false);
const newData = {recipientBank, recipientType, ...recipientContact};

  const handleNextClick = () => {
    // if (step === 4) {
    //   // onClose();
    //   // return;
    // }
    if (formValid) {
      setStep((prevStep) => prevStep + 1);
      setFormValid(false);
    }
  };

  const handleBackClick = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleFormValidation = (isValid) => {
    setFormValid(isValid);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <RecipientType onFormValidate={handleFormValidation} />;
      case 2:
        return (
          <RecipientBankDetails
            onFormValidate={handleFormValidation}
            method={sendMoneyDeliveryMethod}
            data={recipientBank}
          />
        );
      case 3:
        return (
          <RecipientContactDetails
            onFormValidate={handleFormValidation}
            data={newData}
            userId={userId}
            />
          );
          case 4:
            return (
              <>
            <RecipientSummary
              onFormValidate={handleFormValidation}
              onClose={onClose}
              method={sendMoneyDeliveryMethod}
              userId={userId}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        {renderStepContent(step)}
      </Grid>

      {step === 4 ? (
        <></>
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Button
            onClick={handleBackClick}
            variant={"contained"}
            disabled={step === 1}
            sx={{
              marginTop: "1.6rem",
              padding: "0.5rem 3rem",
              borderRadius: "24px",
              fontSize: "1rem",
            }}
          >
            Back
          </Button>
          <Button
            onClick={handleNextClick}
            variant={"contained"}
            disabled={step === 4 ? formValid : !formValid}
            sx={{
              marginTop: "1.6rem",
              padding: "0.5rem 3rem",
              borderRadius: "24px",
              fontSize: "1rem",
            }}
          >
            Next
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default Recipient;
