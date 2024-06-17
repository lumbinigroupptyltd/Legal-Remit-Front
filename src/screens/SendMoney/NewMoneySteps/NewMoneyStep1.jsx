import React from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import RenderInput from "../../../components/RenderInput/RenderInput";
import FlagIcon from "@mui/icons-material/Flag";
import { nanoid } from "nanoid";
import { useSendMoneyStep1Form } from "../../../forms/sendmoney/useSendMoneyForm";

const NewMoneyStep1 = ({ handleNext }) => {
  const theme = useTheme();
  const { formik } = useSendMoneyStep1Form(handleNext);

  const image = `https://flagcdn.com/16x12/np.png`;

  const inputData = [
    {
      name: "countryId",
      type: "dropDown",
      options: [
        {id: nanoid(), name: "countryName", label: "Nepal", value: "1"},
      ],
      // path: "/country/getall",
      iconStart: image,
      id: nanoid(),
      isImage: true,
      iconWidth: 20,
      // isFLag: true,
      required: true,
      md: 12,
      sm: 12,
    },
  ];
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
          <Typography variant="p" sx={{fontWeight: "500", textAlign: "center"}}>Enter Country of Recipient</Typography>
         
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

export default NewMoneyStep1;
