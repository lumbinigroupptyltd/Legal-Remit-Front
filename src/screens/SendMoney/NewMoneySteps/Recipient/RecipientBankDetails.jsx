import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { nanoid } from "nanoid";
import PersonIcon from "@mui/icons-material/Person";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { recipientBankDetailsForm } from "../../../../forms/sendmoney/recipient/recipientForm";
import { CButton } from "../../../../components/UIElements/CButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const RecipientBankDetails = ({ onFormValidate }) => {
  const theme = useTheme();
  const { formik } = recipientBankDetailsForm(onFormValidate);
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const code = formik.values.code;

  const inputField = [
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
    {
      id: nanoid(),
      name: "code",
      label: "Chosse Code",
      type: "radio",
      required: true,
      iconStart: <AccountBalanceIcon />,
      md: 12,
      sm: 12,
      radio: [
        {
          value: "yes",
          label: "I have IFSC Code",
        },
        {
          value: "no",
          label: "I don't have IFSC Code",
        },
      ],
    },
    ...(code === "yes"
      ? [
          {
            id: nanoid(),
            name: "ifsccode",
            label:
              "IFSC Code (if India) / Routing Number (in USA) / BSB(in AUS)",
            type: "text",
            required: true,
            iconStart: <AccountBalanceIcon />,
            md: 12,
            sm: 12,
          },
        ]
      : []),
    ...(code === "no"
      ? [
          {
            id: nanoid(),
            name: "state",
            label: "State",
            type: "text",
            required: true,
            iconStart: <LocationOnIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "district",
            label: "District",
            type: "text",
            required: true,
            iconStart: <LocationOnIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "branch",
            label: "Branch",
            type: "text",
            required: true,
            iconStart: <LocationOnIcon />,
            md: 6,
            sm: 12,
            xs: 12,
          },
        ]
      : []),
  ];

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
            sx={{
              color: theme.palette.background.main,
              fontSize: "3rem",
              fontWeight: "600",
            }}
          >
            Add Recipient
          </Typography>
        </Grid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            background: theme.palette.primary.light,
            padding: "0.6rem 3rem",
            borderRadius: "24px",
            margin: "1rem 0",
          }}
        >
          <AccountBalanceIcon
            sx={{ color: theme.palette.background.main, fontSize: "3rem" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="p"
              sx={{ fontSize: "1rem", fontWeight: "400" }}
            >
              Delivery Method
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "1.2rem", fontWeight: "500" }}
            >
              Bank Deposit
            </Typography>
          </div>
        </div>

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
