import React, { useState } from "react";
import FormModal from "../../../../../components/formModal/FormModal";
import PaymentModal from "./PaymentModal";
import { Stack, Typography, useTheme } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const PaymentMethod = () => {
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentSelectMethod = (i) => {
    setSelectedPaymentMethod(i);
  };

  const handlePaymentClick = () => {
    setPaymentMethod(true);
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
            <span style={{fontSize: "0.9rem", fontWeight: "500", color: theme.palette.text.secondary}}>Choose Payment Method</span>
            {selectedPaymentMethod?.title || "Bank Transfer"}
          </Typography>
        </div>

        <Typography
          variant="p"
          sx={{
            fontSize: "1.4rem",
            fontWeight: "500",
            color: theme.palette.background.main,
          }}
          onClick={handlePaymentClick}
        >
          Change
        </Typography>
      </Stack>
      {paymentMethod && (
        <FormModal
          open={paymentMethod}
          onClose={() => setPaymentMethod(false)}
          width={700}
          height={"85vh"}
          overflow={"scroll"}
          header={"Choose Payment Method"}
          formComponent={
            <PaymentModal
              open={paymentMethod}
              onClose={() => setPaymentMethod(false)}
              onSelectPaymentMethod={handlePaymentSelectMethod}
            />
          }
        />
      )}
    </>
  );
};

export default PaymentMethod;
