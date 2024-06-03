import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
import { Grid, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import { usePersonalBusinessProfileForm } from "../../../hooks/profile/Business/useProfileDetailsBusinessForm";

const basicInputData = [
  {
    name: "fullName",
    label: "Full Name",
    required: true,
    type: "text",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "firstName",
    label: "Business Name",
    required: true,
    type: "text",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "registrationNumber",
    label: "ACN/ABN/Registration No",
    required: true,
    type: "text",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "address",
    label: "Address Of Business",
    required: true,
    type: "text",
    iconStart: <EmailIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "email",
    label: "Email",
    required: true,
    type: "text",
    iconStart: <EmailIcon />,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "phone",
    label: "Mobile Number",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
];

const BusinessDetailsProfile = () => {
  const theme = useTheme();
  const { formik } = usePersonalBusinessProfileForm();
  const handleFormSubmit = () => {
    // console.log("success");
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

export default BusinessDetailsProfile;
