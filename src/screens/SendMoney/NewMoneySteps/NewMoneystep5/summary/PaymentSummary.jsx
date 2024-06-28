import { Box, Grid, Typography, Stack, useTheme, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Person } from "@mui/icons-material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useSelector } from "react-redux";
import PaymentMethod from "../../NewMoneystep2/Payment/PaymentMethod";
import { useGetAllCountries } from "../../../../../hooks/country/useCountryDetails";
import RenderInput from "../../../../../components/RenderInput/RenderInput";
import { useSendMoneyStep5Form } from "../../../../../forms/sendmoney/useSendMoneyForm";
import { nanoid } from "nanoid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const PaymentSummary = ({ handleNext }) => {
  const theme = useTheme();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { sendMoneyAllData } = useSelector((state) => state.sendMoney);
  const sendMoneyPaymentMethod = sendMoneyAllData && sendMoneyAllData?.sendMoneyPaymentMethod;
  const sendMoneyDeliveryMethod = sendMoneyAllData && sendMoneyAllData?.sendMoneyDeliveryMethod;
  const sendMoney = sendMoneyAllData && sendMoneyAllData?.addSendReceiveMoney;
  const resMoney = sendMoneyAllData && sendMoneyAllData?.resMoney;
  const exchangeRate = sendMoneyAllData && sendMoneyAllData?.addExchangeRate;
  const { data: allCountriesData } = useGetAllCountries();
console.log(sendMoney, "money")
  const { formik } = useSendMoneyStep5Form(handleNext, sendMoney, resMoney);

  useEffect(() => {
    const receiveMoney = sendMoney ? sendMoney * exchangeRate : "";
    formik.setFieldValue("resMoney", receiveMoney);
  }, [sendMoney, exchangeRate]);

  const image = `https://flagcdn.com/16x12/au.png`;
  const image2 = selectedCountry?.flag
    ? `https://flagcdn.com/16x12/${selectedCountry?.flag?.toLowerCase()}.png`
    : `https://flagcdn.com/16x12/np.png`;

  const GET_ALL_COUNTRY =
  allCountriesData &&
  allCountriesData?.data?.map((item) => ({
    value: item.currency,
    label: item.name,
    flag: item?.iso2,
    id: item?.id,
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const sendMoneyInputData = [
    {
      name: "amount",
      name1: "countryName",
      label: "You Send",
      type: "text",
      iconStart: image,
      id: nanoid(),
      isFLag: true,
      isImage: true,
      hasDoubleValue: true,
      required: true,
      responseLabel: "name",
      responseId: "id",
      responseCode: "phoneCode",
      md: 12,
      sm: 12,
    },
  ];
  const receiveMoneyInputData = [
    {
      name: "resMoney",
      label: "You Recieve",
      type: "text",
      isDisabled: true,
      iconStart: image2,
      id: nanoid(),
      isFLag: true,
      isImage: true,
      hasDoubleValue: true,
      required: true,
      md: 12,
      sm: 12,
    },
  ];

  return (
    <>
      <Grid
        item
        md={12}
        sm={12}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.background.main}`,
        }}
      >
        <Typography
          variant="p"
          sx={{
            display: "flex",
            color: theme.palette.background.main,
            fontSize: "1.6rem",
            fontWeight: "500",
          }}
        >
          Recipient Payment Method
        </Typography>
        <CheckCircleOutlineIcon
          sx={{ fontSize: "1.6rem", color: theme.palette.background.main }}
        />
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "-webkit-fill-available",
        }}
      >
        <Box sx={{background: theme.palette.primary.light, borderRadius: "2rem"}}>
        <PaymentMethod method={sendMoneyPaymentMethod} exchangeRate={exchangeRate} />
        </Box>

        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.background.main}`,
          }}
        >
          <Typography
            variant="p"
            sx={{
              display: "flex",
              color: theme.palette.background.main,
              fontSize: "1.6rem",
              fontWeight: "500",
            }}
          >
            Recipient Payment Summary
          </Typography>
        </Grid>

        <Box
            sx={{
              background: theme.palette.primary.light,
              borderRadius: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                border: `1px solid ${theme.palette.border.light}`,
                borderRadius: "2rem",
                padding: "0.4rem 2rem",
                margin: "1.3rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  <RenderInput
                    inputField={sendMoneyInputData}
                    formik={formik}
                  />
                </div>
              </div>
              <div>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  AUD <KeyboardArrowDownIcon />
                </Typography>
              </div>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                background: theme.palette.background.main,
                color: "#fff",
                padding: "1rem 0",
              }}
            >
              <Typography
                variant="p"
                sx={{ fontSize: "1.2rem", fontWeight: "400" }}
              >
                Exchange rate : 10 AUD = {(exchangeRate)*10} NPR
              </Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                border: `1px solid ${theme.palette.border.light}`,
                borderRadius: "2rem",
                padding: "0.4rem 2rem",
                margin: "1.3rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  <RenderInput
                    inputField={receiveMoneyInputData}
                    formik={formik}
                  />
                </div>
              </div>
              <div>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleClick}
                >
                  {selectedCountry ? selectedCountry.label : "NPR"}{" "}
                  <KeyboardArrowDownIcon />
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  PaperProps={{
                    style: {
                      maxHeight: 200,
                      width: 200,
                    },
                  }}
                >
                  {GET_ALL_COUNTRY &&
                    GET_ALL_COUNTRY.map((country) => (
                      <MenuItem
                        key={country.label}
                        onClick={() => handleCountrySelect(country)}
                      >
                        {country.label}
                      </MenuItem>
                    ))}
                </Menu>
              </div>
            </Stack>
          </Box>

        <div style={{ background: theme.palette.primary.light, borderRadius: "2rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.4rem 1rem 0 1rem"
              }}
            >
              <Typography
                variant="p"
                sx={{ fontSize: "1.2rem", fontWeight: "400" }}
              >
                Service Charge :
              </Typography>
              <Typography
                variant="p"
                sx={{ fontSize: "1.2rem", fontWeight: "400" }}
              >
                1 AUD
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.4rem 1rem 0 1rem"
              }}
            >
              <Typography
                variant="p"
                sx={{ fontSize: "1.2rem", fontWeight: "400" }}
              >
                Promocode discount :
              </Typography>
              <Typography
                variant="p"
                sx={{ fontSize: "1.2rem", fontWeight: "400" }}
              >
                -1 AUD
              </Typography>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: theme.palette.background.main,
              padding: "0.8rem 1rem",
              borderRadius: "0 0 2rem 2rem"
            }}
          >
            <Typography variant="p" sx={{color: "#fff"}} >
              Total Payable:
            </Typography>
            <Typography variant="p" sx={{color: "#fff"}} >
              9876 AUD
            </Typography>
          </Box>
        </div>
      </Grid>
    </>
  );
};

export default PaymentSummary;
