import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../../../components/RenderInput/RenderInput";
import { recipientContactDetailsForm } from "../../../../../forms/sendmoney/recipient/recipientForm";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { CButton } from "../../../../../components/MaterialUI/CButton";
import { useGetRelation } from "../../../../../hooks/sendMoney/relation/useRelation";

const RecipientContactDetails = ({ onFormValidate, data, userId }) => {
  const theme = useTheme();
  const { data: relationData } = useGetRelation();
  const { formik } = recipientContactDetailsForm(onFormValidate, data, userId);

  const GET_RELATION_DATA =
  relationData &&
  relationData.data.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const inputField = [
    {
      id: nanoid(),
      name: "address",
      name1: "district",
      name2: "stateName",
      name3: "city",
      name4: "postalCode",
      label: "Address",
      type: "AsyncDropDownSearchNepal",
      // required: true,
      isStreet: true,
      iconStart: <PersonIcon />,
      md: 6,
      sm: 12,
      xs: 12,
    },
    {
      id: nanoid(),
      name: "district",
      label: "District",
      type: "text",
      required: true,
      iconStart: <PersonIcon />,
      md: 6,
      sm: 12,
      xs: 12,
    },
    {
      id: nanoid(),
      name: "stateName",
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
      name: "city",
      label: "House No./Street Name",
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
      max: 10,
      md: 6,
      sm: 12,
      xs: 12,
    },
    {
      id: nanoid(),
      name: "relationId",
      label: "Relation",
      type: "dropDown",
      options: GET_RELATION_DATA,
      required: true,
      iconStart: <PersonIcon />,
      md: 6,
      sm: 12,
      xs: 12,
    },
  ];

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
