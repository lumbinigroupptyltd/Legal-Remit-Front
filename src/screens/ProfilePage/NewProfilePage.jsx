import React, { useEffect, useState } from "react";
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
import IdDetailsProfile from "./User/IdDetailsProfile";
import MyDocumentsProfile from "./User/MyDocumentsProfile";
import { useGetUserInfoByUserId } from "../../hooks/userInfo/useUserInfo";
import { useGetUserKycDetailsByUserId } from "../../hooks/profile/User/userKyc/useUserKycDetails";
import PendingStatusComp from "../../Layout/PendingStatusComp";
import {
  useGetScantekDetailsByUserId,
  useGetScantekLinkByUserId,
} from "../../hooks/scanteck/useScantek";
import { useGetUserIdDetailsByUserId } from "../../hooks/profile/User/userId/useUserIdDetails";
import { getScantekLinkByUserId } from "../../api/scantek/scantek-api";
import { useGetBusinessDetailsByUserId } from "../../hooks/profile/Business/business/useBasicBusinessDetails";

const NewProfilePage = () => {
  const [submitForm, setSubmitForm] = useState(false);
  const { role, userId, isSignupCompleted } = useSelector(
    (state) => state.auth
  );
  const theme = useTheme();
  const navigate = useNavigate();
  const [submitModal, setSubmitModal] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState("");
  const { data: userData } = useGetUserInfoByUserId(userId);
  const newData = userData && userData?.data;
  const { data: userKycData } = useGetUserKycDetailsByUserId(userId);
  const kycData = userKycData && userKycData?.data?.[0];
  const { data: userIdDetails } = useGetUserIdDetailsByUserId(userId);
  const userIDData = userIdDetails && userIdDetails?.data?.[0];
  const { data: scantekData } = useGetScantekDetailsByUserId(userId);
  const { data: getBusinessDetailData } = useGetBusinessDetailsByUserId(userId);
  const businessDetailData =
    getBusinessDetailData && getBusinessDetailData?.data;

  const { mutate: getScantekLinkByUserId, data: getScantekLinkData } =
    useGetScantekLinkByUserId({
      onSuccess: (data) => {
        window.open(`${data?.data?.voiLink}`, "_blank");
      },
    });

  const handleDigitalVerification = async () => {
    try {
      getScantekLinkByUserId(userId, {
        onSuccess: () => {},
      });
    } catch (error) {
      console.error("Error during digital verification:", error);
    }
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
  console.log(role);
  useEffect(() => {
    let hasAllRequiredData = false;
    switch (role) {
      case "INDIVIDUAL":
        hasAllRequiredData = newData && kycData && (userIDData || scantekData);
        break;
      case "BUSINESS":
        hasAllRequiredData = newData && kycData && businessDetailData && (userIDData || scantekData);
        break;
      default:
        hasAllRequiredData = false;
    }
    setSubmitForm(hasAllRequiredData);
  }, [newData, kycData, userIDData, scantekData, businessDetailData, role]);

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

      {!isSignupCompleted && kycData?.kycStatus === "PENDING" && (
        <>
          <Grid
            sx={{ margin: { lg: "6rem", md: "5rem", sm: "4rem", xs: "3rem" } }}
          >
            <PendingStatusComp />
          </Grid>
        </>
      )}

      {!isSignupCompleted &&
        (kycData?.kycStatus === "REJECTED" || !userKycData?.data?.length) && (
          <>
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
                  sx={{
                    background: theme.palette.background.main,
                    color: "white",
                  }}
                  expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  User Details
                </AccordionSummary>
                <AccordionDetails>
                  {role === "INDIVIDUAL" ? (
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
                    sx={{
                      background: theme.palette.background.main,
                      color: "white",
                    }}
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Business Details
                  </AccordionSummary>
                  <AccordionDetails>
                    <BusinessDetailsExtraProfile
                      businessDetailData={businessDetailData}
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
                  <KycDetailsProfile userId={userId} data={kycData} />
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
                  ID Upload Method
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
                            Biometric (Recommended)
                          </Typography>
                        </Button>
                        <div style={{ padding: "0 2rem" }}>
                          <Typography variant="p">
                            It is recommended to use Digital verification for
                            faster process. Click on Button to proceed.
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
                            It is slower method of verification process. Click
                            on Button to proceed.
                          </Typography>
                        </div>
                      </Grid>
                    </Box>
                  ) : (
                    <>
                      <Grid align="center">
                        <Typography variant="h6" color={"error"}>
                          Please first fill KYC Details form above to proceed
                          verification method.
                        </Typography>
                      </Grid>
                    </>
                  )}
                </AccordionDetails>
              </Accordion>

              {verificationMethod === "manual" && (
                <>
                  <Accordion disabled={!verificationMethod} defaultExpanded>
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
                      <IdDetailsProfile userIdData={newData} userId={userId} />
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
                      <MyDocumentsProfile userId={userId} />
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
            </Grid>

            <Grid container mt={2}>
              {submitForm && (
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
                    COMPLETE PROFILE
                  </Typography>
                </Grid>
              )}
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
                      data={kycData}
                      userId={userId}
                      countryId={kycData?.countryId}
                      buttonName={"COMPLETE PROFILE"}
                      handleCloseModal={() => setSubmitModal(false)}
                    />
                  }
                />
              )}
            </Grid>
          </>
        )}

      <Footer />
    </>
  );
};

export default NewProfilePage;
