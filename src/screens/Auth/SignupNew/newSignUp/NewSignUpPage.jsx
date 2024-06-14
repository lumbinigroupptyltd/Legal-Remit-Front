import React, { useState } from "react";
import first1 from "../../../../assets/images/purpleVector.svg";
import {
  Grid,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { nanoid } from "nanoid";
import OtpVerification from "./OTP/OtpVerification";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import FormModal from "../../../../components/formModal/FormModal";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
import FlagIcon from "@mui/icons-material/Flag";
import { useNavigate } from "react-router-dom";
import useSignUpForm from "../../../../forms/auth/signup/signUpForm";
import { useGetAllCountries } from "../../../../hooks/country/useCountryDetails";
import { CButton } from "../../../../components/MaterialUI/CButton";

const ROLE_SELECTED = [
  { id: nanoid(), label: "Individual", value: "4b0fa25e-6dd9-480f-bdd7-59247705c132" },
  { id: nanoid(), label: "Business", value: "3221eca8-3f8e-40ab-b046-3fb56af938fd" },
];

const NewSignUpPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { data: countryData } = useGetAllCountries();
  const data = countryData && countryData?.data;

  const {
    formik,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
  } = useSignUpForm({ setOpenModal });
 
  const props = {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const generateInputFields = (roleId) => {
    const iconCode = data && data?.find((d) => d?.id === formik.values.countryId)
    let inputFields = [
      {
        name: "countryId",
        name1: "countryName",
        name2: "phoneCode",
        label: "Select Country",
        type: "asyncDropDown",
        path: "/country/getall",
        // options: COUNTRY_SELECTED,
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
        name: "roleId",
        label: "Select User Type",
        type: "dropDown",
        clearField: ["firstName", "middleName", "lastName", "fullName", "businessName", "registrationNumber", "address" ],
        required: true,
        options: ROLE_SELECTED,
        iconStart: <PersonIcon />,
        id: nanoid(),
        md: 6,
        sm: 12,
      },
      ...(roleId === "4b0fa25e-6dd9-480f-bdd7-59247705c132"
        ? [
            {
              name: "firstName",
              label: "First Name",
              type: "text",
              required: true,
              iconStart: <PersonIcon />,
              id: nanoid(),
              md: 4,
              sm: 12,
            },
            {
              name: "middleName",
              label: "Middle Name",
              type: "text",
              iconStart: <PersonIcon />,
              id: nanoid(),
              md: 4,
              sm: 12,
            },
            {
              name: "lastName",
              label: "Last Name",
              required: true,
              iconStart: <PersonIcon />,
              type: "text",
              id: nanoid(),
              md: 4,
              sm: 12,
            },
          ]
        : []),
      ...(roleId === "3221eca8-3f8e-40ab-b046-3fb56af938fd"
        ? [
            {
              name: "firstName",
              label: "Full Name",
              required: true,
              iconStart: <PersonIcon />,
              type: "text",
              id: nanoid(),
              md: 6,
              sm: 12,
            },
            {
              name: "businessName",
              label: "Business Name",
              required: true,
              iconStart: <PersonIcon />,
              type: "text",
              id: nanoid(),
              md: 6,
              sm: 12,
            },
            {
              name: "regNo",
              label: "ACN/ABN/Registration No",
              required: true,
              iconStart: <PersonIcon />,
              type: "onlyNumber",
              id: nanoid(),
              md: 6,
              sm: 12,
            },
            {
              name: "businessAddress",
              label: "Address Of Business",
              required: true,
              iconStart: <PersonIcon />,
              type: "text",
              id: nanoid(),
              md: 6,
              sm: 12,
            },
          ]
        : []),
      {
        name: "referral",
        label: "Referral link / Promocode",
        type: "text",
        id: nanoid(),
        iconStart: <LinkIcon />,
        md: 12,
        sm: 12,
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
        name: "phoneNumber",
        label: "Mobile Number",
        required: true,
        iconStart: <SmartphoneIcon />,
        iconCode: iconCode?.phoneCode,
        type: "numWithCode",
        max: 10,
        id: nanoid(),
        md: 6,
        sm: 12,
      },
      {
        name: "password",
        label: "Password",
        required: true,
        type: "password",
        iconEnd1: <Visibility />,
        iconEnd2: <VisibilityOff />,
        iconStart: <LockIcon />,
        id: nanoid(),
        md: 6,
        sm: 12,
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        required: true,
        type: "password",
        id: nanoid(),
        iconEnd1: <Visibility />,
        iconEnd2: <VisibilityOff />,
        iconStart: <LockIcon />,
        md: 6,
        sm: 12,
      },
    ];
    return inputFields;
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        width={"90%"}
        sx={{
          display: "flex",
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          justifyContent: "center",
          boxShadow: theme.palette.boxShadow.default,
          margin: {lg: "2rem auto", sm: "1rem auto"},
          alignItems: "center",
        }}
        padding={"2rem 0.6rem"}
      >
        <Grid item xs={3} sm={4} md={5} lg={5}>
          <Box
            sx={{
              width: { lg: "450px", md: "350px", sm: "280px", xs: "200px" },
            }}
          >
            <img width="100%" src={first1} alt="" />
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          sm={7}
          md={6}
          lg={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box>
            <Grid>
              <Typography
                variant="h6"
                align="center"
                mb={2}
                sx={{
                  width: "fit-content",
                  borderRadius: "0 14px 14px 0",
                  background: theme.palette.button.primary,
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  "&:hover": {
                    background: theme.palette.hover.primary,
                  },
                }}
              >
                Welcome to LegalRemit
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h6" align="center">
                Registration Details
              </Typography>
            </Grid>
          </Box>
          <RenderInput
            inputField={generateInputFields(formik?.values?.roleId)}
            formik={formik}
            passwordProps={props}
          />

          <Grid mt={2}>
            <CButton
              buttonName={"SIGN UP"}
              OnClick={handleFormSubmit}
              variant={"contained"}
              fullWidth={"fullWidth"}
              Width={"-webkit-fill-available"}
              BGColor={`${theme.palette.button.primary}`}
              BGHover={`${theme.palette.hover.primary}`}
            />
          </Grid>
          <Grid mt={1} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="p">
              Already have an account?{" "}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: theme.palette.button.primary,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {openModal && (
        <FormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          width={700}
          height={"auto"}
          maxHeight={"80vh"}
          header={"SMS Verification"}
          formComponent={
            <>
              <OtpVerification
                open={openModal}
                onClose={() => setOpenModal(false)}
              />
            </>
          }
        />
      )}
      <style>
        {`
          .css-jhdc2n-MuiGrid-root, .css-1xbz73f {
             margin-top: 0px;
           }
     `}
      </style>
    </div>
  );
};

export default NewSignUpPage;
