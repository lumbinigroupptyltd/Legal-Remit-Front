import React, { useEffect, useState } from "react";
import "./Referal.scss";
import NavBar from "../Home/Navbar/Navbar";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Footer from "../Home/Footer/Footer";
import gift from "../../assets/images/giftReferal.svg";
import rewards from "../../assets/images/rewards.svg";
import rewards2 from "../../assets/images/refral2.svg";
import copy from "../../assets/images/copyclipboard.svg";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import PropTypes from "prop-types";
// import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import styled from "styled-components";
import { styled } from '@mui/system';

const InputWrapper = styled("div")(
  ({ theme }) => `
  padding: 12px 7px 12px 7px;
  margin-top:12px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.65)"
      : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <div className="d-flex align-items-center" onClick={onDelete}>
        <i className="fa fa-close" />
      </div>
      {/* <CloseIcon onClick={onDelete} /> */}
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
    };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "xyz@gmail.com", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
//   { title: "12 Angry Men", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp Fiction", year: 1994 },
// ];

export default function Referal() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [singleemail, setsingleemail] = useState("");
  const [focused, setFocused] = useState(false); // Add this line
  const [UserData, setUserData] = useState();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [BlankEmail, setBlankEmail] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [loadervalue, setloadervalue] = useState(false);
  const [RewardPoint, setRewardPoint] = useState(0);
  const [RewardsCash, setRewardsCash] = useState(0);
  const [TotalRefrals, setTotalRefrals] = useState(0);
  const [TotalPoints, setTotalPoints] = useState(0);
  const [TotalMaxPoints, setTotalMaxPoints] = useState(0);
  const [TotalRedeemPoints, setTotalRedeemPoints] = useState(0);
  const [isValidPoints, setisValidPoints] = useState(true);
  const [isMaxValidPoints, setisMaxValidPoints] = useState(true);
  const [ValidPoints, setValidPoints] = useState(true);
  const [MaxValidPoints, setMaxValidPoints] = useState(true);
  const [RowsPerPage, SetRowsPerPage] = useState(
    CommonConstants.DefaultPageSize
  );
  const [Page, SetPage] = useState(1);
  const [Search, SetSearch] = useState("");
  const [allUserAgents, setAllUserAgents] = useState([]);
  const [recoredrCount, setRecorderCount] = useState(0);
  const [userId, setUserID] = useState(localStorage.getItem("Id"));
  const [allPromocode, setAllPromocode] = useState([]);
  const [countryID, setCountryId] = useState(0);

  const settings = {
    infinite: true,
    slidesToShow: 2, // Adjust the number of visible slides per view as needed
    slidesToScroll: 1,
    arrows: true, // Add navigation arrows if desired
    dots: true,
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSendRefralCode = async () => {
    if (selectedOptions.length === 0) {
      if (singleemail != "") {
        setloadervalue(true);
        var SendRefral = {
          code: UserData.code,
          emails: [singleemail],
        };
        await axios
          .post(CommonConstants.BASE_URL + "/sendreferralcode", SendRefral)
          .then((response) => {
            if (response.data.status == true && response.data.statuscode == 200) {
              setsingleemail("")
              setloadervalue(false);
              handleModalClose();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setBlankEmail(true);
      }
    } else {
      setloadervalue(true);
      var SendRefral = {
        code: UserData.code,
        emails: selectedOptions,
      };
      await axios
        .post(CommonConstants.BASE_URL + "/sendreferralcode", SendRefral)
        .then((response) => {
          // console.log(response.data.data)
          if (response.data.status == true && response.data.statuscode == 200) {
            setSelectedOptions([])
            setloadervalue(false);
            handleModalClose();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handlegetRewardsAndPoint = async () => {
    const formData = new FormData();
    formData.append("userId", localStorage.getItem("Id"));
    const config = {
      method: "POST",
      url: CommonConstants.NEW_BASE_URL + "/getrewards",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    };

    axios(config)
      .then((Res) => {
        if (Res.data.status === true && Res.data.statuscode === 200) {
          setTotalRedeemPoints(Res.data.data?.totalPoints);
          setRewardPoint(Res.data.data?.totalPoints);
          setTotalPoints(Res.data.data?.totalPoints);
          setTotalMaxPoints(Res.data.data?.maxRedeemPoint);
          setRewardsCash(Res.data.data?.totalCash);
          setTotalRefrals(Res.data.data?.totalReferals);
          if (Res.data.data?.totalPoints >= Res.data.data?.maxRedeemPoint) {
            setValidPoints(true);
            setisValidPoints(true);
            setMaxValidPoints(true);
          } else if (
            Res.data.data?.totalPoints <= Res.data.data?.maxRedeemPoint
          ) {
            setisValidPoints(true);
            setValidPoints(true);
            setMaxValidPoints(false);
          }
        } else {
          setTotalRedeemPoints(0);
          setRewardPoint(0);
          setTotalPoints(0);
          setTotalMaxPoints(0);
          setRewardsCash(0);
          setTotalRefrals(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRedeemPoint = async () => {
    const formData = new FormData();
    formData.append("userId", localStorage.getItem("Id"));
    formData.append("redeemPoint", TotalRedeemPoints);
    const config = {
      method: "POST",
      url: CommonConstants.NEW_BASE_URL + "/redeempoints",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    };

    axios(config)
      .then((Res) => {
        if (Res.data.status === true && Res.data.statuscode === 200) {
          setTotalRedeemPoints(Res.data.data?.totalPoints);
          setRewardPoint(Res.data.data?.totalPoints);
          setTotalPoints(Res.data.data?.totalPoints);
          setTotalMaxPoints(Res.data.data?.maxRedeemPoint);
          setRewardsCash(Res.data.data?.totalCash);
          setTotalRefrals(Res.data.data?.totalReferals);

          if (Res.data.data?.totalPoints >= Res.data.data?.maxRedeemPoint) {
            setValidPoints(true);
            setisValidPoints(true);
            setMaxValidPoints(true);
          } else if (
            Res.data.data?.totalPoints <= Res.data.data?.maxRedeemPoint
          ) {
            setisValidPoints(true);
            setValidPoints(true);
            setMaxValidPoints(false);
          }
          // else if(parseInt(inputValue) > RewardPoint){
          //   setisValidPoints(false)
          //   setValidPoints(true)
          //   setMaxValidPoints(true)
          // }
        } else {
          setTotalRedeemPoints(0);
          setRewardPoint(0);
          setTotalPoints(0);
          setTotalMaxPoints(0);
          setRewardsCash(0);
          setTotalRefrals(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleGetData = async() =>{
  //   await axios
  //     .post(CommonConstants.BASE_URL + "/getuserinfobyid", { id: localStorage.getItem("Id") }).then((response) => {
  //       setUserData(response.data.data)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  // }

  const handleClick = () => {
    setIsShaking(true);
    // After a brief delay, reset the shaking state to stop the animation
    setTimeout(() => {
      setIsShaking(false);
      setIsValidEmail(!isValidEmail);
    }, 1000); // Adjust the duration as needed
  };

  const handleCopyClick = () => {
    const textToCopy = UserData?.code; // Replace with your actual data source

    // Create a temporary input element to copy the text
    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

  };

  useEffect(() => {
    handlegetRewardsAndPoint();
    axios
      .post(CommonConstants.BASE_URL + "/getuserinfobyid", {
        id: localStorage.getItem("Id"),
      })
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // getUserAgents();
    getAllPromocodes();
  }, []);

  const [showModal1, setShowModal1] = useState(false); // State to control modal visibility

  const handleModalOpen1 = () => {
    setShowModal1(true);
  };

  const handleModalClose1 = () => {
    setShowModal1(false);
  };

  const getUserAgents = async () => {
    try {
      setloadervalue(true);
      const sendData = {
        userId: userId,
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: Search,
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getagentsbyuser",
        sendData
      );
      if (response.data.status === true) {
        setAllUserAgents(response.data.data);
        setRecorderCount(response.data.recordCount);
      }
      setloadervalue(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPromocodes = async () => {
    const sendData = new FormData();
    sendData.append("countryId", countryID);
    sendData.append("userId", userId);
    sendData.append("isForTransaction", false);
    sendData.append("isForCompleteSignup", false);
    const getPromocode = await axios.post(
      CommonConstants.BASE_URL + "/getpromocodes",
      sendData
    );
    if (getPromocode.data.status == true) {
      setAllPromocode(getPromocode.data.data);
    }
  };

  function handleCopyClick1(promoCode) {
    const tempInput = document.createElement("input");
    tempInput.value = promoCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

  }
  // const handleCopyClick = () => {
  //   const textToCopy = UserData?.code; // Replace with your actual data source

  //   // Create a temporary input element to copy the text
  //   const tempInput = document.createElement('input');
  //   tempInput.value = textToCopy;
  //   document.body.appendChild(tempInput);
  //   tempInput.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(tempInput);

  //   console.log('Copied!');
  // };

  return (
    <>
      <section className="abtPage secRef  ">
        {loadervalue == true ? <Loader /> : ""}
        <NavBar></NavBar>
        <Container className="pb-5 mb-5 bg-white py-2 px-5 rounded-4">
          <div className="headerText my-5">
            <h1 className="responsiveFontLargeMedium purpleText bolder respTextCenter">
              Referral and rewards
            </h1>
          </div>
          <div className="refralMain  m-1">
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-between g-0 ">
                <div className="col-lg-2 moneySendRespo">
                  <img
                    src={gift}
                    className=""
                    style={{ marginLeft: -20 }}
                    alt=""
                  />
                </div>
                <div className="col-lg-4 d-flex flex-column justify-content-center py-5 cashPadding">
                  <h3 className="text-black bolder">Cash Balance</h3>
                  <small className="responsiveFontLarge  purpleText bolder">
                    All your earned rewards can be converted to cash.
                  </small>
                </div>
                <div className="col-lg-4 d-flex align-items-center">
                  <h1 className="purpleText bolder responsiveFontLargeMedium"> 
                    {Number(RewardsCash?.toString()?.match(/^\d+(?:\.\d{0,2})?/))} {UserData?.currency}
                    {/* {RewardsCash.toFixed(2)} {UserData?.currency} */}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="childrefralMain my-5">
            <Row className="">
              <Col className="col-lg-6">
                <div className="childMain ">
                  <div className="col-lg-12 g-0 d-flex ps-0">
                    <div className="childMain col-lg-2 p-0">
                      <img
                        src={rewards}
                        height="200"
                        width="200"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-10 py-3">
                      <span className="text-black bolder pt-3">
                        Reward Points
                      </span>
                      <h1 className="purpleText mt-1">{RewardPoint}</h1>
                      <small className="responsiveFontLarge  purpleText my-1">
                        Redeem exiting reward points and enjoy exclusive
                        benefits.
                      </small>

                      <Col className="col-lg-6 ps-0 pe-0">
                        <Button
                          className="btn-btn default text-center ms-0 mt-3 purpleBackground border-0 rounded-5"
                          onClick={(e) => {
                            handleModalOpen1(e);
                          }}
                        >
                          Redeem now
                        </Button>
                      </Col>
                    </div>
                  </div>
                </div>
              </Col>

              <Col className="col-lg-6  referTop">
                <div className="childMain">
                  <div className="col-lg-12 g-0 d-flex ps-0 h6">
                    <div className="childMain col-lg-2 p-0">
                      <img
                        src={rewards2}
                        height="200"
                        width="200"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-10 py-3">
                      <span className="text-black bolder pt-3">
                        Total Referrals
                      </span>
                      <h1 className="purpleText mt-1">{TotalRefrals}</h1>
                      <small className="responsiveFontLarge  purpleText my-1">
                        Refer Legalremit to your friends and get rewarded.
                      </small>
                      <Col className="col-lg-6 ps-0 pe-0">
                        <Button
                          onClick={handleModalOpen}
                          className="btn-btn default ms-0 pe-0 ps-0 text-center mt-3 purpleBackground border-0 rounded-5"
                        >
                          Refer and earn
                        </Button>
                      </Col>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {allPromocode && allPromocode?.length > 0 && (
            <Row className="my-5 mb-3">
              <Col className="col-lg-12 d-flex flex-column">
                <span className="text-black bolder fs-6">Promocodes</span>
              </Col>
            </Row>
          )}

          <Slider {...settings}>
            {allPromocode &&
              allPromocode.map((row, index) => (
                <div key={index}>
                  <div className="coupon-card mx-2">
                    <h3 className="text-white text-start bolder">
                      {row?.title}
                    </h3>

                    <small className="responsiveFontLarge text-white text-start d-block">
                      {row?.description}
                    </small>
                    <div className="my-3 mb-0 d-flex">
                      <div
                        className="bg-white purpleText w-50 py-2 rounded-4 bolder"
                        id={row?.promoCode}
                      >
                        <h4 className="mb-0 responsiveFontLarge">
                          {row?.promoCode}
                        </h4>
                      </div>
                      <img
                        src={copy}
                        className="img-fluid copy ms-5 pointer"
                        onClick={() => handleCopyClick1(row.promoCode)}
                        title="Copy"
                        alt=""
                      />
                    </div>
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                  </div>
                </div>
              ))}
          </Slider>

          <Row className="py-3">
            <h4 className="my-3 text-black bolder">How it works</h4>
            <ol className="nested-ordered-list ps-3">
              <li className="text-black my-2">
                Refer a friend or family member: Share your unique referral link
                or code with your friends or family members who are interested
                in using Legal Remit's cross-border payment services.
              </li>
              <li className="text-black my-2">
                Your referral signs up and completes a transaction: Your
                referred friend or family member will need to sign up for a
                Legal Remit account using your referral link or code. Once they
                complete a successful transaction, both of you will be eligible
                for the cash value rewards.
              </li>
              <p className="responsiveFontLarge fs-6 text-black text-start mt-4">
                The exact cash value reward will depend on the ongoing promotion
                or offer at the time of the referral. Rest assured, Legal Remit
                regularly introduces exciting rewards to make your referrals
                even more rewarding. You can stay updated with our latest offers
                by visiting our website, mobile app or keeping an eye on our
                promotional emails and notifications.
              </p>
            </ol>
          </Row>
        </Container>
        <Footer></Footer>
      </section>
      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="purpleText">Refer and Earn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add content for the modal */}
          <p className="fs-6">
            Share your referral link with friends and earn rewards!
          </p>
          <div className="mainContainer" style={{ background: "#fafafa" }}>
            <div className="copy-text">
              <input
                type="text"
                className="text "
                disabled
                value={UserData?.code}
              />
              <button
                className="w-auto px-3"
                onClick={() => {
                  handleCopyClick();
                }}
              >
                <i className="fa fa-clone"></i>
              </button>
            </div>
          </div>
          {/* {console.log(selectedOptions,"selectedOptions")} */}
          <Autocomplete
            multiple
            id="customized-autocomplete"
            options={selectedOptions}
            groupBy={(option) => option.year}
            getOptionLabel={(option) => option}
            value={selectedOptions}
            onChange={(_, newValue) => setSelectedOptions(newValue)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <StyledTag
                  key={index}
                  label={option}
                  onDelete={() => {
                    const newSelected = [...selectedOptions];
                    newSelected.splice(index, 1);
                    setSelectedOptions(newSelected);
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <InputWrapper className={focused ? "focused" : ""}>
                {selectedOptions.map((option, index) => (
                  <StyledTag
                    key={index}
                    label={option}
                    onDelete={() => {
                      const newSelected = [...selectedOptions];
                      newSelected.splice(index, 1);
                      setSelectedOptions(newSelected);
                    }}
                  />
                ))}
                <input
                  {...params.inputProps}
                  onKeyDown={(event) => {
                    setBlankEmail(false);
                    // var IinputValue = event.target.value
                    // if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(IinputValue)){
                    //   setsingleemail(event.target.value)
                    // }else{
                    //   setsingleemail("")
                    // }

                    if (event.key === "Enter" || event.key === " ") {
                      setIsValidEmail(
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          event.target.value
                        )
                      );
                      if (
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          event.target.value
                        )
                      ) {
                        event.preventDefault();
                        if (params.inputProps.value.trim() !== "") {
                          setSelectedOptions((prevOptions) => [
                            ...prevOptions,
                            params.inputProps.value.trim(),
                          ]);
                          params.inputProps.onChange({ target: { value: "" } });
                        }
                      }
                    }
                  }}

                  onKeyUp={(event) => {
                    var IinputValue = event.target.value;
                    if (
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        IinputValue
                      )
                    ) {
                      setsingleemail(event.target.value);
                    } else {
                      setsingleemail("");
                    }
                  }}
                />
              </InputWrapper>
            )}
          />
          {!isValidEmail && (
            <small
              className={`shaking-text responsiveFontLarge text-danger ms-2 ${isShaking ? "shake" : ""
                }`}
            >
              Please Enter Valid Email Address
            </small>
          )}
          {BlankEmail && (
            <small className={`responsiveFontLarge text-danger ms-2 `}>
              Please Enter Email First
            </small>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button
            className="bg-transparent text-black purpleBorder w-auto px-3"
            onClick={handleModalClose}
          >
            Close
          </Button>
          <Button
            // disabled={!isValidEmail}
            // disabled
            className="purpleBackground border-0 w-auto"
            onClick={() => {
              isValidEmail || singleemail != ""
                ? handleSendRefralCode()
                : handleClick();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal 2} */}

      <Modal show={showModal1} onHide={handleModalClose1} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="purpleText">Reward Points</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add content for the modal */}
          {/* <p className="fs-6">
            Share your referral link with friends and earn rewards!
          </p> */}
          <div className="mainContainer pt-3" style={{ background: "#fafafa" }}>
            <span> Min Redeem Points :</span>
            <div className="copy-text">
              <input
                type="text"
                className="text"
                disabled
                readOnly
                value={TotalMaxPoints}
              />
            </div>
          </div>
          <div className="mainContainer pt-3" style={{ background: "#fafafa" }}>
            <span> Your Redeem Points :</span>
            <div className="copy-text">
              <input
                type="text"
                className="text"
                value={TotalRedeemPoints}
                onChange={(e) => {
                  const inputValue = e.target.value.replace(".", "");
                  setTotalRedeemPoints(inputValue);
                  if (
                    parseInt(inputValue) >= TotalMaxPoints &&
                    parseInt(inputValue) <= RewardPoint
                  ) {
                    setValidPoints(true);
                    setisValidPoints(true);
                    setMaxValidPoints(true);
                  } else if (inputValue < TotalMaxPoints) {
                    setisValidPoints(true);
                    setValidPoints(true);
                    setMaxValidPoints(false);
                  } else if (parseInt(inputValue) > RewardPoint) {
                    setisValidPoints(false);
                    setValidPoints(true);
                    setMaxValidPoints(true);
                  } else if (inputValue == 0 || inputValue == "") {
                    setisValidPoints(true);
                    setValidPoints(false);
                    setMaxValidPoints(true);
                  } else {
                    setisValidPoints(false);
                    setValidPoints(true);
                  }
                }}
              />
            </div>

            {!ValidPoints && (
              <small
                className={`shaking-text responsiveFontLarge text-danger ms-2 ${isShaking ? "shake" : ""
                  }`}
              >
                Please Enter Valid Points
              </small>
            )}

            {!isValidPoints && (
              <small
                className={`shaking-text responsiveFontLarge text-danger ms-2 ${isShaking ? "shake" : ""
                  }`}
              >
                You can redeem {RewardPoint} or more points at once.
                {/* Your redeem points should be less than your {RewardPoint} redeem
                point */}
                {/* you have not enough points */}
              </small>
            )}

            {!MaxValidPoints && (
              <small
                className={`shaking-text responsiveFontLarge text-danger ms-2 ${isShaking ? "shake" : ""
                  }`}
              >
                {/* Please Enter Valid Points */}
                {/* Your redeem points should be greater than {TotalMaxPoints}{" "} */}
                You can redeem {TotalMaxPoints} or more points at once.
              </small>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button
            className="bg-transparent text-black purpleBorder w-auto px-3"
            onClick={(e) => {
              setValidPoints(true);
              setMaxValidPoints(true);
              setisValidPoints(true);
              setTotalRedeemPoints(0);
              handleModalClose1(e);
            }}
          >
            Close
          </Button>
          <Button
            className="purpleBackground border-0 w-auto"
            onClick={(e) => {
              if (
                parseInt(TotalRedeemPoints) >= TotalMaxPoints &&
                parseInt(TotalRedeemPoints) <= RewardPoint
              ) {
                handleRedeemPoint(e);
                setValidPoints(true);
                setisValidPoints(true);
                setMaxValidPoints(true);
                handleModalClose1(e);
              } else if (TotalRedeemPoints < TotalMaxPoints) {
                setisValidPoints(true);
                setValidPoints(true);
                setMaxValidPoints(false);
              } else if (parseInt(TotalRedeemPoints) > RewardPoint) {
                setisValidPoints(false);
                setValidPoints(true);
                setMaxValidPoints(true);
              } else if (TotalRedeemPoints == 0 || TotalRedeemPoints == "") {
                setisValidPoints(true);
                setValidPoints(false);
                setMaxValidPoints(true);
              } else {
                setisValidPoints(false);
                setValidPoints(true);
              }
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
