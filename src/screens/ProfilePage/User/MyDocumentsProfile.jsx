import React, { useState } from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import { useMyDocumentsProfileForm } from "../../../hooks/profile/User/useProfileDetailsForm";
import { Grid, Typography, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import {
  useGetDocTypeById,
  useGetDocTypeDetails,
  useGetUserIdDetails,
} from "../../../hooks/profile/User/useProfileDetails";
import { License_FIELD, Passport_FIELD, userKycDocField } from "./docField";

const MyDocumentsProfile = ({ userId }) => {
  const theme = useTheme();
  const { data: docTypeData } = useGetDocTypeDetails();
  const getDocData = docTypeData && docTypeData?.data;

  const { data: userIdDetails } = useGetUserIdDetails(userId);
  const doTypeId = userIdDetails && userIdDetails?.data?.[0]?.id;

  const newDocData = getDocData
    ?.filter((item) => item?.documentTypes?.length > 0) // Filter items with non-empty documentTypes
    ?.flatMap(
      ( item ) =>
        item.documentTypes.map((docType) => ({
          idDetailsId: doTypeId,
          documentTypeId: docType?.id,
          docTypeName: docType?.name,
        }))
    );

  const { formik } = useMyDocumentsProfileForm({ newDocData });
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Grid container mt={2}>
      {formik.values.documentType === "" && (
        <RenderInput inputField={userKycDocField} formik={formik} />
      )}

      {formik.values.documentType === "Passport" && (
        <RenderInput inputField={Passport_FIELD} formik={formik} />
      )}

      {formik.values.documentType === "Driving License" && (
        <RenderInput inputField={License_FIELD} formik={formik} />
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
