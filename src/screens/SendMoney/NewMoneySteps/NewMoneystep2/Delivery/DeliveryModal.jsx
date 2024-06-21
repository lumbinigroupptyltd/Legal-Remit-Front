import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WalletIcon from "@mui/icons-material/Wallet";
import PaymentsIcon from "@mui/icons-material/Payments";
import { CButton } from "../../../../../components/MaterialUI/CButton";
import { useGetDeliveryMethodDetails } from "../../../../../hooks/sendMoney/delivery/useDeliveryMethod";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const DeliveryModal = ({ onSelectDeliveryMethod, onClose, data }) => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const { data: deliveryMethodData } = useGetDeliveryMethodDetails();

  const deliveryTypeIcons = {
    "Bank Deposit": (
      <AccountBalanceIcon
        sx={{
          fontSize: "2.2rem",
          color: theme.palette.background.main,
        }}
      />
    ),
    "Cash Pickup": (
      <PaymentsIcon
        sx={{
          fontSize: "2.2rem",
          color: theme.palette.background.main,
        }}
      />
    ),
    "Wallet Deposit": (
      <WalletIcon
        sx={{
          fontSize: "2.2rem",
          color: theme.palette.background.main,
        }}
      />
    ),
  };

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

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleFormSubmit = () => {
    onSelectDeliveryMethod(selectedItem);
    onClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {deliveryMethodData &&
        deliveryMethodData?.data?.map((item) => (
          <Stack
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "2rem",
              borderRadius: "2rem",
              padding: "1rem 2rem",
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
            {deliveryTypeIcons[item.deliveryType.name]}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "600" }}>
                {item.deliveryType?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  color: theme.palette.text.secondary,
                }}
              >
                {item.rate} 1AUD = 0.87 NPR
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                Total Receivable : 0.87 NPR
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                Total Service Charge : 0.87 NPR
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                Total Payable : 0.87 NPR
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                Estimated Days : {item?.estimatedDelivery} Days
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

export default DeliveryModal;
