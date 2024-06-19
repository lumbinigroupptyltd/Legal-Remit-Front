import React, { useState } from "react";
import RecipientBankDetails from "./RecipientBankDetails";
import RecipientContactDetails from "./RecipientContactDetails";
import RecipientType from "./RecipientType";
import { Button, Grid, useTheme } from "@mui/material";
import RecipientSummary from "./RecipientSummary";

const Recipient = ({ onClose }) => {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [formValid, setFormValid] = useState(false);

  const handleNextClick = () => {
    if (step === 4) {
      onClose(); // Close the modal directly when step is 4
      return;
    }
    if (formValid) {
      setStep((prevStep) => prevStep + 1);
      setFormValid(false); // Reset formValid for the next step
    }
  };

  const handleBackClick = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleFormValidation = (isValid) => {
    console.log(isValid, "ahjsf");
    setFormValid(isValid);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <RecipientType onFormValidate={handleFormValidation} />;
      case 2:
        return <RecipientBankDetails onFormValidate={handleFormValidation} />;
      case 3:
        return (
          <RecipientContactDetails onFormValidate={handleFormValidation} />
        );
      case 4:
        return (
          <>
            <RecipientSummary
              onFormValidate={handleFormValidation}
              onClose={onClose}
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
          {step === 4 ? "Submit" : "Next"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Recipient;
