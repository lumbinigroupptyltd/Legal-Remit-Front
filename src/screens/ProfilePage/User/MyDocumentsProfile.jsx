import React from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import { useMyDocumentsProfileForm } from "../../../hooks/profile/User/useProfileDetailsForm";
import { Grid, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import AttachmentIcon from '@mui/icons-material/Attachment';

const basicInputData = [
  {
    name: "kycfront",
    label: "KYC Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Front",
    iconStart: <AttachmentIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "kycback",
    label: "KYC Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Back",
    iconStart: <AttachmentIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
];

const MyDocumentsProfile = () => {
  const theme = useTheme();
  const { formik } = useMyDocumentsProfileForm();
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Grid container mt={2}>
      <RenderInput inputField={basicInputData} formik={formik} />
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
