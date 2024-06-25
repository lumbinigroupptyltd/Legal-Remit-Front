import React, { useCallback, useEffect, useState } from "react";
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
import FormModal from "../../../components/formModal/FormModal";
import OtpVerification from "../../Auth/SignupNew/newSignUp/OTP/OtpVerification";
import { axiosInstance } from "../../../utils/axiosIntercepters";
import { debounce } from "lodash";

const BusinessDetailsProfile = ({ data, userId }) => {
  const theme = useTheme();
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { formik, phoneChanged, setPhoneChanged } = useBasicBusinessDetailsForm({ data, userId });

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
      name: "abn",
      label: "ABN Number",
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
      name: "businessAddress",
      label: "Address Of Business",
      required: true,
      isDisabled: true,
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
      err: emailError,
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
      err: phoneError,
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
      await getVerifyEmail(userId);
      toast.success("Check your email & verify!");
    } catch (error) {
      toast.error("Failed to send verification email.");
    }
  };

  const checkPhoneNumber = useCallback(
    debounce(async (phoneNumber) => {
      try {
        const response = await axiosInstance.post("/user/existornot", {
          phoneNumber,
        });
        const exists = response.data;
        if (exists) {
          setPhoneError("");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setPhoneError("Phone already exists");
        }
      }
    }, 100),
    []
  );

  const checkEmail = useCallback(
    debounce(async (email) => {
      try {
        const response = await axiosInstance.post("/user/existornot", {
          email,
        });
        const exists = response.data;
        if (exists) {
          setEmailError("");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setEmailError("Email already exists");
        }
      }
    }, 100),
    []
  );

  useEffect(() => {
    if (formik.initialValues?.phoneNumber !== formik.values?.phoneNumber) {
      checkPhoneNumber(formik.values.phoneNumber);
    }
    if (formik.initialValues?.email !== formik.values?.email) {
      checkEmail(formik.values.email);
    }
  }, [formik.values.phoneNumber, formik.values.email, checkPhoneNumber]);



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
      {phoneChanged && (
         <FormModal
         open={phoneChanged}
         onClose={() => setPhoneChanged(false)}
         width={700}
         height={"auto"}
         maxHeight={"80vh"}
         header={"SMS Verification"}
         formComponent={
           <>
             <OtpVerification
               open={phoneChanged}
               onClose={() => setPhoneChanged(false)}
             />
           </>
         }
       />
      )}
    </Grid>
  );
};

export default BusinessDetailsProfile;
