import React from "react";
import { Box, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import CodeIcon from '@mui/icons-material/Code';

const DashboardSidebar = ({ values, handleChanges }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const labelStyle = {
    backgroundColor: "transparent",
    textTransform: "none",
    // borderRadius: ".5rem",
    color: "black",
    display: "flex",
    alignItems: "flex-start",
  };
  const activeLabelStyle = {
    ...labelStyle,
    backgroundColor: theme.palette.background.light,
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    fontWeight: 600,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
  };

  return (
    <>
      <TabContext value={value}>
        <TabList onChange={handleChange}>
          <Tab icon={<HomeIcon />} value="1" sx={{ minWidth: "10px" }} />
          <Tab icon={<SettingsIcon />} value="2" sx={{ minWidth: "10px" }} />
          <Tab icon={<BuildIcon />} value="3" sx={{ minWidth: "10px" }} />
          <Tab
            icon={<CodeIcon />}
            value="4"
            sx={{ minWidth: "10px" }}
          />
        </TabList>

        <TabPanel value="1">
          <TabList onChange={handleChanges} orientation="vertical">
            <Tab
              label="Dashboard"
              value="dashboard"
              style={values === "dashboard" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Transaction"
              value="transaction-view"
              style={
                values === "transaction-view" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Compliance"
              value="compliance"
              style={values === "compliance" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Risk Management"
              value="risk-management"
              style={
                values === "risk-management" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Users"
              value="users"
              style={values === "users" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="chat"
              value="chatscreen"
              style={values === "chatscreen" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Exchange Rate"
              value="exchange-rate"
              style={values === "exchange" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Rewards"
              value="rewards"
              style={values === "rewards" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Accountings"
              value="accounts"
              style={values === "accountings" ? activeLabelStyle : labelStyle}
            />
          </TabList>
        </TabPanel>
        <TabPanel value="2">
          <TabList onChange={handleChanges} orientation="vertical">
            <Tab
              label="Service Charge"
              value="service-charge"
              style={
                values === "service-charge" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Payment Methods"
              value="payment-methods"
              style={
                values === "payment-methods" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Payment Type"
              value="paymenttype"
              style={values === "paymenttype" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Delivery Methods"
              value="deliveryMethod"
              style={
                values === "deliveryMethod" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Delivery Type"
              value="deliverymethodlist"
              style={
                values === "deliverymethodlist" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Payout Partner"
              value="partner-bank"
              style={values === "partner-bank" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Purpose of Transfer"
              value="purpose-of-transfer"
              style={
                values === "purpose-of-transfer" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Relation"
              value="relation"
              style={values === "relation" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Occupation"
              value="occupation"
              style={values === "occupation" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Type of ID"
              value="typeofid"
              style={values === "typeofid" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Id Issuing Authority"
              value="id-issuing-authority"
              style={
                values === "id-issuing-authority"
                  ? activeLabelStyle
                  : labelStyle
              }
            />
            <Tab
              label="Country Settings"
              value="country-settings-list"
              style={
                values === "country-settings-list"
                  ? activeLabelStyle
                  : labelStyle
              }
            />
            <Tab
              label="Utility Service Management"
              value="utility-service-transaction"
              style={
                values === "utility-service-transaction"
                  ? activeLabelStyle
                  : labelStyle
              }
            />
          </TabList>
        </TabPanel>
        <TabPanel value="3">
          <TabList onChange={handleChanges} orientation="vertical">
            <Tab
              label="Reported Fraud"
              value="reported-fraud"
              style={
                values === "reported-fraud" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Refunds"
              value="refunds"
              style={values === "refunds" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Cancel Transactions"
              value="canceltransactions"
              style={
                values === "canceltransactions" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Complaints"
              value="complaints-admin"
              style={
                values === "complaints-admin" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Contact Us Lead"
              value="contactUs"
              style={values === "contactUs" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Become an Agent"
              value="ouragents"
              style={values === "ouragents" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Device and IP Info"
              value="deviceinfo"
              style={values === "deviceinfo" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Partner Bank API"
              value="payout-partners"
              style={
                values === "payout-partners" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="API Logs"
              value="api-logs"
              style={values === "api-logs" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Reviews"
              value="reviews"
              style={values === "reviews" ? activeLabelStyle : labelStyle}
            />
          </TabList>
        </TabPanel>

        <TabPanel value="4">
          <TabList onChange={handleChanges} orientation="vertical">
            <Tab
              label="FAQ"
              value="faq-content"
              style={values === "faq-content" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Contact Us"
              value="aboutus-CMS"
              style={values === "aboutus-CMS" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="CMS"
              value="CMS"
              style={values === "CMS" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Blogs"
              value="blogsmangement"
              style={
                values === "blogsmangement" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="Careers"
              value="careermanagement"
              style={
                values === "careermanagement" ? activeLabelStyle : labelStyle
              }
            />
            <Tab
              label="News"
              value="news"
              style={values === "news" ? activeLabelStyle : labelStyle}
            />
            <Tab
              label="Configuration"
              value="siteconfig"
              style={values === "siteconfig" ? activeLabelStyle : labelStyle}
            />
          </TabList>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default DashboardSidebar;
