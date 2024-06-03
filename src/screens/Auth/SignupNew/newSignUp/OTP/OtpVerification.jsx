import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import OtpInput from "react-otp-input";
import { LoadingButton } from "@mui/lab";
import ChangeOtpNumber from "./ChangeOtpNumber";
import FormModal from "../../../../../components/formModal/FormModal";
import { useFinalOtpVerNumForm, useOtpVerNumForm, useResendOtpVerNumForm } from "../../../../../hooks/auth/signup/OTP/useVerifyOtpNumber";
import { useNavigate } from "react-router-dom";
import { useGetOtpVerify } from "../../../../../hooks/auth/signup/OTP/useOtpVerification";

const OtpVerification = ({ open, onClose }) => {
  const [required, setRequired] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpDisable, setOtpDisable] = useState(true);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [otpErrorShakeMessage, setOtpErrorShakeMessage] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [changeNumModal, setChangeNumModal] = useState(false);
  const theme = useTheme();

  const { handleVerification, loading } = useFinalOtpVerNumForm(onClose);
  const { handleResendVerification } = useResendOtpVerNumForm();

  const handleSubmit = () => {
    if (otp?.length === 6) {
      handleVerification({ otp });
    } else {
      setRequired(true);
    }
  };

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleOtpInput = async (otpValue) => {
    const normalizedOtp = otpValue.replace(/[^0-9]/g, "");
    setOtp(normalizedOtp);
    const isOtpLengthValid = otpValue.length === 6;
    setOtpErrorShakeMessage(!isOtpLengthValid);
    setOtpDisable(!isOtpLengthValid);
  };

  useEffect(() => {
    if (otp?.length === 0) {
      setRequired(false);
    }
  }, [otp]);

  const handleNumberChange = () => {
    setChangeNumModal(true);
  };
const sendNewOtp = () => {
  handleResendVerification({});
};

  return (
    <Box>

      <Grid>
        <Grid mb={2} sx={{textAlign: "center"}}>Please Enter 6 digit OTP sent to your registered phone number</Grid>
        <OtpInput
          value={otp}
          onChange={handleOtpInput}
          numInputs={6}
          shouldAutoFocus
          isInputNum={true}
          renderInput={(props) => {
            const value = props.value;
            const isEmpty = required ? !value : false;
            return (
              <input
                {...props}
                className={`bg-light-verification  ${
                  isEmpty ? "otpRequiredBorder" : ""
                } `}
              />
            );
          }}
          renderSeparator={<span>&nbsp; &nbsp; &nbsp;</span>}
          containerStyle={{ justifyContent: "center", gap: "1rem" }}
         
          inputStyle={{
            border: "1px solid transparent",
            borderRadius: "8px",
            width: "50px",
            height: "50px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "400",
            caretColor: "blue",
            background: "#d4d4de",
          }}
          focusStyle={{
            border: "1px solid #CFD3DB",
            outline: "none",
          }}
        />
        {otpErrorMessage && (
          <div className="text-danger">{otpErrorMessage}</div>
        )}
      </Grid>
      <Grid mt={2} sx={{textAlign: "center"}}>
        <small>
          {seconds > 0
            ? `Wait for ${seconds} seconds before retry.`
            : "Didn't receive code?"}
        </small>
        <Button onClick={sendNewOtp} disabled={seconds > 0}>
          Resend OTP
        </Button>
        {/* <Grid>
          <Typography onClick={handleNumberChange} variant="p">Change Number</Typography>
        </Grid> */}
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
            VERIFY
          </div>
        </LoadingButton>
      </Grid>

      {changeNumModal && (
          <FormModal
          open={changeNumModal}
          onClose={() => setChangeNumModal(false)}
          width={700}
          height={"auto"}
          maxHeight={"80vh"}
          header={"SMS Verification"}
          formComponent={
            <>
              <ChangeOtpNumber open={changeNumModal} onClose={() => setChangeNumModal(false)} />
            </>
          }
        />
      )}
    </Box>
  );
};

export default OtpVerification;
