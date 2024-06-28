import React from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import PayToIcon from "../../../../assets/images/doc/Payto_Icon.png";
import { nanoid } from "nanoid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import { useSendMoneyStep6Form } from "../../../../forms/sendmoney/useSendMoneyForm";
import CardMoney from "../../../../components/MaterialUI/CardMoney";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import PaymentMethod from "../NewMoneystep2/Payment/PaymentMethod";
import { useSelector } from "react-redux";

const NewMoneyStep6 = ({ handleNext }) => {
  const theme = useTheme();
  const { userId } = useSelector((state) => state.auth);
  const { sendMoneyAllData } = useSelector((state) => state.sendMoney);
  const sendMoneyPaymentMethod =
    sendMoneyAllData && sendMoneyAllData?.sendMoneyPaymentMethod;
  const exchangeRate = sendMoneyAllData && sendMoneyAllData?.addExchangeRate;
console.log(sendMoneyPaymentMethod, "senddfgf")
  const { formik } = useSendMoneyStep6Form(handleNext, sendMoneyPaymentMethod);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const generateInputFields = (type) => {
    let inputFields = [
      ...(type === "Debit Card"
        ? [
            {
              id: nanoid(),
              name: "cardNumber",
              label: "Card Number",
              type: "text",
              required: true,
              isImage: true,
              iconStart: PayToIcon,
              iconWidth: 45,
              md: 12,
              sm: 12,
              xs: 12,
            },
            {
              id: nanoid(),
              name: "expiryDate",
              label: "Expiry Date",
              type: "text",
              required: true,
              isImage: true,
              iconStart: PayToIcon,
              iconWidth: 45,
              md: 12,
              sm: 12,
              xs: 12,
            },
            {
              id: nanoid(),
              name: "cvv",
              label: "CVV",
              type: "text",
              required: true,
              isImage: true,
              iconStart: PayToIcon,
              iconWidth: 45,
              md: 12,
              sm: 12,
              xs: 12,
            },
            {
              id: nanoid(),
              name: "cardHolderName",
              label: "Card Holder Name",
              type: "text",
              required: true,
              isImage: true,
              iconStart: PayToIcon,
              iconWidth: 45,
              md: 12,
              sm: 12,
              xs: 12,
            },
          ]
        : []),
      ...(type === "Credit Card"
        ? [
          {
            id: nanoid(),
            name: "cardNumber",
            label: "Card Number",
            type: "text",
            required: true,
            isImage: true,
            iconStart: PayToIcon,
            iconWidth: 45,
            md: 12,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "expiryDate",
            label: "Expiry Date",
            type: "text",
            required: true,
            isImage: true,
            iconStart: PayToIcon,
            iconWidth: 45,
            md: 12,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "cvv",
            label: "CVV",
            type: "text",
            required: true,
            isImage: true,
            iconStart: PayToIcon,
            iconWidth: 45,
            md: 12,
            sm: 12,
            xs: 12,
          },
          {
            id: nanoid(),
            name: "cardHolderName",
            label: "Card Holder Name",
            type: "text",
            required: true,
            isImage: true,
            iconStart: PayToIcon,
            iconWidth: 45,
            md: 12,
            sm: 12,
            xs: 12,
          },
          ]
        : []),
        ...(type === "Bank Transfer"
          ? [
            {
              id: nanoid(),
              name: "accountHolderName",
              label: "Account Holder Name",
              type: "text",
              required: true,
              isImage: true,
              iconStart: PayToIcon,
              iconWidth: 45,
              md: 12,
              sm: 12,
              xs: 12,
            },
            {
              id: nanoid(),
              name: "bsbCode",
              label: "BSB Code",
              type: "text",
              required: true,
              isImage: true,
              iconStart: PayToIcon,
              iconWidth: 45,
              md: 12,
              sm: 12,
              xs: 12,
            },
            {
              id: nanoid(),
              name: "accountNumber",
              label: "Account Number",
              type: "text",
              required: true,
              isImage: true,
              iconStart: PayToIcon,
              iconWidth: 45,
              md: 12,
              sm: 12,
              xs: 12,
            },
            {
              id: nanoid(),
              name: "",
              label: "",
              type: "text",
              required: true,
              isImage: true,
              iconStart: PayToIcon,
              iconWidth: 45,
              md: 12,
              sm: 12,
              xs: 12,
            },
            ]
          : []),
          ...(type === "PayTo"
            ? [
                {
                  id: nanoid(),
                  name: "BSBNum",
                  label: "BSB Number",
                  type: "text",
                  required: true,
                  iconStart: <BusinessIcon />,
                  md: 12,
                  sm: 12,
                  xs: 12,
                },
                {
                  id: nanoid(),
                  name: "accountNumber",
                  label: "Account Number",
                  type: "text",
                  iconStart: <AccountBalanceIcon />,
                  required: true,
                  md: 12,
                  sm: 12,
                  xs: 12,
                },
              ]
            : []),
    ];
    return inputFields;
  };

  return (
    <Grid container spacing={2} sx={{ width: "80%", margin: "0 2rem" }}>
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
          sx={{
            color: theme.palette.background.main,
            fontSize: "1.8rem",
            fontWeight: "600",
          }}
        >
          Send Money
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            background: theme.palette.primary.light,
            borderRadius: "2rem",
            padding: "2rem 1rem",
          }}
        >
          <PaymentMethod method={sendMoneyPaymentMethod} exchangeRate={exchangeRate} />
        </Box>
      </Grid>


      <Grid item xs={12}>
        <RenderInput
          inputField={generateInputFields(formik?.values?.paymentType)}
          formik={formik}
        />
      </Grid>

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

export default NewMoneyStep6;
