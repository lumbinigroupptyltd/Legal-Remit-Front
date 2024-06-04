import React, { useEffect } from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import { useKycDetailsProfileForm } from "../../../hooks/profile/User/useProfileDetailsForm";
import FlagIcon from "@mui/icons-material/Flag";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { CButton } from "../../../components/UIElements/CButton";
import { Grid, useTheme } from "@mui/material";
import {
  useGetAllOccupations,
  useGetUserAllStates,
  useGetUserNationality,
} from "../../../hooks/apiStartGetAll/useGetAllUserInfo";
import { useGetUserKycDetails } from "../../../hooks/profile/User/useProfileDetails";

const RESIDANCE_OPTIONS = [
  { id: nanoid(), value: "true", label: "Yes" },
  { id: nanoid(), value: "false", label: "No" },
];

const KycDetailsProfile = ({ userId}) => {
  const theme = useTheme();
  const { data: nationalityData } = useGetUserNationality();
  const { data: allStatesData } = useGetUserAllStates();
  const { data: allOccupationsData } = useGetAllOccupations();
  const { data: userKycData } = useGetUserKycDetails(userId);
  const data = userKycData && userKycData?.data?.[0];

  const stateData = allStatesData && allStatesData?.data;
  const countryId = stateData && stateData?.[0]?.country?.id
  const { formik } = useKycDetailsProfileForm({ data, userId, countryId});
  
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const nationData = nationalityData && nationalityData?.data;
 
  const occuData = allOccupationsData && allOccupationsData?.data;
  const GET_NATIONALITY =
    nationData &&
    nationData?.map((item) => ({
      value: item.id,
      label: item.nationality,
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
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "streetName",
      label: "House No & Street Name",
      required: true,
      type: "text",
      iconStart: <HouseIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "suburb",
      label: "Subarb / City",
      required: true,
      type: "text",
      iconStart: <LocationOnIcon />,
      id: nanoid(),
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
      md: 6,
      sm: 6,
      xs: 12,
    },
    // {
    //   name: "isResidence",
    //   label: "Is Residance of Australia",
    //   required: true,
    //   type: "dropDown",
    //   options: RESIDANCE_OPTIONS,
    //   iconStart: <BusinessCenterIcon />,
    //   id: nanoid(),
    //   md: 6,
    //   sm: 6,
    //   xs: 12,
    // },
  ];

  async function fetchCity() {
    const latitude = -35.2809;
    const longitude = 149.1300;
    const apiKey = 'AIzaSyCNJRR1zkMpq2RLpT6bM2BLAO2kEDZ8qtA';
  
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchCity();
  
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
