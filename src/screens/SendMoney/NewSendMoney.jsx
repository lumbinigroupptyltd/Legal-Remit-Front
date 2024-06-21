import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Step,
  StepButton,
  Stepper,
  useTheme,
} from "@mui/material";
import sendMoneyLogo from "../../assets/images/doc/sendMoneyLogo.png";
// import NewMoneyStep1 from "./NewMoneySteps/NewMoneyStep1/NewMoneyStep1";
import NewMoneyStep2 from "./NewMoneySteps/NewMoneystep2/NewMoneyStep2";
import NewMoneyStep3 from "./NewMoneySteps/NewMoneystep3/NewMoneyStep3";
import NewMoneyStep4 from "./NewMoneySteps/NewMoneystep4/NewMoneyStep4";
import NewMoneyStep5 from "./NewMoneySteps/NewMoneystep5/NewMoneyStep5";
import NewMoneyStep6 from "./NewMoneySteps/NewMoneystep6/NewMoneyStep6";

const steps = [
  // "Country",
  "Calculate",
  "Recipient",
  "Purpose",
  "Summary",
  "Payment",
];

const NewSendMoney = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (values) => {
    setFormData({ ...formData, ...values });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const renderStepContent = (step) => {
    switch (step) {
      // case 0:
      //   return <NewMoneyStep1 handleNext={handleNext} />;
      case 0:
        return <NewMoneyStep2 handleNext={handleNext} />;
      case 1:
        return <NewMoneyStep3 handleNext={handleNext} />;
      case 2:
        return <NewMoneyStep4 handleNext={handleNext} />;
      case 3:
        return <NewMoneyStep5 handleNext={handleNext} />;
      case 4:
        return <NewMoneyStep6 handleNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <Grid container sx={{ margin: "2rem 4rem", width: "90%", height: "80dvh" }}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6rem",
          background: "#fff",
          padding: "2rem 1rem",
          alignItems: "center",
          borderRight: `2px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ width: "fit-content" }}>
          <Stepper
            nonLinear
            activeStep={activeStep}
            sx={{ textWrap: "no-wrap" }}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={activeStep > index}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Stack>
          <img width={320} src={sendMoneyLogo} alt="send-money-logo" />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={6} sx={{ background: "#fff" }}>
        {renderStepContent(activeStep)}
      </Grid>
    </Grid>
  );
};

export default NewSendMoney;
