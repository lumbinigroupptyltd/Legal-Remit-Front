import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WalletIcon from "@mui/icons-material/Wallet";
import PaymentsIcon from "@mui/icons-material/Payments";
import { CButton } from "../../../../../components/MaterialUI/CButton";
import { useGetPaymentMethodDetails } from "../../../../../hooks/sendMoney/payment/usePaymentMethod";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const PaymentModal = ({
  onSelectPaymentMethod,
  onClose,
  data,
  exchangeRate,
  sendMoney,
}) => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const { data: paymentMethodData } = useGetPaymentMethodDetails();

  useEffect(() => {
    if (data) {
      setSelectedItem(data);
    }
  }, [data]);

  useEffect(() => {
    const isDataMatching = () => {
      if (data) {
        return selectedItem?.id === data.id;
      }
      return false;
    };
    isDataMatching();
  }, [selectedItem, data]);

  const paymentTypeIcons = {
    PayTo: (
      <AccountBalanceIcon
        sx={{
          fontSize: "2.2rem",
          color: theme.palette.background.main,
        }}
      />
    ),
    "Bank Transfer": (
      <AccountBalanceIcon
        sx={{
          fontSize: "2.2rem",
          color: theme.palette.background.main,
        }}
      />
    ),
    "Debit Card": (
      <WalletIcon
        sx={{
          fontSize: "2.2rem",
          color: theme.palette.background.main,
        }}
      />
    ),
    "Credit Card": (
      <WalletIcon
        sx={{
          fontSize: "2.2rem",
          color: theme.palette.background.main,
        }}
      />
    ),
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleFormSubmit = () => {
    onSelectPaymentMethod(selectedItem);
    onClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {paymentMethodData &&
        paymentMethodData?.data?.map((item) => (
          <Stack
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "2rem",
              borderRadius: "2rem",
              padding: "2rem",
              backgroundColor:
                selectedItem?.id === item.id
                  ? theme.palette.primary.light
                  : theme.palette.background.light,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              position: "relative",
            }}
            onClick={() => handleItemClick(item)}
          >
            {paymentTypeIcons[item?.paymentType?.name]}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "600" }}>
                {item?.paymentType?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "400",
                  color: theme.palette.text.secondary,
                }}
              >
                {item?.rate} {sendMoney} AUD = {sendMoney * exchangeRate} NPR
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                Total Receivable : {sendMoney * (exchangeRate - item?.charge)} NPR
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                Total Service Charge : {item?.charge} AUD
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                Total Payable : {sendMoney} AUD
              </Typography>
            </Box>
            {selectedItem?.id === item.id && (
              <CheckCircleOutlineIcon
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "2.2rem",
                  color: theme.palette.background.main,
                }}
              />
            )}
          </Stack>
        ))}

      <CButton
        buttonName={"SELECT"}
        OnClick={handleFormSubmit}
        variant={"contained"}
        Width={"full-width"}
        TextColor={"#000"}
        TextColorHover={"#fff"}
        Border={`1px solid ${theme.palette.button.primary}`}
        BGColor={`${theme.palette.background.default}`}
        BGHover={`${theme.palette.hover.primary}`}
      />
    </Box>
  );
};

export default PaymentModal;
