import { Button, Grid, useTheme, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { recipientTypeForm } from "../../../../../forms/sendmoney/recipient/recipientForm";
import { useSelector } from "react-redux";
import { useGetRecipientTypeDetails } from "../../../../../hooks/sendMoney/recipient/useRecipientType";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const recipientIconMapping = {
  "Send to Individual Account": <PersonIcon sx={{ fontSize: "2rem" }} />,
  "Send to Joint Account": <PeopleIcon sx={{ fontSize: "2rem" }} />,
  "Send to Business Account": <BusinessCenterIcon sx={{ fontSize: "2rem" }} />,
};

const RecipientType = ({ onFormValidate }) => {
  const theme = useTheme();
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const { data: getRecipientTypeData } = useGetRecipientTypeDetails();
  const { recipientType } = useSelector((state) => state?.sendMoney);
  const { formik } = recipientTypeForm(onFormValidate, selectedRecipient);

  useEffect(() => {
    if (!selectedRecipient && recipientType) {
      setSelectedRecipient(recipientType?.recipientId);
      onFormValidate(true);
    }
  }, [recipientType]);

  const handleRecipientSelect = (id) => {
    setSelectedRecipient(id);
    formik.handleSubmit();
  };

  const GET_RECIPIENT_DATA =
    getRecipientTypeData &&
    getRecipientTypeData?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
      icon: recipientIconMapping[item?.name] || (
        <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
      ),
    }));

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      data-aos="zoom-in-right"
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
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.background.main,
            fontSize: "3rem",
            fontWeight: "600",
          }}
        >
          Add Recipient
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", fontWeight: "400" }}
        >
          Select recipient type
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
        }}
      >
        {GET_RECIPIENT_DATA?.map((item) => (
          <Box
            key={item?.value}
            onClick={() => handleRecipientSelect(item?.value)}
            sx={{
              fontSize: "1.2rem",
              fontWeight: "500",
              background: theme.palette.primary.light,
              padding: "1rem 3rem",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              width: "100%",
              cursor: "pointer",
              border:
                selectedRecipient === item?.value
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: theme.palette.background.main }}
            >
              {item?.icon}
            </Typography>
            <Typography variant="body1">{item?.label}</Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default RecipientType;
