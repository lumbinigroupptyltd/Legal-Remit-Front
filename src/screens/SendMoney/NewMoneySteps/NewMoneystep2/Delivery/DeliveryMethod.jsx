import { Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import FormModal from "../../../../../components/formModal/FormModal";
import DeliveryModal from "./DeliveryModal";
import { useDispatch } from "react-redux";
import { sendMoneyDeliveryMethod } from "../../../../../redux/actions";


const DeliveryMethod = ({ method }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [deliveryMethod, setDeliveryMethod] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");

  const handleDeliverySelectMethod = (i) => {
    dispatch(sendMoneyDeliveryMethod(i));
    setSelectedDeliveryMethod(i);
  };

  const handleDeliveryClick = () => {
    setDeliveryMethod(true);
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0 3rem",
          justifyContent: "space-between",
          border: `1px solid ${theme.palette.border.light}`,
          borderRadius: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="p" sx={{ fontSize: "1rem", fontWeight: "500" }}>
            <CreditCardIcon
              sx={{
                fontSize: "2.2rem",
                color: theme.palette.background.main,
              }}
            />
          </Typography>
          <Typography
            variant="p"
            sx={{ fontSize: "1.4rem", fontWeight: "500", display: "flex", flexDirection: "column" }}
          >
            <span style={{fontSize: "0.9rem", fontWeight: "500", color: theme.palette.text.secondary}}>Choose Delivery Method</span>
            {selectedDeliveryMethod?.deliveryType?.name || method?.deliveryType?.name}
          </Typography>
        </div>

        <Typography
          variant="p"
          sx={{
            fontSize: "1.4rem",
            fontWeight: "500",
            color: theme.palette.background.main,
          }}
          onClick={handleDeliveryClick}
        >
          Change
        </Typography>
      </Stack>
      {deliveryMethod && (
        <FormModal
          open={deliveryMethod}
          onClose={() => setDeliveryMethod(false)}
          width={700}
          height={"auto"}
          maxHeight={"80vh"}
          header={"Choose Delivery Method"}
          formComponent={
            <DeliveryModal
              open={deliveryMethod}
              onClose={() => setDeliveryMethod(false)}
              onSelectDeliveryMethod={handleDeliverySelectMethod}
            />
          }
        />
      )}
    </>
  );
};

export default DeliveryMethod;
