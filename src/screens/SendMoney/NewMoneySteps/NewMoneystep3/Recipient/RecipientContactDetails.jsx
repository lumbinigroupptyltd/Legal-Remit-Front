import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../../../components/RenderInput/RenderInput";
import { recipientContactDetailsForm } from "../../../../../forms/sendmoney/recipient/recipientForm";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { CButton } from "../../../../../components/MaterialUI/CButton";

const inputField = [
  {
    id: nanoid(),
    name: "address",
    label: "Address",
    type: "text",
    required: true,
    iconStart: <PersonIcon />,
    md: 6,
    sm: 12,
    xs: 12,
  },
  {
    id: nanoid(),
    name: "city",
    label: "City/District",
    type: "text",
    required: true,
    iconStart: <PersonIcon />,
    md: 6,
    sm: 12,
    xs: 12,
  },
  {
    id: nanoid(),
    name: "stateId",
    label: "State/Province",
    type: "text",
    required: true,
    iconStart: <PersonIcon />,
    md: 6,
    sm: 12,
    xs: 12,
  },
  {
    id: nanoid(),
    name: "postalCode",
    label: "Postal Code",
    type: "text",
    required: true,
    iconStart: <AccountBalanceIcon />,
    md: 6,
    sm: 12,
    xs: 12,
  },
  {
    id: nanoid(),
    name: "phone",
    label: "Mobile",
    type: "text",
    required: true,
    iconStart: <AccountBalanceIcon />,
    md: 6,
    sm: 12,
    xs: 12,
  },
  {
    id: nanoid(),
    name: "relationId",
    label: "Relation",
    type: "dropDown",
    options: [
      {
        id: nanoid(),
        label: "Father",
        value: "Father",
      },
      {
        id: nanoid(),
        label: "Mother",
        value: "Mother",
      },
      {
        id: nanoid(),
        label: "Brother",
        value: "Brother",
      },
      {
        id: nanoid(),
        label: "Sister",
        value: "Sister",
      },
      {
        id: nanoid(),
        label: "Friend",
        value: "Friend",
      },
    ],
    required: true,
    iconStart: <PersonIcon />,
    md: 6,
    sm: 12,
    xs: 12,
  },
];

const RecipientContactDetails = ({ onFormValidate, data }) => {
  const theme = useTheme();

  const { formik } = recipientContactDetailsForm(onFormValidate, data);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="p"
            sx={{
              color: theme.palette.background.main,
              fontSize: "3rem",
              fontWeight: "600",
            }}
          >
            Add Recipient
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Contact Details
          </Typography>
        </Grid>

      </Grid>
        <RenderInput inputField={inputField} formik={formik} />
      <Grid
        item
        xs={12}
        md={12}
        mt={2}
        sx={{ display: "flex", justifyContent: "end" }}
      >
        <CButton
          buttonName={"Add"}
          OnClick={handleFormSubmit}
          variant={"contained"}
          fullWidth={"fullWidth"}
          Width={"fit-content"}
          padding={"0 2rem"}
          BGColor={theme.palette.button.primary}
          BGHover={`${theme.palette.hover.primary}`}
        />
      </Grid>
    </>
  );
};

export default RecipientContactDetails;