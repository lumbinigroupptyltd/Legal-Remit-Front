import React, { useEffect } from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import RenderInput from "../../../components/RenderInput/RenderInput";
import FlagIcon from "@mui/icons-material/Flag";
import { nanoid } from "nanoid";
import { useSendMoneyStep2Form } from "../../../forms/sendmoney/useSendMoneyForm";
import { useSelector } from "react-redux";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const DELIVERY_OPTIONS = [
  {
    id: nanoid(),
    label: "Wallet Deposit",
    value: "wallet",
  },
  {
    id: nanoid(),
    label: "Bank Deposit",
    value: "bank",
  },
  {
    id: nanoid(),
    label: "Cash Pickup",
    value: "cash",
  },
];
const PAYMENT_OPTIONS = [
  {
    id: nanoid(),
    label: "Credit Card",
    value: "credit",
  },
  {
    id: nanoid(),
    label: "Debit Card",
    value: "debit",
  },
  {
    id: nanoid(),
    label: "Pay To",
    value: "payTo",
  },
  {
    id: nanoid(),
    label: "Pay ID Email",
    value: "payIdEmail",
  },
];

const NewMoneyStep2 = ({ handleNext }) => {
    const values = useSelector((state) => state.sendMoney.values);
  const theme = useTheme();
  const { formik } = useSendMoneyStep2Form(handleNext, values);

  const image = `https://flagcdn.com/16x12/au.png`;
  const image1 = `https://flagcdn.com/16x12/np.png`;
  
  const inputData = [
    {
      name: "sendMoney",
      name1: "countryName",
      label: "You Send",
      type: "text",
      iconStart: image,
      id: nanoid(),
      isFLag: true,
      isImage: true,
      hasDoubleValue: true,
      required: true,
      responseLabel: "name",
      responseId: "id",
      responseCode: "phoneCode",
      md: 12,
      sm: 12,
    },
    {
      name: "resMoney",
      label: "You Recieve",
      type: "text",
      iconStart: image1,
      id: nanoid(),
      isFLag: true,
      isImage: true,
      hasDoubleValue: true,
      required: true,
      responseLabel: "name",
      responseId: "id",
      responseCode: "phoneCode",
      md: 12,
      sm: 12,
    },
    {
      name: "deliveryMethod",
      label: "DELIVERY METHOD",
      type: "dropDown",
      options: DELIVERY_OPTIONS,
      iconStart: <CreditCardIcon />,
      id: nanoid(),
      isFLag: true,
      required: true,
      md: 12,
      sm: 12,
    },
    {
      name: "paymentMoethod",
      label: "PAYMENT METHOD",
      type: "dropDown",
      options: PAYMENT_OPTIONS,
      iconStart: <CreditCardIcon />,
      id: nanoid(),
      isFLag: true,
      required: true,
      md: 12,
      sm: 12,
    },
    {
      name: "promoCode",
      label: "Apply Promocode",
      type: "text",
      iconStart: <CardGiftcardIcon />,
      id: nanoid(),
      required: true,
      md: 12,
      sm: 12,
    },
  ];

  const sendMoney = formik.values.sendMoney;
  useEffect(() => {
    const receiveMoney = sendMoney ? sendMoney * 87.5 : 0;
    formik.setFieldValue("resMoney", receiveMoney);
  }, [sendMoney]);
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Grid container spacing={2}>
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
          <Typography variant="p">
            Calculate amount of money to be transfered
          </Typography>

          <RenderInput inputField={inputData} formik={formik} />
          <Button
            onClick={handleFormSubmit}
            variant={"contained"}
            sx={{ padding: "8px 24px", borderRadius: "24px", fontSize: "1rem" }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewMoneyStep2;
