import React from "react";
import { nanoid } from "nanoid";
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
import RenderInput from "../../../components/RenderInput/RenderInput";
import { useKycBusinessProfileForm } from "../../../hooks/profile/Business/useProfileDetailsBusinessForm";

const KycBusinessProfile = () => {
  const theme = useTheme();
  const { data: nationalityData } = useGetUserNationality();
  const { data: allStatesData } = useGetUserAllStates();
  const { data: allOccupationsData } = useGetAllOccupations();
  const { formik } = useKycBusinessProfileForm();
  const handleFormSubmit = () => {
    console.log("success");
  };
  const nationData = nationalityData && nationalityData?.data;
  const stateData = allStatesData && allStatesData?.data;
  const occuData = allOccupationsData && allOccupationsData?.data;
  const GET_NATIONALITY =
    nationData &&
    nationData?.map((item) => ({
      value: item.nationality,
      label: item.passToMg,
    }));
  const GET_ALL_STATES =
    stateData &&
    stateData?.map((item) => ({
      value: item.name,
      label: item.name,
    }));
  const GET_ALL_OCCUPATIONS =
    occuData &&
    occuData?.map((item) => ({
      value: item.name,
      label: item.name,
    }));

  const basicInputData = [
    {
      name: "nationality",
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
      name: "houseNo",
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
      name: "city",
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
      name: "postal",
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
      name: "state",
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
      name: "occupation",
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

export default KycBusinessProfile;
