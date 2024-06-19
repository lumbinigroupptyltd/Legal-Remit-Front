import React, { useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import { nanoid } from "nanoid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Recipient from "./Recipient/Recipient";
import { useSendMoneyStep3Form } from "../../../../forms/sendmoney/useSendMoneyForm";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import FormModal from "../../../../components/formModal/FormModal";

const NewMoneyStep3 = ({ handleNext }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState();
  const { formik } = useSendMoneyStep3Form(handleNext);

  const inputData = [
    {
      id: nanoid(),
      name: "search",
      label: "Search Recipient",
      type: "dropDown",
      required: true,
      md: 12,
      sm: 12,
    },
  ];
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="p"
          mt={3}
          sx={{
            color: theme.palette.background.main,
            fontSize: "2.2rem",
            fontWeight: "700",
          }}
        >
          Send Money
        </Typography>
        <Typography variant="p">
          Select receiver to whom you are transfering money.
        </Typography>
        <Grid
          item
          xs={10}
          sm={10}
          md={10}
          mt={5}
          mb={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                justifyContent: "end",
                gap: "0.3rem",
                "&:hover": {
                  background: theme.palette.background.main,
                  color: "#fff",
                },
              }}
            >
              <AddCircleOutlineIcon /> ADD RECIPIENT
            </Button>
          </Box>
          <RenderInput inputField={inputData} formik={formik} />
          <Button
            onClick={handleFormSubmit}
            variant={"contained"}
            sx={{ padding: "8px 24px", borderRadius: "24px", fontSize: "1rem" }}
          >
            Next
          </Button>
        </Grid>
      </Grid>

      {openModal && (
        <FormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          width={700}
          height={"auto"}
          header={"Add Recipient"}
          formComponent={
            <>
              <Recipient onClose={() => setOpenModal(false)} />
            </>
          }
        />
      )}
    </Grid>
  );
};

export default NewMoneyStep3;
