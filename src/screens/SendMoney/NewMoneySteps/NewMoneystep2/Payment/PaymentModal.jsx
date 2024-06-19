import React, { useState } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WalletIcon from "@mui/icons-material/Wallet";
import PaymentsIcon from "@mui/icons-material/Payments";
import { CButton } from "../../../../../components/MaterialUI/CButton";
import { useGetPaymentMethodDetails } from "../../../../../hooks/sendMoney/payment/usePaymentMethod";

const PaymentModal = ({ onSelectPaymentMethod, onClose }) => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const { data: paymentMethodData } = useGetPaymentMethodDetails();

  const data = [
    {
      id: 1,
      icon: (
        <AccountBalanceIcon
          sx={{
            fontSize: "2.2rem",
            color: theme.palette.background.main,
          }}
        />
      ),
      title: "PayTo",
      rate: "Exchange rate : ",
      receivable: "Total Receivable : ",
      charge: "Total Service Charge : ",
      payable: "Total Payable : ",
    },
    {
      id: 2,
      icon: (
        <WalletIcon
          sx={{
            fontSize: "2.2rem",
            color: theme.palette.background.main,
          }}
        />
      ),
      title: "Debit Card",
      rate: "Exchange rate : ",
      receivable: "Total Receivable : ",
      charge: "Total Service Charge : ",
      payable: "Total Payable : ",
    },
    {
      id: 3,
      icon: (
        <PaymentsIcon
          sx={{
            fontSize: "2.2rem",
            color: theme.palette.background.main,
          }}
        />
      ),
      title: "PayID",
      rate: "Exchange rate : ",
      receivable: "Total Receivable : ",
      charge: "Total Service Charge : ",
      payable: "Total Payable : ",
    },
    {
        id: 4,
        icon: (
          <PaymentsIcon
            sx={{
              fontSize: "2.2rem",
              color: theme.palette.background.main,
            }}
          />
        ),
        title: "Bank Transfer",
        rate: "Exchange rate : ",
        receivable: "Total Receivable : ",
        charge: "Total Service Charge : ",
        payable: "Total Payable : ",
      },
      {
        id: 5,
        icon: (
          <PaymentsIcon
            sx={{
              fontSize: "2.2rem",
              color: theme.palette.background.main,
            }}
          />
        ),
        title: "POLI",
        rate: "Exchange rate : ",
        receivable: "Total Receivable : ",
        charge: "Total Service Charge : ",
        payable: "Total Payable : ",
      },
      {
        id: 6,
        icon: (
          <PaymentsIcon
            sx={{
              fontSize: "2.2rem",
              color: theme.palette.background.main,
            }}
          />
        ),
        title: "CreditCard",
        rate: "Exchange rate : ",
        receivable: "Total Receivable : ",
        charge: "Total Service Charge : ",
        payable: "Total Payable : ",
      },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleFormSubmit = () => {
    onSelectPaymentMethod(selectedItem);
    onClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {data.map((item) => (
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
          }}
          onClick={() => handleItemClick(item)}
        >
          {item.icon}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {item.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "400",
                color: theme.palette.text.secondary,
              }}
            >
              {item.rate} 1AUD = 0.87 NPR
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {item.receivable} 0.87 NPR
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {item.charge} 0.87 NPR
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {item.payable} 0.87 NPR
            </Typography>
          </Box>
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
