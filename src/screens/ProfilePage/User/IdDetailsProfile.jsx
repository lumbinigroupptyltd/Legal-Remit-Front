import React from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Grid, Typography, useTheme } from "@mui/material";
import { useGetUserIdDetailsByUserId } from "../../../hooks/profile/User/userId/useUserIdDetails";
import { useGetUserDocumentsTypeDetails } from "../../../hooks/profile/User/userDocument/useUserDocumentDetails";
import { useUserIdDetailsForm } from "../../../forms/profile/user/userBasicDetailsForm";
import { useGetIdIssuingAuthority } from "../../../hooks/issueAuthority/useIssueAuthorityDetails";
import { CButton } from "../../../components/MaterialUI/CButton";

const IdDetailsProfile = ({ userId, userIdData }) => {
  const theme = useTheme();
  const { data: authorityData } = useGetIdIssuingAuthority();
  const { data: userIdDetails } = useGetUserIdDetailsByUserId(userId);
  const userData = userIdDetails && userIdDetails?.data?.[0];
  const { data: docTypeData } = useGetUserDocumentsTypeDetails();
  const { formik } = useUserIdDetailsForm({ userId, userData });
  const auData = authorityData && authorityData?.data;
  console.log(userIdData, "user");
  const ID_TYPE = docTypeData?.data
    ?.filter(
      (doc) =>
        doc.name === "Passport" ||
        doc.name === "Driving License" ||
        doc.name === "Citizenship"
    )
    ?.map((item) => ({
      value: item.id,
      label: item.name,
    }));

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
      isCapital: true,
      type: "text",
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
      type: "text",
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
      maxDate: true,
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
      disablePast: true,
      iconStart: <DateRangeIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
  ];
  console.log(userIdData?.isSuspectedDuplicate, "userIdData?.isDuplicate ");
  return (
    <Grid container>
      {(userIdData?.isDuplicate || userIdData?.isSuspectedDuplicate) && (
        <Grid item mb={2}>
          <Typography variant="p" sx={{ color: theme.palette.text.warning }}>
            ID details is suspected to be duplicate. Please re-check your ID details number. Please get in touch with customer service at +61419850130, or info@legalremit.com for any assistance.
          </Typography>
        </Grid>
      )}
       {(userIdData?.isSuspectedDuplicate) && (
        <Grid item mb={2}>
          <Typography variant="p" sx={{ color: theme.palette.text.warning }}>
            User Name and Date of birth is suspected to be duplicate. Please reconfirm & ignore if you have filled correctly. Please get in touch with customer service at +61419850130, or info@legalremit.com for any assistance.
          </Typography>
        </Grid>
      )}
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
          buttonName={userData?.id ? "UPDATE" : "ADD"}
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
