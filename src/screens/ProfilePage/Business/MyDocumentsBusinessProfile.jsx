import React from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import { Grid, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { useMyDocumentsBusinessForm } from "../../../hooks/profile/Business/useProfileDetailsBusinessForm";

const DOCUMENT_OPTIONS = [
  { id: nanoid(), label: "Citizenship", value: "citizenship" },
  { id: nanoid(), label: "Lisence", value: "lisence" },
  { id: nanoid(), label: "Passport", value: "passport" },
  { id: nanoid(), label: "Additional", value: "additional" },
];

const MyDocumentsBusinessProfile = () => {
  const theme = useTheme();
  const { formik } = useMyDocumentsBusinessForm();

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const generateInputFields = (kyc) => {
    let inputFields = [
      {
        name: "kyc",
        label: "Select Document",
        required: true,
        type: "dropDown",
        options: DOCUMENT_OPTIONS,
        iconStart: <AttachmentIcon />,
        id: nanoid(),
        md: 12,
        sm: 12,
        xs: 12,
      },
      ...(kyc === "citizenship" || kyc === "lisence" || kyc === "passport"
        ? [
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
          ]
        : []),
      ...(kyc === "additional"
        ? [
            {
              name: "additional",
              label: "Additional Documents",
              required: true,
              type: "newDocumentUpload",
              title: "Additional Documents",
              iconStart: <AttachmentIcon />,
              id: nanoid(),
              md: 6,
              sm: 6,
              xs: 12,
            },
          ]
        : []),
    ];
    return inputFields;
  };

  return (
    <Grid container mt={2}>
      <RenderInput
        inputField={generateInputFields(formik.values.kyc)}
        formik={formik}
      />
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

export default MyDocumentsBusinessProfile;
