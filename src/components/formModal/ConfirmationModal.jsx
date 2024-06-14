import React from "react";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { logout } from "../../utils/logout";
import { useNavigate } from "react-router-dom";
import { useUserKycDetailsForm } from "../../forms/profile/user/userBasicDetailsForm";
import { CButton } from "../MaterialUI/CButton";


const ConfirmationModal = ({ handleCloseModal, message, data, userId, countryId }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { formik } = useUserKycDetailsForm({ data, userId, countryId });
  const handleFormSubmit = async() => {
    await formik.setFieldValue(kycStatus, "VERIFIED");
    await formik.handleSubmit();
    handleCloseModal();
    logout();
    navigate("/login");
  };
  return (
    <Box sx={{ padding: "0.2rem 2rem" }}>
      <Typography variant="p" sx={{ fontSize: "1.3rem", fontWeight: "400" }}>
        {message}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
        <CButton
          buttonName={"NO"}
          OnClick={handleCloseModal}
          variant={"error"}
          Width={"fit-content"}
          TextColor={`${theme.palette.text.error}`}
          TextColorHover={"#fff"}
          Border={`1px solid ${theme.palette.button.error}`}
          BGColor={`${theme.palette.background.default}`}
          BGHover={`${theme.palette.hover.error}`}
        />
        <CButton
          buttonName={"YES"}
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
    </Box>
  );
};

export default ConfirmationModal;
