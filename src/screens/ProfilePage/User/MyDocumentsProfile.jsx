import React, { useState } from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import { useMyDocumentsProfileForm } from "../../../hooks/profile/User/useProfileDetailsForm";
import { Grid, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import { useGetDocTypeDetails } from "../../../hooks/profile/User/useProfileDetails";
import { additionalDocument, kycDocument, userKycDocField } from "./docField";

const MyDocumentsProfile = () => {
  const theme = useTheme();
  const { data: docTypeData } = useGetDocTypeDetails();
  const getDocData = docTypeData && docTypeData?.data;

  const { formik } = useMyDocumentsProfileForm({getDocData});
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Grid container mt={2}>
      {formik.values.documentType === "" && (
        <RenderInput inputField={userKycDocField} formik={formik} />
      )}
      {formik.values.documentType === "KYC" && (
        <RenderInput inputField={kycDocument} formik={formik} />
      )}
      {formik.values.documentType === "additional" && (
        <RenderInput inputField={additionalDocument} formik={formik} />
      )}
      <Grid
        item
        mt={2}
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "end",
          gap: "1rem",
        }}
      >
        <CButton
          buttonName={"Cancel"}
          // OnClick={handleCancel}
          variant={"error"}
          Width={"fit-content"}
          TextColor={`${theme.palette.text.error}`}
          TextColorHover={"#fff"}
          Border={`1px solid ${theme.palette.button.error}`}
          BGColor={`${theme.palette.background.default}`}
          BGHover={`${theme.palette.hover.error}`}
        />
        <CButton
          buttonName={"ADD"}
          OnClick={handleFormSubmit}
          variant={"contained"}
          Width={"fit-content"}
          TextColor={"#000"}
          TextColorHover={"#fff"}
          Border={`1px solid ${theme.palette.button.primary}`}
          BGColor={`${theme.palette.background.default}`}
          BGHover={`${theme.palette.hover.primary}`}
        />
      </Grid>
    </Grid>
  );
};

export default MyDocumentsProfile;
