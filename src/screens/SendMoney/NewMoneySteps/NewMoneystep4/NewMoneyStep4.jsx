import React from "react";
import { nanoid } from "nanoid";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useSendMoneyStep4Form } from "../../../../forms/sendmoney/useSendMoneyForm";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { useGetPurposeOfTransfer } from "../../../../hooks/sendMoney/transferPurpose/useTransferPurpose";



const NewMoneyStep4 = ({ handleNext }) => {
  const theme = useTheme();
  const { data: purposeOftranferData } = useGetPurposeOfTransfer();
  const { formik } = useSendMoneyStep4Form(handleNext);

  const GET_PURPOSE = purposeOftranferData && purposeOftranferData?.data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const inputDataPurpose = [
    {
      id: nanoid(),
      label: "Purpose of transfer",
      name: "transferPurposeId",
      type: "dropDown",
      md: 12,
      sm: 12,
      required: true,
      options: GET_PURPOSE,
    },
    {
      id: nanoid(),
      name: "receiverMsg",
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
  ];


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
