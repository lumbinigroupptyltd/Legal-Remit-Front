import React from "react";
import { connect } from "react-redux";
import LogoiCON from "../../assets/images/logo-icon.svg";
import Loader from "../Loader/Loader";
import Form from 'react-bootstrap/Form';
import {
  sparkleCardData,
} from "../../Data/DashbordData";
import {
  toggleMenuArrow,
  onPressTopProductDropDown,
  loadSparcleCard,
  onPressReferralsDropDown,
  onPressRecentChatDropDown,
  onPressDataManagedDropDown,
  facebookProgressBar,
  twitterProgressBar,
  affiliatesProgressBar,
  searchProgressBar,
} from "../../redux/actions";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import trans from "../../assets/images/TransactionSize.png";
import service from "../../assets/images/ServiceCharge.png";
import ref from "../../assets/images/referalsTotal.png";
import regus from "../../assets/images/registration.png";
import { Box, Modal, Button } from '@mui/material';
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import { coreAxiosInstance } from "../../utils/axiosIntercepters";

var timer = null;

class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      cardData: [],
      loadervalue: false,
      dashbordData: {
        sentAmount: 0.0,
        noOfTransaction: 0,
        noOfCurrency: 0,
        noOfBank_deposit: 0,
        noOfCashPickup: 0,
        noOfWalletDeposit: 0,
        noOfPayto: 0,
        noOfPayid: 0,
        noOfBankTransfer: 0,
        noOfDebitCard: 0,
        noOfCreditCard: 0,
        noOfCancelledTran: 0,
        rewardUsedValue: 0,
        rewardUsedNo: 0
      },
      partnerBankData: {
        availableBalance: 0,
        paymentProcessed: 0,
        processingAmt: 0,
        noOfTransaction: 0
      },
      SenderCountrys: [],
      sendingCountryName: 0,
      ReceivingCountrys: [],
      AllCountrys: []
    };
  }


  getAllDashboardPartnerBankDetails = async (partnerBankIds) => {
    const allData = [];
    for (const partnerBankId of partnerBankIds) {
      try {
        const response = await coreAxiosInstance.get("/getdashboardpartnerbankdetails", {
          params: {
            partnerBankId: partnerBankId
          }
        });
        if (response.data.status === true) {
          allData.push(response.data.data);
        }
      } catch (error) {
        console.error(`Error fetching data for partnerBankId ${partnerBankId}:`, error);
      }
    }

    return allData;
  }
  getAllDashbordData = async () => {
    const responce = await coreAxiosInstance.get("/getdashboarddetails");
    if (responce.data.status == true) {
      this.setState({ dashbordData: responce.data.data })
    }
  }
  GetAllSenderCountry = async () => {
    await axios.get(CommonConstants.BASE_URL + '/getallsendercountries').then((responce) => {
      if (responce.data.status == true) {
        this.setState({ SenderCountrys: responce.data.data });
      }
    }).catch(error => console.log(error))
  }

  GetAllCountrys = async () => {
    await axios.get(CommonConstants.BASE_URL + '/getcountries').then((responce) => {
      if (responce.data.status == true) {
        this.setState({ AllCountrys: responce.data.data });

      }
    }).catch(error => console.log(error))
  }
  handleSelectChange = (event) => {
    const selectedValue = event.target.value;
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  getPartnerBankId = async () => {
    try {
      const response = await coreAxiosInstance.get("/getallactivepartnerbanks");
      if (response.data.status === true) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching partner bank IDs:", error);
    }
    return [];
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.loadDataCard();
    this.GetAllCountrys();
    this.setState({
      cardData: [...sparkleCardData],
    });
    this.getAllDashbordData();
    this.GetAllSenderCountry();
    const partnerBanks = await this.getPartnerBankId();
    if (partnerBanks.length === 0) {
      return;
    }
    const partnerBankIds = partnerBanks.map((bank) => bank.id);
    if (partnerBankIds.length === 0) {
      return;
    }
    const dashbordData = await this.getAllDashboardPartnerBankDetails(partnerBankIds);
    this.setState({ partnerBankData: dashbordData });
  }

  async loadDataCard() {
    const { cardData } = this.state;
    this.setState({ loadervalue: true });
    var allCardData = cardData;
    cardData.map((data, i) => {
      var uData = [];
      data.sparklineData.data.map((d, j) => {
        uData[j] = Math.floor(Math.random() * 10) + 1;
      });
      allCardData[i].sparklineData.data = [...uData];
    });
    this.setState({ cardData: [...allCardData] });
    this.setState({ loadervalue: false });
  }

  render() {
    const { open } = this.state;

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" },
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    };

    const { loadingPage } = this.props;
    const { cardData } = this.state;
    if (loadingPage) {
      return (
        <div className="page-loader-wrapper">
          <div className="loader">
            <div className="m-t-30">
              <img src={LogoiCON} width="48" height="48" alt="Lucid" />
            </div>
            <p>Please wait...</p>
          </div>
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        {this.state.loadervalue == true ? <Loader /> : ""}
        <div>
          <div className="container-fluid">
            <div className="d-flex py-2 justify-content-between">
              <h1 className="purpleText">Dashboard</h1>
              <div>
                <Button
                  className="w-auto px-3 purpleBackground"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={this.handleOpen}
                  endIcon={<FilterAltIcon />}
                >
                  Filter
                </Button>
                <Modal
                  open={open}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
                      <h5>Filter</h5>
                      <div onClick={this.handleClose} className="pointer">
                        <CloseIcon />
                      </div>
                    </div>

                    <div className="viewModal">
                      <div className="row ">
                        <div className="col-lg-6">
                          <div className="font-weight-normal m-2 labelCard">Sender Country</div>
                          <Form.Select onChange={this.handleSelectChange} >
                            {this.state.AllCountrys && this.state.AllCountrys.map((row) => (
                              <option value={row.id}>{row.name}</option>
                            ))}
                          </Form.Select>
                        </div>
                        <div className="col-lg-6">
                          <div className="font-weight-normal m-2 labelCard">Reciever Country</div>
                          <Form.Select >
                            <option value="">Select Reciever Country</option>
                            {this.state.AllCountrys && this.state.AllCountrys.map((row) => (
                              <option value={row.id}>{row.name}</option>
                            ))}
                          </Form.Select>
                        </div>
                        <div className="d-none col-lg-4">
                          <div className="font-weight-normal m-2 labelCard">Payout Partner </div>
                          <Form.Select>
                            <option value="">Nepal Remit</option>
                            <option value="">eSewa</option>
                            <option value="">IME</option>
                            <option value="">Everest</option>
                            <option value="">GME</option>
                            <option value="">Dubai</option>
                          </Form.Select>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-lg-6">
                          <div className="font-weight-normal m-2 labelCard">From</div>
                          <Form.Control
                            type="date"
                            required
                            placeholder="From date"
                            name="Referal"
                            className="reflink link py-4 pbSt"
                          />
                        </div>
                        <div className="col-lg-6">
                          <div className="font-weight-normal m-2 labelCard">To</div>
                          <Form.Control
                            type="date"
                            required
                            placeholder="To date"
                            name="Referal"
                            className="reflink link py-4 pbSt"
                          />
                        </div>
                      </div>

                      <div className="row d-flex justify-content-end mt-3 border-top">
                        <div className="col-lg-2">
                          <Button
                            className="m-0 mt-3"
                            variant="contained"
                            color="primary"
                          >
                            Filter
                          </Button>
                        </div>
                        <div className="col-lg-2">
                          <Button
                            className="m-0 mt-3"
                            variant="outlined"
                            onClick={this.handleClose}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="card info-box-2">
                  <div className="body d-flex align-items-lg-center">
                    <div className="icon">
                      <div className="chart chart-bar">
                        <img src={trans} height={50} width={50} />
                      </div>
                    </div>
                    <div className="content">
                      <div className="text purpleText">
                        Average Transaction Size
                      </div>
                      <div className="number">1292</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card info-box-2">
                  <div className="body d-flex align-items-lg-center">
                    <div className="icon">
                      <div className="chart chart-bar">
                        <img src={service} height={50} width={50} />
                      </div>
                    </div>
                    <div className="content">
                      <div className="text purpleText">
                        Total Service Charge
                      </div>
                      <div className="number">802</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card info-box-2">
                  <div className="body d-flex align-items-lg-center">
                    <div className="icon">
                      <div className="chart chart-bar">
                        <img src={ref} height={50} width={50} />
                      </div>
                    </div>
                    <div className="content">
                      <div className="text purpleText">
                        Total No. Of Referral
                      </div>
                      <div className="number">2302</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card info-box-2">
                  <div className="body d-flex align-items-lg-center">
                    <div className="icon">
                      <div className="chart chart-bar">
                        <img src={regus} height={50} width={50} />
                      </div>
                    </div>
                    <div className="content">
                      <div className="text purpleText">
                        Total No Of Transaction
                      </div>
                      <div className="number">1902</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="header pb-3">
                    <h4 className="text-start">Today</h4>
                  </div>
                  <div className="d-none row">
                    <div className="col-lg-12 d-flex respoChildFooter">
                      <div className="col-lg-6">
                        <table className="table m-b-0 table-hover" style={{overflowX:'auto'}}>
                          <tbody>
                            <tr>
                              <td>Sent Amount</td>
                              <td className="align-right">
                                <span className="badge badge-info">{this.state.dashbordData.sentAmount}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>No of Transaction</td>
                              <td className="align-right">
                                <span className="badge badge-danger">{this.state.dashbordData.noOfTransaction}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>No of Currencies</td>
                              <td className="align-right">
                                <span className="badge badge-default">{this.state.dashbordData.noOfCurrency}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>No of Bank deposit</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.noOfBank_deposit}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>No of Cash Pickup</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.noOfCashPickup}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>No of wallet Deposit</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.noOfWalletDeposit}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>PayTo</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.noOfPayto}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>PayID</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.noOfPayid}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-lg-6">
                        <table className="table m-b-0">
                          <tbody>
                            <tr>
                              <td>Bank Transfer</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.noOfBankTransfer}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Debit Card</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.noOfDebitCard}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Credit Card</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.noOfCreditCard}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Rewards used value</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.rewardUsedValue}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Rewards used No</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.rewardUsedNo}</span>
                              </td>
                            </tr>
                            
                            <tr>
                              <td>Cancelled Transaction no</td>
                              <td className="align-right">
                                <span className="badge badge-warning">{this.state.dashbordData.noOfCancelledTran}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div style={{overflowX:'auto'}}>
                    <table className="table m-b-0 table-hover" >
                      <thead className="thead-light">
                        <tr>
                          <th>-</th>
                          <th>Amount</th>
                          <th>No</th>
                          <th>Average Transaction Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Transaction</td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>Bank Deposit</td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>Wallet Deposit</td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>Cash Pickup </td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>PayTo </td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>PayID </td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>Debit Card </td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>Bank Transfer </td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>Credit Card </td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>Rewards Used </td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>Cancelled </td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                        <tr>
                          <td>Refund </td>
                          <td>*</td>
                          <td>*</td>
                          <td>*</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="row clearfix">
              <div className="col-lg-4 col-md-12">
                <div className="card weather2">
                  <div className="body city-selected">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="icon">
                          <img
                            src="https://dev.legalremitnepal.com.au/image/logo2.png"
                            width={120}
                            alt="Lucid Logo"
                            className="img-responsive logo main-logo"
                          />
                        </div>
                        <div className="">
                          <div className="city text-center">
                            Nepal Remit
                          </div>
                          <div className="city text-right text-success">
                            <small className="responsiveFontLarge  text-end">
                              रू {this.state.partnerBankData[0]?.openingBalance}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table className="table table-striped m-b-0">
                    <tbody>
                      <tr>
                        <td>Available Balance</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[0]?.availableBalance}</td>
                      </tr>
                      <tr>
                        <td>Payment Processed</td>
                        <td className="font-medium text-right">रू {Number(this.state.partnerBankData[0]?.paymentProcessed?.toString()?.match(/^\d+(?:\.\d{0,2})?/))} </td>
         
                      </tr>
                      <tr>
                        <td>Processing amount</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[0]?.processingAmt}</td>
                      </tr>
                      <tr>
                        <td>No of Transaction:</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[0]?.noOfTransaction}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item text-center">
                        <div className="col-12">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p>Monday</p>
                              <i className="wi wi-day-hail"></i>
                            </li>
                            <li className="day col-4">
                              <p>Tuesday</p>
                              <i className="wi wi-day-lightning"></i>
                            </li>
                            <li className="day col-4">
                              <p>Wednesday</p>
                              <i className="wi wi-day-storm-showers"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="carousel-item text-center active">
                        <div className="col-12 ">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="card weather2">
                  <div className="body city-selected">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="icon">
                          <img
                            src={CommonConstants.BASE_URL + "/downloadFile/EVEREST/EVEREST_1686544619811.png"}
                            alt="Lucid Logo"
                            width={120}
                            className="img-responsive logo main-logo"
                          />
                        </div>
                        <div className="">
                          <div className="city text-center">Everest</div>
                          <div className="city text-right text-success">
                            <small className="responsiveFontLarge  text-end">
                              रू {this.state.partnerBankData[1]?.openingBalance}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table className="table table-striped m-b-0">
                    <tbody>
                      <tr>
                        <td>Available Balance</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[1]?.availableBalance}</td>
                      </tr>
                      <tr>
                        <td>Payment Processed</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[1]?.paymentProcessed} </td>
                      </tr>
                      <tr>
                        <td>Processing amount</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[1]?.processingAmt}</td>
                      </tr>
                      <tr>
                        <td>No of Transaction:</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[1]?.noOfTransaction}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item text-center">
                        <div className="col-12">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p>Monday</p>
                              <i className="wi wi-day-hail"></i>
                            </li>
                            <li className="day col-4">
                              <p>Tuesday</p>
                              <i className="wi wi-day-lightning"></i>
                            </li>
                            <li className="day col-4">
                              <p>Wednesday</p>
                              <i className="wi wi-day-storm-showers"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="carousel-item text-center active">
                        <div className="col-12 ">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="card weather2">
                  <div className="body city-selected">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="icon">
                          <img
                            src={CommonConstants.BASE_URL + "/downloadFile/IME/IME_1692863472828.png"}
                            alt="Lucid Logo"
                            width={120}
                            className="img-responsive logo main-logo"
                          />
                        </div>
                        <div className="">
                          <div className="city text-center">IME</div>
                          <div className="city text-right text-success">
                            <small className="responsiveFontLarge  text-end">
                              रू {this.state.partnerBankData[3]?.openingBalance}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table className="table table-striped m-b-0">
                    <tbody>
                      <tr>
                        <td>Available Balance</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[3]?.availableBalance}</td>
                      </tr>
                      <tr>
                        <td>Payment Processed</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[3]?.paymentProcessed} </td>
                      </tr>
                      <tr>
                        <td>Processing amount</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[3]?.processingAmt}</td>
                      </tr>
                      <tr>
                        <td>No of Transaction:</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[3]?.noOfTransaction}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item text-center">
                        <div className="col-12">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p>Monday</p>
                              <i className="wi wi-day-hail"></i>
                            </li>
                            <li className="day col-4">
                              <p>Tuesday</p>
                              <i className="wi wi-day-lightning"></i>
                            </li>
                            <li className="day col-4">
                              <p>Wednesday</p>
                              <i className="wi wi-day-storm-showers"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="carousel-item text-center active">
                        <div className="col-12 ">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row clearfix">
              <div className="col-lg-4 col-md-12">
                <div className="card weather2">
                  <div className="body city-selected">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="icon">
                          <img
                            src="https://www.seekpng.com/png/full/271-2712306_through-esewa-users-can-pay-telephone-internet-electricity.png"
                            alt="Lucid Logo"
                            width={120}
                            className="img-responsive logo main-logo"
                          />
                        </div>
                        <div className="">
                          <div className="city text-center">eSewa</div>
                          <div className="city text-right text-success">
                            <small className="responsiveFontLarge  text-end">
                              रू {this.state.partnerBankData[4]?.openingBalance}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table className="table table-striped m-b-0">
                    <tbody>
                      <tr>
                        <td>Available Balance</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[4]?.availableBalance}</td>
                      </tr>
                      <tr>
                        <td>Payment Processed</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[3]?.paymentProcessed}</td>
                      </tr>
                      <tr>
                        <td>Processing amount</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[3]?.processingAmt}</td>
                      </tr>
                      <tr>
                        <td>No of Transaction:</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[3]?.noOfTransaction}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item text-center">
                        <div className="col-12">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p>Monday</p>
                              <i className="wi wi-day-hail"></i>
                            </li>
                            <li className="day col-4">
                              <p>Tuesday</p>
                              <i className="wi wi-day-lightning"></i>
                            </li>
                            <li className="day col-4">
                              <p>Wednesday</p>
                              <i className="wi wi-day-storm-showers"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="carousel-item text-center active">
                        <div className="col-12 ">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                             
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="card weather2">
                  <div className="body city-selected">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="icon">
                          <img
                            src="https://www.gmeremit.com/wp-content/uploads/2021/07/GME-LOGO-HD.png"
                            alt="Lucid Logo"
                            width={120}
                            className="img-responsive logo main-logo"
                          />
                        </div>
                        <div className="">
                          <div className="city text-center">GME</div>
                          <div className="city text-right text-success">
                            <small className="responsiveFontLarge  text-end">
                              रू {this.state.partnerBankData[2]?.availableBalance}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table className="table table-striped m-b-0">
                    <tbody>
                      <tr>
                        <td>Available Balance</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[2]?.availableBalance}</td>
                      </tr>
                      <tr>
                        <td>Payment Processed</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[2]?.paymentProcessed} </td>
                      </tr>
                      <tr>
                        <td>Processing amount</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[2]?.processingAmt}</td>
                      </tr>
                      <tr>
                        <td>No of Transaction:</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[2]?.noOfTransaction}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item text-center">
                        <div className="col-12">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p>Monday</p>
                              <i className="wi wi-day-hail"></i>
                            </li>
                            <li className="day col-4">
                              <p>Tuesday</p>
                              <i className="wi wi-day-lightning"></i>
                            </li>
                            <li className="day col-4">
                              <p>Wednesday</p>
                              <i className="wi wi-day-storm-showers"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="carousel-item text-center active">
                        <div className="col-12 ">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="card weather2">
                  <div className="body city-selected">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="icon">
                          <i className="text-info fa fa-plus"></i>
                        </div>
                        <div className="">
                          <div className="city text-center">Total</div>
                          <div className="city text-right text-success">
                            <small className="responsiveFontLarge  text-end">
                              रू {this.state.partnerBankData[0]?.availableBalance + this.state.partnerBankData[1]?.availableBalance + this.state.partnerBankData[2]?.availableBalance + this.state.partnerBankData[3]?.availableBalance + this.state.partnerBankData[4]?.availableBalance}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table className="table table-striped m-b-0">
                    <tbody>
                      <tr>
                        <td>Available Balance</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[0]?.availableBalance + this.state.partnerBankData[1]?.availableBalance + this.state.partnerBankData[2]?.availableBalance + this.state.partnerBankData[3]?.availableBalance + this.state.partnerBankData[4]?.availableBalance}</td>
                      </tr>
                      <tr>
                        <td>Payment Processed</td>
                        <td className="font-medium text-right">रू {Number((this.state.partnerBankData[0]?.paymentProcessed + this.state.partnerBankData[1]?.paymentProcessed + this.state.partnerBankData[2]?.paymentProcessed + this.state.partnerBankData[3]?.paymentProcessed + this.state.partnerBankData[4]?.paymentProcessed)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))} </td>

                      </tr>
                      <tr>
                        <td>Processing amount</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[0]?.processingAmt + this.state.partnerBankData[1]?.processingAmt + this.state.partnerBankData[2]?.processingAmt + this.state.partnerBankData[3]?.processingAmt + this.state.partnerBankData[4]?.processingAmt}</td>
                      </tr>
                      <tr>
                        <td>No of Transaction:</td>
                        <td className="font-medium text-right">रू {this.state.partnerBankData[0]?.noOfTransaction + this.state.partnerBankData[1]?.noOfTransaction + this.state.partnerBankData[2]?.noOfTransaction + this.state.partnerBankData[3]?.noOfTransaction + this.state.partnerBankData[4]?.noOfTransaction}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item text-center">
                        <div className="col-12">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p>Monday</p>
                              <i className="wi wi-day-hail"></i>
                            </li>
                            <li className="day col-4">
                              <p>Tuesday</p>
                              <i className="wi wi-day-lightning"></i>
                            </li>
                            <li className="day col-4">
                              <p>Wednesday</p>
                              <i className="wi wi-day-storm-showers"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="carousel-item text-center active">
                        <div className="col-12 ">
                          <ul className="row days-list list-unstyled">
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                            <li className="day col-4">
                              <p></p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer,
  navigationReducer,
  analyticalReducer,
}) => ({
  email: loginReducer.email,
  menuArrowToggle: navigationReducer.menuArrowToggle,
  sparkleCardData: analyticalReducer.sparkleCardData,
  topProductDropDown: analyticalReducer.topProductDropDown,
  referralsDropDown: analyticalReducer.referralsDropDown,
  recentChatDropDown: analyticalReducer.recentChatDropDown,
  facebookShowProgressBar: analyticalReducer.facebookShowProgressBar,
  twitterShowProgressBar: analyticalReducer.twitterShowProgressBar,
  affiliatesShowProgressBar: analyticalReducer.affiliatesShowProgressBar,
  searchShowProgressBar: analyticalReducer.searchShowProgressBar,
  loadingPage: analyticalReducer.loadingPage,
});

export default connect(mapStateToProps, {
  toggleMenuArrow,
  loadSparcleCard,
  onPressTopProductDropDown,
  onPressReferralsDropDown,
  onPressRecentChatDropDown,
  onPressDataManagedDropDown,
  facebookProgressBar,
  twitterProgressBar,
  affiliatesProgressBar,
  searchProgressBar,
})(Dashbord);
