import React from "react";
import {
  Box,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  useTheme,
  Typography,
} from "@mui/material";
import sendMoneyLogo from "../../assets/images/doc/sendMoneyLogo.png";
// import NewMoneyStep1 from "./NewMoneySteps/NewMoneyStep1/NewMoneyStep1";
import NewMoneyStep2 from "./NewMoneySteps/NewMoneystep2/NewMoneyStep2";
import NewMoneyStep3 from "./NewMoneySteps/NewMoneystep3/NewMoneyStep3";
import NewMoneyStep4 from "./NewMoneySteps/NewMoneystep4/NewMoneyStep4";
import NewMoneyStep5 from "./NewMoneySteps/NewMoneystep5/NewMoneyStep5";
import NewMoneyStep6 from "./NewMoneySteps/NewMoneystep6/NewMoneyStep6";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "../../redux/actions";

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
  const dispatch = useDispatch();
  const { activeStep } = useSelector((state) => state.sendMoney);

  const handleNext = (values) => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleStep = (step) => () => {
    if (step <= activeStep) {
      dispatch(setActiveStep(step));
    }
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
    <Grid
      container
      sx={{
        margin: "0 auto",
        width: "90%",
        height: "80dvh",
      }}
    >
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
        <Box sx={{ width: "-webkit-fill-available" }}>
          <Stepper
            nonLinear
            activeStep={activeStep}
            sx={{
              width: "100%",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.primary.main,
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: theme.palette.background.default,
                borderRadius: "3px",
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={activeStep > index}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => {
                    if (completed) {
                      return (
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "3rem",
                              height: "3rem",
                              fontSize: "1.3rem",
                              border: `2px solid ${theme.palette.background.main}`,
                              borderRadius: "50% 50% 50% 0",
                              color: "#fff",
                              background: theme.palette.background.main,
                            }}
                          >
                            {index + 1}
                          </Box>
                          <Typography
                            variant="p"
                            sx={{
                              fontSize: "1rem",
                              fontWeight: "500",
                              color: theme.palette.background.main,
                            }}
                          >
                            {label}
                          </Typography>
                        </Stack>
                      );
                    } else if (active) {
                      return (
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "3rem",
                              height: "3rem",
                              fontSize: "1.3rem",
                              border: `2px solid ${theme.palette.background.main}`,
                              borderRadius: "50% 50% 50% 0",
                              color: "#fff",
                              background: theme.palette.background.main,
                            }}
                          >
                            {index + 1}
                          </Box>
                          <Typography
                            variant="p"
                            sx={{
                              fontSize: "1rem",
                              fontWeight: "500",
                              color: theme.palette.background.main,
                            }}
                          >
                            {label}
                          </Typography>
                        </Stack>
                      );
                    } else {
                      return (
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "3rem",
                              height: "3rem",
                              fontSize: "1.3rem",
                              border: `2px solid ${theme.palette.background.main}`,
                              borderRadius: "50% 50% 50% 0",
                              color: "purple",
                            }}
                          >
                            {index + 1}
                          </Box>
                          <Typography
                            variant="p"
                            sx={{ fontSize: "1rem", fontWeight: "500" }}
                          >
                            {label}
                          </Typography>
                        </Stack>
                      );
                    }
                  }}
                ></StepLabel>
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
