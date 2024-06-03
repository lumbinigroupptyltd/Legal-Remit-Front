import React from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { CButton } from "../../../components/UIElements/CButton";
import { Grid, useTheme } from "@mui/material";
import { useGetIdIssuingAuthority } from "../../../hooks/apiStartGetAll/useGetAllUserInfo";
import { useIdDetailsProfileForm } from "../../../hooks/profile/User/useProfileDetailsForm";
import { useGetUserIdDetails } from "../../../hooks/profile/User/useProfileDetails";

const ID_TYPE = [
  {
    id: nanoid(),
    label: "Passport",
    value: "passport",
  },
  {
    id: nanoid(),
    label: "Driving License",
    value: "drivinglicense",
  },
];

const IdDetailsProfile = ({userId}) => {
  const theme = useTheme();
  const { data: authorityData } = useGetIdIssuingAuthority();
  const { data: userIdDetails } = useGetUserIdDetails(userId);
  const userData = userIdDetails && userIdDetails?.data;
  const { formik } = useIdDetailsProfileForm({ userId });
  const auData = authorityData && authorityData?.data;

  const GET_AUTHORITY =
    auData &&
    auData?.map((item) => ({
      value: item?.id,
      label: item?.authorityName,
    }));

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const basicInputData = [
    {
      name: "issueAuthorityId",
      label: "ID Issuing Authority",
      required: true,
      type: "dropDown",
      options: GET_AUTHORITY,
      iconStart: <AccountBalanceIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "documentTypeId",
      label: "ID Type",
      required: true,
      type: "dropDown",
      options: ID_TYPE,
      iconStart: <CreditCardIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "documentNumber",
      label: "Id Number",
      required: true,
      type: "onlyNumber",
      iconStart: <CreditCardIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "cardNumber",
      label: "Card Number",
      required: true,
      type: "onlyNumber",
      iconStart: <CreditCardIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "dob",
      label: "Date Of Birth",
      required: true,
      type: "datePicker",
      iconStart: <DateRangeIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "documentValidity",
      label: "Date Of ID Expiry",
      required: true,
      type: "datePicker",
      iconStart: <DateRangeIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    // {
    //   name: "verification",
    //   label: "Choose ID Verification",
    //   type: "switch",
    //   col: 12,
    //   id: nanoid(),
    //   required: true,
    //   display: "flex",
    //   direction: "column",
    //   justify: "start",
    //   hasRadio: true,
    //   radioName: "verification",
    //   radioLabel:
    //     "It is recommended to choose Digital Verification for faster process",
    //   // radioDisplay: "flex",
    //   // radioDirection: "row",
    //   // radioAlign: "center",
    //   // radioGap: "16px",
    //   radio: [
    //     {
    //       value: "digital",
    //       label: "Digital Verification",
    //       id: nanoid(),
    //     },
    //     {
    //       value: "manual",
    //       label: "Manual Verification (Slower Method)",
    //       id: nanoid(),
    //     },
    //   ],
    // },
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

export default IdDetailsProfile;
