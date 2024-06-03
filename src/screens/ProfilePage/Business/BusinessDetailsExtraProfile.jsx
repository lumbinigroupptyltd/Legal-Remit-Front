import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
import { Grid, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import { usePersonalBusinessProfileExtraForm } from "../../../hooks/profile/Business/useProfileDetailsBusinessForm";

const basicInputData = [
  {
    name: "companyType",
    label: "Company Type",
    required: true,
    type: "text",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "employee",
    label: "No. Of Employees",
    required: true,
    type: "text",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "directors",
    label: "No. of Directors",
    required: true,
    type: "text",
    iconStart: <PersonIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "shareHolder",
    label: "No. Of Shareholder",
    required: true,
    type: "text",
    iconStart: <EmailIcon />,
    id: nanoid(),
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "industry",
    label: "Industry Type",
    required: true,
    type: "text",
    iconStart: <EmailIcon />,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "target",
    label: "Target Market",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "expected",
    label: "Expected remittance volume (AUD)/sending currency per year",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "trans",
    label: "Expected No of transaction per year",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
  {
    name: "website",
    label: "Website",
    required: true,
    iconStart: <SmartphoneIcon />,
    type: "onlyNumber",
    max: 10,
    id: nanoid(),
    md: 6,
    sm: 12,
  },
];

const BusinessDetailsExtraProfile = () => {
  const theme = useTheme();
  const { formik } = usePersonalBusinessProfileExtraForm();
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

export default BusinessDetailsExtraProfile;
