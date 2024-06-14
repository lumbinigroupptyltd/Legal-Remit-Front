import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { useBasicBusinessDetailsForm } from "../../../forms/profile/business/businessBasicDetailsForm";
import { getVerifyEmail } from "../../../api/userInfo/user-api";
import { CButton } from "../../../components/MaterialUI/CButton";

const BusinessDetailsProfile = ({ data, userId }) => {
  const theme = useTheme();
  const { formik } = useBasicBusinessDetailsForm({ data, userId });
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const basicInputData = [
    {
      name: "firstName",
      label: "Full Name",
      required: true,
      type: "text",
      isDisabled: true,
      iconStart: <PersonIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "businessName",
      label: "Business Name",
      required: true,
      isDisabled: true,
      type: "text",
      iconStart: <PersonIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "regNo",
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
      name: "businessAddress",
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
      isVerified: data?.isEmailVerified,
      isEmailCheck: true,
      iconStart: <EmailIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "phoneNumber",
      label: "Mobile Number",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "onlyNumber",
      isVerified: data?.isPhoneVerified,
      isPhoneCheck: true,
      max: 10,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
  ];

  const handleEmail = async () => {
    try {
      await getVerifyEmail();
      toast.success("Check your email & verify!");
    } catch (error) {
      toast.error("Failed to send verification email.");
    }
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
          justifyContent: "space-between",
        }}
      >
        {data && !data?.isEmailverified && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            <Typography variant="p" color={"error"}>Verify Email </Typography>
            <Typography
              OnClick={handleEmail}
              variant="p"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Click here
            </Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
            buttonName={data ? "UPDATE" : "ADD"}
            OnClick={handleFormSubmit}
            variant={"contained"}
            Width={"fit-content"}
            TextColor={"#000"}
            TextColorHover={"#fff"}
            Border={`1px solid ${theme.palette.button.primary}`}
            BGColor={`${theme.palette.background.default}`}
            BGHover={`${theme.palette.hover.primary}`}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BusinessDetailsProfile;
