import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { CButton } from "../UIElements/CButton";
import { usePersonalDetailsProfileForm } from "../../hooks/profile/User/useProfileDetailsForm";
import { logout } from "../../utils/logout";
import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({ handleCloseModal, message, data, userId }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { formik } = usePersonalDetailsProfileForm({ data, userId });
  const handleFormSubmit = async() => {
    await formik.setFieldValue("signupCompleted", true);
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
          buttonName={"Cancel"}
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
      </Box>
    </Box>
  );
};

export default ConfirmationModal;
