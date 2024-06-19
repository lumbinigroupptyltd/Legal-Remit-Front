import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../../../components/RenderInput/RenderInput";
import { usePromoCodeForm } from "../../../../../forms/sendmoney/promoCode/usePromoCodeForm";
import { CButton } from "../../../../../components/MaterialUI/CButton";
import { Grid, Stack, useTheme } from "@mui/material";

const PromocodeModal = (onClose) => {
  const theme = useTheme();
  const { formik } = usePromoCodeForm(onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const inputField = [
    {
      name: "promoCode",
      label: "Promo Code",
      type: "text",
      required: true,
      id: nanoid(),
      md: 12,
      sm: 12,
    },
  ];
  return (
    <Grid container spacing={2} sx={{ display: "flex", flexDirection: "row" }}>
      <Grid item xs={12} sm={12} md={12}>
        <RenderInput inputField={inputField} formik={formik} />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <CButton
          buttonName={"Apply"}
          OnClick={handleFormSubmit}
          variant={"contained"}
          fullWidth={"fullWidth"}
          Width={"-webkit-fill-available"}
          BGColor={theme.palette.button.primary}
          BGHover={`${theme.palette.hover.primary}`}
        />
      </Grid>
    </Grid>
  );
};

export default PromocodeModal;
