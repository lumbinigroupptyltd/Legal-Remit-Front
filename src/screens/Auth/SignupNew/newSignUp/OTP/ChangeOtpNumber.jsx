import { nanoid } from "nanoid";
import {
  Box,
  Grid,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import RenderInput from "../../../../../components/RenderInput/RenderInput";
import { useChangeOtpNumberForm } from "../../../../../forms/auth/otp/otpVerificationForm";

const otpInputData = [
  {
    name: "change_phone_verify_number",
    label: "Mobile",
    type: "onlyNumber",
    id: nanoid(),
    iconStart: <SmartphoneIcon />,
    required: true,
    md: 12,
    sm: 12,
  },
];

const ChangeOtpNumber = ({ open, onClose }) => {
  const { formik } = useChangeOtpNumberForm(onClose);
  const handleSubmit = () => {
    formik.handleSubmit();
  };
  const theme = useTheme();

  return (
    <Box>
      <Grid>
        <Grid mb={2} sx={{ textAlign: "center" }}>
          Please Enter phone number to receive OTP
        </Grid>
        <RenderInput inputField={otpInputData} formik={formik} />
      </Grid>
      <Grid mt={2} sx={{ textAlign: "center" }}>
        <LoadingButton
          fullWidth
          onClick={handleSubmit}
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            textTransform: "none",
            fontWeight: 600,
            background: theme.palette.button.primary,
            color: "#fff",
            '&:hover': {
              background: theme.palette.hover.primary,
            }
          }}
        >
          <div className="titleMedium " style={{ margin: ".25rem 0" }}>
            SEND OTP
          </div>
        </LoadingButton>
      </Grid>
    </Box>
  );
};

export default ChangeOtpNumber;
