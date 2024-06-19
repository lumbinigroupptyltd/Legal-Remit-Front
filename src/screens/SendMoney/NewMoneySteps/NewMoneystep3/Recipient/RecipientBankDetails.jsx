import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { nanoid } from "nanoid";
import PersonIcon from "@mui/icons-material/Person";
import RenderInput from "../../../../../components/RenderInput/RenderInput";
import { recipientBankDetailsForm } from "../../../../../forms/sendmoney/recipient/recipientForm";
import { CButton } from "../../../../../components/MaterialUI/CButton";
import DeliveryMethod from "../../NewMoneystep2/Delivery/DeliveryMethod";

const RecipientBankDetails = ({ onFormValidate }) => {
  const theme = useTheme();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");

  const { formik } = recipientBankDetailsForm(onFormValidate);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const inputField = [
    ...(selectedDeliveryMethod?.title === "Bank Deposit"
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
            name: "bankName",
            label: "Bank Name",
            type: "text",
            required: true,
            iconStart: <AccountBalanceIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "bankNumber",
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
      ...(selectedDeliveryMethod?.title === "Wallet Deposit"
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
        ...(selectedDeliveryMethod?.title === "Cash Pickup"
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
          />
        </Box>

        <RenderInput inputField={inputField} formik={formik} />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        mt={2}
        sx={{ display: "flex", justifyContent: "end" }}
      >
        <CButton
          buttonName={"Add"}
          OnClick={handleFormSubmit}
          variant={"contained"}
          fullWidth={"fullWidth"}
          Width={"fit-content"}
          padding={"0 2rem"}
          BGColor={theme.palette.button.primary}
          BGHover={`${theme.palette.hover.primary}`}
        />
      </Grid>
    </>
  );
};

export default RecipientBankDetails;