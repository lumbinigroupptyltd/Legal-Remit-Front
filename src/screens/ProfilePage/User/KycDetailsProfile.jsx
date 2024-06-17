import React, { useEffect, useState } from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import FlagIcon from "@mui/icons-material/Flag";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { Grid, useTheme } from "@mui/material";
import { useGetUserAllStates } from "../../../hooks/state/useStateDetails";
import { useGetAllOccupations } from "../../../hooks/occupation/useOccupationDetails";
import { useGetUserKycDetailsByUserId } from "../../../hooks/profile/User/userKyc/useUserKycDetails";
import { useUserKycDetailsForm } from "../../../forms/profile/user/userBasicDetailsForm";
import { useGetUserNationality } from "../../../hooks/nationality/useNationalityDetails";
import { CButton } from "../../../components/MaterialUI/CButton";

const KycDetailsProfile = ({ userId }) => {
  const theme = useTheme();
  const { data: nationalityData } = useGetUserNationality();
  const { data: allStatesData } = useGetUserAllStates();
  const { data: allOccupationsData } = useGetAllOccupations();
  const { data: userKycData } = useGetUserKycDetailsByUserId(userId);

  const data = userKycData && userKycData?.data?.[0];
  const nationData = nationalityData && nationalityData?.data;
  const occuData = allOccupationsData && allOccupationsData?.data;
  const stateData = allStatesData && allStatesData?.data;
  const countryId = stateData && stateData?.[0]?.country?.id;

  const { formik } = useUserKycDetailsForm({ data, userId, countryId });

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const GET_NATIONALITY =
    nationData &&
    nationData?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  const GET_ALL_STATES =
    stateData &&
    stateData?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  const GET_ALL_OCCUPATIONS =
    occuData &&
    occuData?.map((item) => ({
      value: item.id,
      label: item.name,
    }));

  const basicInputData = [
    {
      name: "nationalityId",
      label: "Nationality",
      required: true,
      type: "dropDown",
      options: GET_NATIONALITY,
      iconStart: <FlagIcon />,
      id: nanoid(),
      lg: 6,
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "streetName",
      name1: "suburb",
      name2: "postalCode",
      label: "House No & Street Name",
      required: true,
      isStreet: true,
      type: "AsyncDropDownSearchStreet",
      iconStart: <HouseIcon />,
      id: nanoid(),
      lg: 6,
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "suburb",
      // name1: "streetName",
      label: "Subarb / City",
      required: true,
      type: "text",
      // options: GET_CITY_DATA,
      iconStart: <LocationOnIcon />,
      id: nanoid(),
      lg: 6,
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "postalCode",
      label: "Postal / Zip Code",
      required: true,
      type: "text",
      iconStart: <EmailIcon />,
      id: nanoid(),
      lg: 6,
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "stateId",
      label: "State",
      required: true,
      type: "dropDown",
      options: GET_ALL_STATES,
      iconStart: <LocationOnIcon />,
      id: nanoid(),
      lg: 6,
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "occupationId",
      label: "Occupation",
      required: true,
      type: "dropDown",
      options: GET_ALL_OCCUPATIONS,
      iconStart: <BusinessCenterIcon />,
      id: nanoid(),
      lg: 6,
      md: 6,
      sm: 6,
      xs: 12,
    },
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
      </Grid>
    </Grid>
  );
};

export default KycDetailsProfile;
