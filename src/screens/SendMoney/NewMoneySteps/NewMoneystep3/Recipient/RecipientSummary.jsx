import React, { useEffect } from "react";
import RecipientBankDetails from "./RecipientBankDetails";
import RecipientContactDetails from "./RecipientContactDetails";
import { recipientSummaryForm } from "../../../../../forms/sendmoney/recipient/recipientForm";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { CButton } from "../../../../../components/MaterialUI/CButton";
import { useGetRecipientDetails, useGetRecipientDetailsByUserId } from "../../../../../hooks/sendMoney/recipient/useRecipient";
import RenderInput from "../../../../../components/RenderInput/RenderInput";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonIcon from "@mui/icons-material/Person";
import { useGetRelation } from "../../../../../hooks/sendMoney/relation/useRelation";


const RecipientSummary = ({ onFormValidate, onClose, method, userId }) => {
  const theme = useTheme();
  const { recipientBank, recipientContact } = useSelector(
    (state) => state.sendMoney
  );
  const { data: relationData } = useGetRelation();
  const data = { recipientBank, ...recipientContact };
  const { data: getRecipientData } = useGetRecipientDetailsByUserId(userId);
  const { formik } = recipientSummaryForm(onClose, data);
console.log(getRecipientData, "getRecipientData")
  const GET_RELATION_DATA =
  relationData &&
  relationData.data.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const inputFieldBank = [
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
  
  const inputFieldContact = [
    {
      id: nanoid(),
      name: "address",
      name1: "district",
      name2: "stateName",
      name3: "city",
      name4: "postalCode",
      label: "Address",
      type: "AsyncDropDownSearchNepal",
      // required: true,
      isStreet: true,
      iconStart: <PersonIcon />,
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
      iconStart: <PersonIcon />,
      md: 6,
      sm: 12,
      xs: 12,
    },
    {
      id: nanoid(),
      name: "stateName",
      label: "State/Province",
      type: "text",
      required: true,
      iconStart: <PersonIcon />,
      md: 6,
      sm: 12,
      xs: 12,
    },
    {
      id: nanoid(),
      name: "city",
      label: "House No./Street Name",
      type: "text",
      required: true,
      iconStart: <PersonIcon />,
      md: 6,
      sm: 12,
      xs: 12,
    },
    {
      id: nanoid(),
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      required: true,
      iconStart: <AccountBalanceIcon />,
      md: 6,
      sm: 12,
      xs: 12,
    },
    {
      id: nanoid(),
      name: "phone",
      label: "Mobile",
      type: "text",
      required: true,
      iconStart: <AccountBalanceIcon />,
      max: 10,
      md: 6,
      sm: 12,
      xs: 12,
    },
    {
      id: nanoid(),
      name: "relationId",
      label: "Relation",
      type: "dropDown",
      options: GET_RELATION_DATA,
      required: true,
      iconStart: <PersonIcon />,
      md: 6,
      sm: 12,
      xs: 12,
    },
  ];

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
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
      <>
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
              fontSize: "1.8rem",
              fontWeight: "500",
            }}
          >
            Update Bank Details
          </Typography>
        </Grid>
        <RenderInput inputField={inputFieldBank} formik={formik} />
      </>
      <>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="p"
            sx={{
              color: theme.palette.background.main,
              fontSize: "1.8rem",
              fontWeight: "500",
            }}
          >
            Update Contact Details
          </Typography>
        </Grid>
        <RenderInput inputField={inputFieldContact} formik={formik} />
      </>

      <Grid item sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
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
          UPDATE
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecipientSummary;
