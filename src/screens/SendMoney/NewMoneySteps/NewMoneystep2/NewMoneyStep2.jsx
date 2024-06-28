import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import CardTotalPayable from "../../../../components/MaterialUI/CardTotalPayable";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGetAllCountries } from "../../../../hooks/country/useCountryDetails";
import DeliveryMethod from "./Delivery/DeliveryMethod";
import PaymentMethod from "./Payment/PaymentMethod";
import PromoCode from "./PromoCode/PromoCode";
import { useSendMoneyStep2Form } from "../../../../forms/sendmoney/useSendMoneyForm";
import {
  useGetDeliveryServiceCharge,
  useGetPaymentServiceCharge,
} from "../../../../hooks/sendMoney/serviceCharge/useServiceCharge";
import { getExchangeRate } from "../../../../utils/getExchangeRate";
import { addExchangeRate, addSendReceiveMoney } from "../../../../redux/actions";

const NewMoneyStep2 = ({ handleNext }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { sendMoneyDeliveryMethod, sendMoneyPaymentMethod } = useSelector(
    (state) => state.sendMoney
  );
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(0);
  const { data: allCountriesData } = useGetAllCountries();
  const { formik } = useSendMoneyStep2Form(handleNext, sendMoneyDeliveryMethod, sendMoneyPaymentMethod);
 
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

  const sendMoney = formik.values.amount;

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setAnchorEl(null);
  };

  useEffect(() => {}, [sendMoneyPaymentMethod, sendMoneyDeliveryMethod]);
  const props1 = { ...sendMoneyPaymentMethod, ...formik.values };
  const props2 = { ...sendMoneyDeliveryMethod, ...formik.values };
  const { data: getPaymentServiceCharge } = useGetPaymentServiceCharge(props1);
  const { data: getDeliveryServiceCharge } =
    useGetDeliveryServiceCharge(props2);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const fromCountryId = '7b1667c4-1f1a-11ef-8765-06acd635b761';
      const toCountryId = selectedCountry ? selectedCountry?.id : "d6e8f618-7046-4682-a2d6-cd99df745d12";

      try {
        const {data} = await getExchangeRate(fromCountryId, toCountryId);
        setExchangeRate(data?.dealRate);
        dispatch(addExchangeRate(data?.dealRate));
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchExchangeRate();
  }, [selectedCountry]);

  useEffect(() => {
    const receiveMoney = sendMoney ? sendMoney * exchangeRate : "";
    formik.setFieldValue("resMoney", receiveMoney);
    dispatch(addSendReceiveMoney(sendMoney));
  }, [sendMoney, exchangeRate]);

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

        <Grid
          item
          xs={10}
          sm={10}
          md={10}
          mt={1}
          mb={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="p"
            sx={{ fontSize: "1rem", fontWeight: "500", textAlign: "center" }}
          >
            Calculate amount of money to be transfered
          </Typography>

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

          <Box
            sx={{
              background: theme.palette.primary.light,
              borderRadius: "2rem",
              gap: "1rem",
              padding: "1.2rem 0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DeliveryMethod method={sendMoneyDeliveryMethod} exchangeRate={exchangeRate} sendMoney={sendMoney} />
            {formik.touched["deliveryMethod"] &&
              formik.errors["deliveryMethod"] && (
                <Typography variant="body2" color="error">
                  {formik.errors["deliveryMethod"]}
                </Typography>
              )}

            <PaymentMethod method={sendMoneyPaymentMethod} exchangeRate={exchangeRate} sendMoney={sendMoney} />
            {formik.touched["paymentMethod"] &&
              formik.errors["paymentMethod"] && (
                <Typography variant="body2" color="error">
                  {formik.errors["paymentMethod"]}
                </Typography>
              )}
          </Box>

          <PromoCode />
          <Grid>
            <CardTotalPayable
              serviceChargeTitle={"Service Charge"}
              serviceCharge={"12"}
              discountTitle={"Promocode Discount"}
              discount={"- 2"}
              totalTitle={"Total Payable"}
              total={"10"}
            />
          </Grid>
          <Button
            onClick={handleFormSubmit}
            variant={"contained"}
            sx={{ padding: "8px 24px", borderRadius: "24px", fontSize: "1rem" }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewMoneyStep2;
