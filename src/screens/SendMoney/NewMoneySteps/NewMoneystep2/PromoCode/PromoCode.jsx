import React, { useState } from "react";
import RedeemIcon from "@mui/icons-material/Redeem";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import PromocodeModal from "./PromocodeModal";
import FormModal from "../../../../../components/formModal/FormModal";

const PromoCode = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
          marginLeft: "3rem",
          color: theme.palette.background.main,
        }}
      >
        <RedeemIcon sx={{ fontSize: "2rem" }} />
        <Typography variant="p" sx={{fontSize: "1.2rem", fontWeight: "500", cursor: "pointer"}} onClick={handleClick}>
          Apply Promocode
        </Typography>
      </Stack>

      {openModal && (
        <FormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          width={700}
          // height={"85vh"}
          // overflow={"scroll"}
          header={"Apply Promocode"}
          formComponent={
            <PromocodeModal
              open={openModal}
              onClose={() => setOpenModal(false)}
            />
          }
        />
      )}
    </>
  );
};

export default PromoCode;
