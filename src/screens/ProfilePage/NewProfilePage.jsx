import React, { useState } from "react";
import Footer from "../Home/Footer/Footer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonalDetailsProfile from "./User/PersonalDetailsProfile";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import BusinessDetailsProfile from "./Business/BusinessDetailsProfile";
import logo from "../../assets/images/Logo-LR.png";
import { logout } from "../../utils/logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FormModal from "../../components/formModal/FormModal";
import ConfirmationModal from "../../components/formModal/ConfirmationModal";
import BusinessDetailsExtraProfile from "./Business/BusinessDetailsExtraProfile";
import KycDetailsProfile from "./User/KycDetailsProfile";
import KycBusinessProfile from "./Business/KycBusinessProfile";
import IdDetailsProfile from "./User/IdDetailsProfile";
import IdBusinessProfile from "./Business/IdBusinessProfile";
import MyDocumentsProfile from "./User/MyDocumentsProfile";
import MyDocumentsBusinessProfile from "./Business/MyDocumentsBusinessProfile";
import { useGetUserInfoByUserId } from "../../hooks/userInfo/useUserInfo";
import { useGetUserKycDetailsByUserId } from "../../hooks/profile/User/userKyc/useUserKycDetails";

const NewProfilePage = () => {
  const { role, userId } = useSelector((state) => state.auth);
  const theme = useTheme();
  const navigate = useNavigate();
  const [submitModal, setSubmitModal] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState(null);
  const { data: userData } = useGetUserInfoByUserId(userId);
  const newData = userData && userData?.data;

  const { data: userKycData } = useGetUserKycDetailsByUserId(userId);
  const kycData = userKycData && userKycData?.data;
 
  const handleDigitalVerification = () => {
    setVerificationMethod("digital");
    window.location.href = "https://digitallink.com";
  };

  const handleManualVerification = () => {
    setVerificationMethod("manual");
  };

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const handleSubmitForm = () => {
    setSubmitModal(true);
  };

  return (
    <>
      <Grid
        container
        mt={2}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid>
          <img width={120} src={logo} alt="logo" />
        </Grid>
        <Grid></Grid>
        <Grid>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>

      <Grid
        sx={{
          margin: "3rem auto",
          padding: "12px",
          width: "90%",
          boxShadow: theme.palette.boxShadow.default,
        }}
      >
        <Accordion
          defaultExpanded
          sx={{
            background: theme.palette.background.default,
            marginBottom: "1rem",
          }}
        >
          <AccordionSummary
            sx={{ background: theme.palette.background.main, color: "white" }}
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            User Details
          </AccordionSummary>
          <AccordionDetails>
            {role === "USER" ? (
              <PersonalDetailsProfile data={newData} userId={userId} />
            ) : (
              <BusinessDetailsProfile data={newData} userId={userId} />
            )}
          </AccordionDetails>
        </Accordion>

        {role === "BUSINESS" && (
          <Accordion
            defaultExpanded
            sx={{
              background: theme.palette.background.default,
              marginBottom: "1rem",
            }}
          >
            <AccordionSummary
              sx={{ background: theme.palette.background.main, color: "white" }}
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Business Details
            </AccordionSummary>
            <AccordionDetails>
              <BusinessDetailsExtraProfile
                // data={businessDetailsData}
                userId={userId}
              />
            </AccordionDetails>
          </Accordion>
        )}

        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{
              background: theme.palette.background.main,
              color: "white",
              marginBottom: "1rem",
            }}
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            KYC Details
          </AccordionSummary>
          <AccordionDetails>
            {role === "USER" ? (
              <KycDetailsProfile userId={userId} />
            ) : (
              <KycBusinessProfile userId={userId} />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{
              background: theme.palette.background.main,
              color: "white",
              marginBottom: "1rem",
            }}
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Verification Method
          </AccordionSummary>
          <AccordionDetails>
            {kycData ? (
              <Box sx={{ display: "flex" }}>
                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDigitalVerification}
                    sx={{ marginRight: "1rem" }}
                  >
                    <Typography variant="h6" align="center">
                      Digital Verification (Recommended)
                    </Typography>
                  </Button>
                  <div style={{ padding: "0 2rem" }}>
                    <Typography variant="p">
                      It is recommended to use Digital verification for faster
                      process. Click on Button to proceed.
                    </Typography>
                  </div>
                </Grid>
                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleManualVerification}
                  >
                    <Typography variant="h6" align="center">
                      Manual Verification (Slower Method)
                    </Typography>
                  </Button>
                  <div style={{ padding: "0 2rem" }}>
                    <Typography variant="p">
                      It is slower method of verification process. Click on
                      Button to proceed.
                    </Typography>
                  </div>
                </Grid>
              </Box>
            ) : (
              <>
                <Grid align="center">
                  <Typography variant="h6" color={"error"}>
                    Please first fill ID Details form above to upload documents.
                  </Typography>
                </Grid>
              </>
            )}
          </AccordionDetails>
        </Accordion>

        {verificationMethod && (
          <>
            <Accordion disabled={!verificationMethod}>
              <AccordionSummary
                sx={{
                  background: theme.palette.background.main,
                  color: verificationMethod ? "white" : "#000",
                  marginBottom: "1rem",
                }}
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                ID Details
              </AccordionSummary>
              <AccordionDetails>
                {role === "USER" ? (
                  <IdDetailsProfile data={newData} userId={userId} />
                ) : (
                  <IdBusinessProfile data={newData} userId={userId} />
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion disabled={!verificationMethod}>
              <AccordionSummary
                sx={{
                  background: theme.palette.background.main,
                  color: verificationMethod ? "white" : "#000",
                  marginBottom: "1rem",
                }}
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                My Documents
              </AccordionSummary>
              <AccordionDetails>
                {role === "USER" ? (
                  <MyDocumentsProfile userId={userId} />
                ) : (
                  <MyDocumentsBusinessProfile userId={userId} />
                )}
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Grid>

      <Grid container mt={2}>
        <Grid
          item
          sx={{
            width: "100%",
            background: theme.palette.background.main,
            color: "#fff",
            textAlign: "center",
            margin: "auto 4rem",
            cursor: "pointer",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "500",
              letterSpacing: "0.15rem",
            }}
            onClick={handleSubmitForm}
          >
            Submit Form
          </Typography>
        </Grid>
        {submitModal && (
          <FormModal
            open={submitModal}
            onClose={() => setSubmitModal(false)}
            width={700}
            height={"auto"}
            maxHeight={"80vh"}
            header={"Submit Application"}
            formComponent={
              <ConfirmationModal
                title={"Submit Application"}
                message={
                  "Are you sure you have filled all the required fields & want to submit form?"
                }
                data={kycData?.[0]}
                userId={userId}
                countryId={kycData?.[0]?.countryId}
                buttonName={"Submit"}
                handleCloseModal={() => setSubmitModal(false)}
              />
            }
          />
        )}
      </Grid>
      <Footer />
    </>
  );
};

export default NewProfilePage;
