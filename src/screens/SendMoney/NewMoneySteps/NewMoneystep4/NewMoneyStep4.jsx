import React from "react";
import { nanoid } from "nanoid";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useSendMoneyStep4Form } from "../../../../forms/sendmoney/useSendMoneyForm";
import RenderInput from "../../../../components/RenderInput/RenderInput";

const inputDataPurpose = [
  {
    id: nanoid(),
    label: "Purpose of transfer",
    name: "purpose",
    type: "dropDown",
    md: 12,
    sm: 12,
    required: true,
    options: [
      {
        id: nanoid(),
        label: "test1",
        name: "test1",
      },
      {
        id: nanoid(),
        label: "test2",
        name: "test2",
      },
      {
        id: nanoid(),
        label: "test3",
        name: "test3",
      },
    ],
  },
  {
    id: nanoid(),
    name: "purpose",
    label: "Type your message here...",
    extraLabel: "Message to receiver",
    type: "text",
    required: true,
    multiline: true,
    extraInfo: true,
    rows: 4,
    md: 12,
    sm: 12,
  },
  {
    id: nanoid(),
    name: "email",
    label: "Email  (optional)",
    type: "text",
    rows: 4,
    md: 12,
    sm: 12,
  },
];

const NewMoneyStep4 = ({ handleNext }) => {
  const theme = useTheme();
  const { formik } = useSendMoneyStep4Form(handleNext);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2rem",
        width: "80%",
        margin: "0 2rem",
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
          justifyContent: "center",
        }}
      >
        <Typography
          variant="p"
          mt={3}
          sx={{
            color: theme.palette.background.main,
            fontSize: "2.2rem",
            fontWeight: "700",
          }}
        >
          Send Money
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#000",
            fontSize: "0.8rem",
            fontWeight: "500",
          }}
        >
          Select Purpose of money transfer and message you want to send to
          recipient.
        </Typography>
      </Grid>
      <Box>
        <RenderInput inputField={inputDataPurpose} formik={formik} />
      </Box>
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

export default NewMoneyStep4;
