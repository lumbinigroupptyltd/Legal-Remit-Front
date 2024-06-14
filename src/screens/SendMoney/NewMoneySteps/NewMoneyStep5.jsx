import React from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { useSendMoneyStep5Form } from "../../../forms/sendmoney/useSendMoneyForm";
import CardMoney from "../../../components/MaterialUI/CardMoney";
import PayToIcon from "../../../assets/images/doc/Payto_Icon.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { Person } from "@mui/icons-material";

const NewMoneyStep5 = ({ handleNext }) => {
  const theme = useTheme();
  const { formik } = useSendMoneyStep5Form(handleNext);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const generateInputFields = (type) => {
    console.log(type, "type");
    console.log(formik.values.paymentType, "pay type");
    let inputFields = [
      {
        id: nanoid(),
        name: "paymentType",
        label: "Select Payment Type",
        type: "dropDown",
        iconStart: <Person />,
        options: [
          { id: nanoid(), name: "payID", label: "I have PayID Number", value: "payID" },
          { id: nanoid(), name: "BSB", label: "I have BSB Number", value: "BSB"},
        ],
        required: true,
        md: 12,
        sm: 12,
        xs: 12,
      },
      ...(type === "payID"
        ? [
            {
              id: nanoid(),
              name: "payIdNum",
              label: "PayID Number",
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
      ...(type === "BSB"
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
        <CardMoney
          Background={theme.palette.primary.light}
          Display={"flex"}
          Direction={"row"}
          Justify={"center"}
          Align={"center"}
          Radius={"2rem"}
          Padding={"1.5rem"}
          Title1="Payment Method"
          Title2="PayTO"
          Image={PayToIcon}
          Icon={<KeyboardArrowDownIcon sx={{ fontSize: "2rem" }} />}
        />
      </Grid>

      <Grid
        item
        xs={12}
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img width={140} src={PayToIcon} alt="image" />
        <Typography
          variant="p"
          sx={{ fontSize: "0.8rem", fontWeight: "500", textAlign: "center" }}
        >
          Set up PayTo agreement to pay directly from your bank account. <br />{" "}
          Use PayID or BSB and account number.
        </Typography>
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

export default NewMoneyStep5;
