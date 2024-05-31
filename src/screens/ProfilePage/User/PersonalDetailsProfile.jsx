import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
import { Button, Grid, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import { usePersonalDetailsProfileForm } from "../../../hooks/profile/User/useProfileDetailsForm";
import FlagIcon from "@mui/icons-material/Flag";
import { useGetUserInfo } from "../../../hooks/apiStartGetAll/useGetAllUserInfo";

const COUNTRY_SELECTED = [
  {
    id: nanoid(),
    label: "Australia",
    value: "14",
    flag: "https://flagcdn.com/16x12/au.png",
    code: "+61",
  },
  {
    id: nanoid(),
    label: "Canada",
    value: "15",
    flag: "https://flagcdn.com/16x12/ca.png",
    code: "+1",
  },
  {
    id: nanoid(),
    label: "USA",
    value: "16",
    flag: "https://flagcdn.com/16x12/us.png",
    code: "+1",
  },
];

const PersonalDetailsProfile = ({ data }) => {
  const theme = useTheme();
  const { formik } = usePersonalDetailsProfileForm({ data });
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const basicInputData = [
    {
      name: "countryId",
      name1: "countryName",
      name2: "phoneCode",
      label: "Select Country",
      type: "asyncDropDownCustom",
      options: COUNTRY_SELECTED,
      iconStart: <FlagIcon />,
      id: nanoid(),
      isFLag: true,
      hasDoubleValue: true,
      required: true,
      responseLabel: "name",
      responseId: "id",
      responseCode: "phoneCode",
      md: 6,
      sm: 12,
    },
    {
      name: "firstName",
      label: "First Name",
      required: true,
      type: "text",
      iconStart: <PersonIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "middleName",
      label: "Middle Name",
      required: true,
      type: "text",
      iconStart: <PersonIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "lastName",
      label: "Last Name",
      required: true,
      type: "text",
      iconStart: <PersonIcon />,
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
      sm: 6,
      xs: 12,
    },
    {
      name: "phone",
      label: "Mobile Number",
      required: true,
      iconStart: <SmartphoneIcon />,
      iconCode: formik.values.countryId === "14" ? "+61" : "+1",
      type: "numWithCode",
      max: 10,
      id: nanoid(),
      md: 6,
      sm: 12,
    },
  ];

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

export default PersonalDetailsProfile;
