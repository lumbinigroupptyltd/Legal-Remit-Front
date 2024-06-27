import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { nanoid } from "nanoid";
import PersonIcon from "@mui/icons-material/Person";
import RenderInput from "../../../../../components/RenderInput/RenderInput";
import { recipientBankDetailsForm } from "../../../../../forms/sendmoney/recipient/recipientForm";
import { CButton } from "../../../../../components/MaterialUI/CButton";
import DeliveryMethod from "../../NewMoneystep2/Delivery/DeliveryMethod";
import { useGetBankDetails } from "../../../../../hooks/bank/useBankDetails";

const RecipientBankDetails = ({ onFormValidate, method, data }) => {
  const theme = useTheme();
  const { data: getAllBankData } = useGetBankDetails();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");

  const { formik } = recipientBankDetailsForm(onFormValidate, data, method);
  console.log(getAllBankData, "getAllBankData")
  const GET_BANK_DATA =
    getAllBankData &&
    getAllBankData.data.map((item) => ({
      label: item.bankName,
      value: item.id,
    }));

  const inputField = [
    ...(method?.deliveryType?.name === "Bank Deposit"
      ? [
          {
            id: nanoid(),
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
            iconStart: <PersonIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "middleName",
            label: "Middle Name",
            type: "text",
            required: true,
            iconStart: <PersonIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "lastName",
            label: "Last Name",
            type: "text",
            required: true,
            iconStart: <PersonIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "bankId",
            label: "Bank Name",
            type: "dropDown",
            options: GET_BANK_DATA,
            required: true,
            iconStart: <AccountBalanceIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "bankAccNo",
            label: "Bank Account Number",
            type: "text",
            required: true,
            iconStart: <AccountBalanceIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
        ]
      : []),
    ...(method?.deliveryType?.name === "Wallet Deposit"
      ? [
          {
            id: nanoid(),
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
            iconStart: <PersonIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "middleName",
            label: "Middle Name",
            type: "text",
            required: true,
            iconStart: <PersonIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "lastName",
            label: "Last Name",
            type: "text",
            required: true,
            iconStart: <PersonIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "walletName",
            label: "Wallet Name",
            type: "text",
            required: true,
            iconStart: <AccountBalanceIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "walletNo",
            label: "Wallet Account Number",
            type: "text",
            required: true,
            iconStart: <AccountBalanceIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
        ]
      : []),
    ...(method?.deliveryType?.name === "Cash Pickup"
      ? [
          {
            id: nanoid(),
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
            iconStart: <PersonIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "middleName",
            label: "Middle Name",
            type: "text",
            required: true,
            iconStart: <PersonIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "lastName",
            label: "Last Name",
            type: "text",
            required: true,
            iconStart: <PersonIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
        ]
      : []),
  ];

  const handleSelectedDeliveryMethodChange = (method) => {
    setSelectedDeliveryMethod(method);
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
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
            variant="p"
            mt={3}
            sx={{
              color: theme.palette.background.main,
              fontSize: "2.2rem",
              fontWeight: "700",
            }}
          >
            Add Recipient
          </Typography>
        </Grid>
        <Box
          sx={{
            background: theme.palette.primary.light,
            borderRadius: "2rem",
            gap: "1rem",
            padding: "1.2rem 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DeliveryMethod
            onDeliveryMethodChange={handleSelectedDeliveryMethodChange}
            method={method}
          />
        </Box>

        <RenderInput inputField={inputField} formik={formik} />
        <Grid item sx={{ width: "100%", display: "flex", justifyContent: "end"}}>
          <Button
            onClick={handleFormSubmit}
            variant={"contained"}
            sx={{
              marginTop: "1.6rem",
              padding: "0.5rem 3rem",
              borderRadius: "24px",
              fontSize: "1rem",
            }}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RecipientBankDetails;
