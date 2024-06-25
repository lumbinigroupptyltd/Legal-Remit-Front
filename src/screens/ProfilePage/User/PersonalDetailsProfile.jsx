import React, { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useBasicUserDetailsDetailsForm } from "../../../forms/profile/user/userBasicDetailsForm";
import { useGetAllCountries } from "../../../hooks/country/useCountryDetails";
import {
  getVerifyEmail,
  getVerifyPhoneByUserId,
} from "../../../api/userInfo/user-api";
import FormModal from "../../../components/formModal/FormModal";
import ChangeOtpNumber from "../../Auth/SignupNew/newSignUp/OTP/ChangeOtpNumber";
import { toast } from "react-toastify";
import OtpVerification from "../../Auth/SignupNew/newSignUp/OTP/OtpVerification";
import { CButton } from "../../../components/MaterialUI/CButton";
import { debounce } from "lodash";
import { axiosInstance } from "../../../utils/axiosIntercepters";

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

const PersonalDetailsProfile = ({ data, userId }) => {
  const theme = useTheme();
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { formik, phoneChanged, setPhoneChanged} = useBasicUserDetailsDetailsForm({ data, userId });
  
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
 
  const { data: countryData } = useGetAllCountries();
  const coData = countryData && countryData?.data;

  const iconCode =
    coData && coData?.find((d) => d?.id === data?.country?.countryId);

  const basicInputData = [
    {
      // name: "countryId",
      name: "countryName",
      name2: "phoneCode",
      label: "Select Country",
      type: "text",
      path: "/country/getall",
      options: coData,
      id: nanoid(),
      isFLag: true,
      isDisabled: true,
      hasDoubleValue: true,
      required: true,
      responseLabel: "name",
      responseId: "id",
      responseCode: "phoneCode",
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "firstName",
      label: "First Name",
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
      name: "middleName",
      label: "Middle Name",
      // required: true,
      type: "text",
      isDisabled: true,
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
      isDisabled: true,
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
      err: emailError,
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
      iconCode: iconCode?.phoneCode,
      type: "numWithCode",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          {data && !data?.isEmailverified && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
              <Typography variant="p" color={"error"}>
                Verify Email{" "}
              </Typography>
              <Typography
                onClick={handleEmail}
                variant="p"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Click here
              </Typography>
            </Box>
          )}
        </Box>
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

export default PersonalDetailsProfile;
