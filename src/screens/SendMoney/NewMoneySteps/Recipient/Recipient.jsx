import { Box, Button, Grid, Slide, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RecipientBankDetails from "./RecipientBankDetails";
import RecipientContactDetails from "./RecipientContactDetails";

const recipientData = [
  {
    id: nanoid(),
    label: "Send to Individual Account",
    icon: <PersonIcon sx={{ fontSize: "2rem" }} />,
  },
  {
    id: nanoid(),
    label: "Send to Joint Account",
    icon: <PeopleIcon sx={{ fontSize: "2rem" }} />,
  },
  {
    id: nanoid(),
    label: "Send to Business Account",
    icon: <BusinessCenterIcon sx={{ fontSize: "2rem" }} />,
  },
];

const Recipient = ({ onClose }) => {
  const theme = useTheme();
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [step, setStep] = useState(1);
  const [formValid, setFormValid] = useState(false);

  const handleNextClick = () => {
    if (selectedRecipient && formValid) {
      setStep(step + 1);
      setFormValid(false);
    }
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRecipientSelect = (id) => {
    setSelectedRecipient(id);
    setFormValid(true);
  };

  const handleFormValidation = (isValid) => {
    setFormValid(isValid);
  };

  return (
    <>
      <Slide direction="left" in={step === 1} mountOnEnter unmountOnExit>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.background.main,
                fontSize: "3rem",
                fontWeight: "600",
              }}
            >
              Add Recipient
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.2rem", fontWeight: "400" }}
            >
              Select recipient type
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.2rem",
            }}
          >
            {recipientData &&
              recipientData.map((item) => (
                <Box
                  key={item?.id}
                  onClick={() => handleRecipientSelect(item.id)}
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    background: theme.palette.primary.light,
                    padding: "1rem 3rem",
                    borderRadius: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    width: "100%",
                    cursor: "pointer",
                    border:
                      selectedRecipient === item.id
                        ? `2px solid ${theme.palette.primary.main}`
                        : "none",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.background.main }}
                  >
                    {item?.icon}
                  </Typography>
                  <Typography variant="body1">{item?.label}</Typography>
                </Box>
              ))}
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
              disabled={!formValid}
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
        </Grid>
      </Slide>
      <Slide direction="left" in={step === 2} mountOnEnter unmountOnExit>
        <Box sx={{ width: "100%" }}>
          <RecipientBankDetails onFormValidate={handleFormValidation} />
          <Button
            onClick={handleBackClick}
            variant={"contained"}
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
            disabled={!formValid}
            sx={{
              marginTop: "1.6rem",
              padding: "0.5rem 3rem",
              borderRadius: "24px",
              fontSize: "1rem",
            }}
          >
            Next
          </Button>
        </Box>
      </Slide>
      <Slide direction="left" in={step === 3} mountOnEnter unmountOnExit>
        <Box sx={{ width: "100%" }}>
          <RecipientContactDetails
            onFormValidate={handleFormValidation}
            onClose={onClose}
          />
          <Button
            onClick={handleBackClick}
            variant={"contained"}
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
            disabled={!formValid}
            sx={{
              marginTop: "1.6rem",
              padding: "0.5rem 3rem",
              borderRadius: "24px",
              fontSize: "1rem",
            }}
          >
            Submit
          </Button>
        </Box>
      </Slide>
    </>
  );
};

export default Recipient;
