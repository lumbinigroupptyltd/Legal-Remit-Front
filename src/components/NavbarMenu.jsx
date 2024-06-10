import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalComponentPopup from "../screens/Dashbord/ModalComponentPopup";
import { CommonConstants } from "../Constants/common.constants";
import {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
} from "../redux/actions";
import userProfile from "../assets/images/userProfile.png";
import axios from "axios";
import { getUser } from "../utils/useHelper";
import { Menu, MenuItem } from "@mui/material";

class NavbarMenu extends React.Component {
  state = {
    linkupdate: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      modalShowPrChange: false,
      firstName: "",
      lastName: "",
      notificationAnchorEl: null,
      rollid: null,
      dropdownAnchorEl: null,
    };
  }
  componentDidMount() {
    const userDetails = getUser();
    this.props.tostMessageLoad(true);
    var res = window.location.pathname;
    res = res.split("/");
    res = res.length > 4 ? res[4] : "/";
    const { activeKey } = this.props;
    this.activeMenutabwhenNavigate("/" + activeKey);
    this.getUserInfoById();
    const rollid = userDetails?.role;
    this.setState({ rollid });
  }

  activeMenutabwhenNavigate(activeKey) {
    if (
      activeKey === "/dashboard" ||
      activeKey === "/KYC" ||
      activeKey === "/users" ||
      activeKey === "/compliance" ||
      activeKey === "/rewards" ||
      activeKey === "/agents" ||
      activeKey === "/accounts" ||
      activeKey === "/reciever" ||
      activeKey === "/chatscreen" ||
      activeKey === "/transaction-utility" ||
      activeKey === "/flight-enquiry" ||
      activeKey === "/partner-bank" ||
      activeKey === "/service-charge" ||
      activeKey === "/payment-methods" ||
      activeKey === "/paymenttype" ||
      activeKey === "/exchange-rate" ||
      activeKey === "/notification-template" ||
      activeKey === "/promocode" ||
      activeKey === "/payout-partners"
    ) {
      this.activeMenutabContainer("DashboradContainer");
    } else if (
      activeKey === "/risk-management" ||
      activeKey === "/reportedfund" ||
      activeKey === "/appchat" ||
      activeKey === "/appcalendar" ||
      activeKey === "/appcontact" ||
      activeKey === "/apptaskbar"
    ) {
      this.activeMenutabContainer("AppContainer");
    } else if (
      activeKey === "/filemanagerdashboard" ||
      activeKey === "/filedocuments" ||
      activeKey === "/filemedia"
    ) {
      this.activeMenutabContainer("FileManagerContainer");
    } else if (
      activeKey === "/blognewpost" ||
      activeKey === "/bloglist" ||
      activeKey === "/blogdetails"
    ) {
      this.activeMenutabContainer("BlogContainer");
    } else if (
      activeKey === "/uitypography" ||
      activeKey === "/uitabs" ||
      activeKey === "/uibuttons" ||
      activeKey === "/bootstrapui" ||
      activeKey === "/uiicons" ||
      activeKey === "/uinotifications" ||
      activeKey === "/uicolors" ||
      activeKey === "/uilistgroup" ||
      activeKey === "/uimediaobject" ||
      activeKey === "/uimodal" ||
      activeKey === "/uiprogressbar"
    ) {
      this.activeMenutabContainer("UIElementsContainer");
    } else if (
      activeKey === "/widgetsdata" ||
      activeKey === "/widgetsweather" ||
      activeKey === "/widgetsblog" ||
      activeKey === "/widgetsecommers"
    ) {
      this.activeMenutabContainer("WidgetsContainer");
    } else if (activeKey === "/login") {
      this.activeMenutabContainer("WidgetsContainer");
    } else if (
      activeKey === "/teamsboard" ||
      activeKey === "/profilev2page" ||
      activeKey === "/helperclass" ||
      activeKey === "/searchresult" ||
      activeKey === "/invoicesv2" ||
      activeKey === "/invoices" ||
      activeKey === "/pricing" ||
      activeKey === "/timeline" ||
      activeKey === "/profilev1page" ||
      activeKey === "/blankpage" ||
      activeKey === "/imagegalleryprofile" ||
      activeKey === "/projectslist" ||
      activeKey === "/maintanance" ||
      activeKey === "/testimonials" ||
      activeKey === "/faqs"
    ) {
      this.activeMenutabContainer("PagesContainer");
    } else if (
      activeKey === "/formvalidation" ||
      activeKey === "/basicelements"
    ) {
      this.activeMenutabContainer("FormsContainer");
    } else if (activeKey === "/tablenormal") {
      this.activeMenutabContainer("TablesContainer");
    } else if (activeKey === "/echart") {
      this.activeMenutabContainer("chartsContainer");
    } else if (activeKey === "/leafletmap") {
      this.activeMenutabContainer("MapsContainer");
    }
  }

  handlegoHome = () => {
    this.props.navigate("/");
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modalShowPrChange: !prevState.modalShowPrChange,
    }));
  };
  handlelogouttt = () => {
    this.toggleModal();
  };
  handleLogoutClick = () => {
    localStorage.clear();
    this.props.navigate("/login");
  };

  handlePrchangePopupCancle = () => {
    this.setState({
      modalShowPrChange: false,
    });
  };

  activeMenutabContainer(id) {
    var parents = document.getElementById("main-menu");
    var activeMenu = document.getElementById(id);

    for (let index = 0; index < parents.children.length; index++) {
      if (parents.children[index].id !== id) {
        parents.children[index].classList.remove("active");
        parents.children[index].children[1].classList.remove("in");
      }
    }
    // note please
    setTimeout(() => {}, 10);
  }
  getUserInfoById = async () => {
    const userId = localStorage.getItem("Id");
    const payLoad = {
      id: userId,
    };
    try {
      const response = await axios.post(
        `${CommonConstants.BASE_URL}/getuserinfobyid`,
        payLoad
      );
      this.setState({ firstName: response.data.data.fName });
      this.setState({ lastName: response.data.data.lName });
    } catch (error) {
      console.error(error);
    }
  };

  handleNotificationClick = (event) => {
    this.setState({ notificationAnchorEl: event.currentTarget });
  };

  handleNotificationClose = () => {
    this.setState({ notificationAnchorEl: null });
  };

  handleDropdownClick = (event) => {
    this.setState({ dropdownAnchorEl: event.currentTarget });
  };

  handleDropdownClose = () => {
    this.setState({ dropdownAnchorEl: null });
  };

  handleLogout = () => {
    // Handle logout logic here
    this.handleDropdownClose();
  };

  handleNotificationSelect = (eventKey) => {
    this.props.navigate("/notifications");
  };
  render() {
    let nn = window.location.pathname;
    let subPath = nn.replace("/", "");
    const {
      addClassactive,
      addClassactiveChildAuth,
      addClassactiveChildMaps,
      themeColor,
      toggleNotification,
      toggleEqualizer,
      sideMenuTab,
      isToastMessage,
      activeKey,
    } = this.props;
    var path = window.location.pathname;
    const { dropdownAnchorEl } = this.state;
    const { notificationAnchorEl } = this.state;

    document.body.classList.add(themeColor);

    return (
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-btn">
              <button
                className="btn-toggle-offcanvas ms-0"
                onClick={() => {
                  this.props.onPressSideMenuToggle();
                }}
              >
                <i className="lnr lnr-menu fa fa-bars"></i>
              </button>
            </div>

            <div className="navbar-brand leftLogo pointer">
              <a
                onClick={() => {
                  this.handlegoHome();
                }}
              >
                <img
                  src="https://dev.legalremitnepal.com.au/image/logo2.png"
                  alt="Lucid Logo"
                  className="img-responsive logo main-logo"
                />
              </a>
            </div>

            <div className="navbar-right">
              <div id="navbar-menu">
                <ul className="nav navbar-nav">
                  <li
                    // className={
                    //   notificationAnchorEl ? "show dropdown" : "dropdown"
                    // }
                    className="d-none"
                  >
                    <NavDropdown
                      className="bg-transparent mx-3 custom-dropdown-toggle"
                      title={<i className="text-black fa fa-bell"></i>}
                      id="basic-nav-dropdown"
                      onSelect={this.handleNotificationSelect}
                    ></NavDropdown>
                    <Menu
                      anchorEl={notificationAnchorEl}
                      open={Boolean(notificationAnchorEl)}
                      onClose={this.handleNotificationClose}
                    >
                      <MenuItem>
                        <div className="media">
                          <div className="media-left">
                            <i className="icon-blue text-warning"></i>
                          </div>
                          <div className="media-body">
                            <p className="text border-bottom">Notifications</p>
                            <div className="text">Campaign Holiday Sale</div>
                            {/* <span className="timestamp">10:00 AM Today</span> */}
                          </div>
                        </div>
                      </MenuItem>
                      <MenuItem className="footer border-top">
                        <a className="more pointer">See all </a>
                      </MenuItem>
                    </Menu>
                  </li>

                  <li
                    className={
                      this.state.dropdownOpen ? "show dropdown" : "dropdown"
                    }
                  >
                    <NavDropdown
                      className="d-none bg-transparent mx-3  custom-dropdown-toggle"
                      title={<i className="text-black fa fa-sign-out"></i>}
                      id="basic-nav-dropdown"
                      noCaret
                    >
                      <NavDropdown.Item>
                        <a
                          className="dropdown-item px-0 py-0"
                          style={{ color: "white" }}
                        >
                          <i className="fa fa-credit-card text-black "></i>{" "}
                          <small className="responsiveFontLarge text-black ps-1">
                            {" "}
                            Transaction Trackings
                          </small>
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <a
                          className="dropdown-item px-0 py-0"
                          style={{ color: "white" }}
                        >
                          <i className="fa fa-file text-black "></i>{" "}
                          <small className="responsiveFontLarge text-black ps-2">
                            {" "}
                            KYC Trackings
                          </small>
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <a
                          className="dropdown-item px-0 py-0"
                          style={{ color: "white" }}
                        >
                          <i className="fa fa-gears text-black "></i>{" "}
                          <small className="responsiveFontLarge text-black ps-1">
                            {" "}
                            CRON Jobs
                          </small>
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={this.handlelogouttt}>
                        <a
                          className="dropdown-item px-0 py-0"
                          style={{ color: "white" }}
                        >
                          <i className="fa fa-sign-out text-black "></i>{" "}
                          <small className="responsiveFontLarge text-black ps-1">
                            {" "}
                            Logout
                          </small>
                        </a>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </li>

                  <li
                    style={{ cursor: "pointer" }}
                    onClick={this.handleNotificationSelect}
                  >
                    <span className="icon-menu">
                      <i className="text-black fa fa-bell"></i>
                    </span>
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={this.handlelogouttt}
                  >
                    <span className="icon-menu">
                      <i className="fa fa-sign-out text-black "></i>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <ModalComponentPopup
          show={this.state.modalShowPrChange}
          title1={"Are you sure want to Logout?"}
          cancle={this.handlePrchangePopupCancle}
          SavePr={this.handleLogoutClick}
        />
        <div
          id="left-sidebar"
          className="sidebar "
          style={{
            zIndex: 9,
            display: this.state.rollid == "ADMIN" ? "block" : "none",
          }}
        >
          <div className="sidebar-scroll">
            <div className="user-account">
              <img
                src={userProfile}
                className="rounded-circle user-photo"
                alt="User Profile Picture"
              />
              <Dropdown>
                <div className="normal text-black">Welcome,</div>
                <Dropdown.Toggle
                  variant="none"
                  as="a"
                  id="dropdown-basic"
                  className="user-name custom-dropdown-toggle"
                >
                  <strong
                    className="purpleText normal"
                    style={{ pointerEvents: "none" }}
                  >
                    {this.state.firstName} {this.state.lastName}
                  </strong>
                </Dropdown.Toggle>
                <Dropdown.Menu className="d-none dropdown-menu-right account">
                  <Dropdown.Item href="profilev2page">
                    <i className="icon-user"></i>My Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="appinbox">
                    {" "}
                    <i className="icon-envelope-open"></i>Messages
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {" "}
                    <i className="icon-settings"></i>Settings
                  </Dropdown.Item>
                  <li className="divider"></li>
                  <Dropdown.Item href="login">
                    {" "}
                    <i className="icon-power"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <ul className="nav nav-tabs mt-4">
              <li className="nav-item pointer">
                <a
                  className={sideMenuTab[0] ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(0);
                  }}
                >
                  Menu
                </a>
              </li>

              <li className="nav-item pointer">
                <a
                  className={
                    sideMenuTab[1]
                      ? "nav-link active pointer"
                      : "nav-link pointer"
                  }
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(1);
                  }}
                  title="Settings"
                >
                  <i className="fa fa-gear"></i>
                </a>
              </li>
              <li className="nav-item pointer">
                <a
                  className={
                    sideMenuTab[2]
                      ? "nav-link active pointer"
                      : "nav-link pointer"
                  }
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(2);
                  }}
                  title="Additional Settings"
                >
                  <i className="fa fa-wrench"></i>
                </a>
              </li>
              <li className="nav-item pointer">
                <a
                  className={
                    sideMenuTab[3]
                      ? "nav-link active pointer"
                      : "nav-link pointer"
                  }
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(3);
                  }}
                  title="Content Management"
                >
                  <i className="fa fa-code"></i>
                </a>
              </li>
            </ul>
            <div className="tab-content p-l-0 p-r-0">
              <div
                className={sideMenuTab[0] ? "tab-pane active show" : "tab-pane"}
                id="menu"
              >
                <Nav id="left-sidebar-nav" className="sidebar-nav">
                  <ul id="main-menu" className="metismenu">
                    <li className="" id="dashboradContainer">
                      <div>
                        <li
                          className={activeKey === "dashboard" ? "active" : ""}
                        >
                          <Link to="dashboard">
                            {" "}
                            <i className="fa fa-home"></i>
                            &nbsp;&nbsp;&nbsp;Dashboard
                          </Link>
                        </li>
                      </div>

                      <li
                        className={
                          activeKey === "transaction-utility" ||
                          subPath == "transaction-view"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="transaction-utility">
                          {" "}
                          <i className="	fa fa-credit-card"></i>
                          &nbsp;&nbsp;&nbsp;Transactions
                        </Link>
                      </li>

                      <li
                        className={activeKey === "compliance" ? "active" : ""}
                      >
                        <Link to="compliance">
                          {" "}
                          <i className="fa fa-gavel"></i>
                          &nbsp;&nbsp;&nbsp;Compliance
                        </Link>
                      </li>

                      <li
                        className={
                          activeKey === "risk-management" ||
                          subPath == "create-risk-management"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="risk-management">
                          <i
                            className="fa fa-exclamation-triangle"
                            aria-hidden="true"
                          ></i>
                          &nbsp;&nbsp;&nbsp;Risk Management
                        </Link>
                      </li>

                      <li
                        className={
                          activeKey === "users" || subPath == "individualuser"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="users">
                          {" "}
                          <i className="fa fa-user"></i>&nbsp;&nbsp;&nbsp;Users
                        </Link>
                      </li>

                      <li
                        className={activeKey === "chatscreen" ? "active" : ""}
                      >
                        <Link to="chatscreen">
                          {" "}
                          <i className="fa fa-comments"></i>&nbsp;&nbsp;Chat
                        </Link>
                      </li>
                      <li
                        className={
                          activeKey === "exchange-rate" ||
                          subPath == "exchange-rate-form"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="exchange-rate">
                          {" "}
                          <i className="fa fa-exchange"></i>
                          &nbsp;&nbsp;&nbsp;Exchange Rate
                        </Link>
                      </li>
                      <li className={activeKey === "rewards" ? "active" : ""}>
                        <Link to="rewards">
                          {" "}
                          <i className="fa fa-trophy"></i>
                          &nbsp;&nbsp;&nbsp;Rewards
                        </Link>
                      </li>
                      <li
                        className={
                          activeKey === "accounts" || subPath == "add-accounts"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="accounts">
                          {" "}
                          <i className="fa fa-users"></i>
                          &nbsp;&nbsp;&nbsp;Accountings
                        </Link>
                      </li>
                      <li className={activeKey === "agents" ? "active" : ""}>
                        <Link to="agents">
                          {" "}
                          <i className="fa fa-user-secret"></i>
                          &nbsp;&nbsp;&nbsp;Agents
                        </Link>
                      </li>
                      <li
                        className={
                          activeKey === "notification-template" ||
                          subPath == "notification-template-create"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="notification-template">
                          {" "}
                          <i className="fa fa-bell"></i>
                          &nbsp;&nbsp;&nbsp;Notification Template
                        </Link>
                      </li>
                    </li>
                  </ul>
                </Nav>
              </div>
              <div
                className={
                  sideMenuTab[1]
                    ? "tab-pane ps-2 p-r-15 show active"
                    : "tab-pane ps-2 p-r-15"
                }
                id="Chat"
              >
                <ul className="collapse111 ps-0">
                  <li
                    className={
                      activeKey === "service-charge" ||
                      subPath == "create-service-charge"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="service-charge">
                      Service Charge
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "payment-methods" ||
                      subPath == "create-payment-methods"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="payment-methods">
                      Payment Methods
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "paymenttype" || subPath == "addpaymenttype"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="paymenttype">
                      Payment Type
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "deliveryMethod" ||
                      subPath == "deliveryMethodCreate"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="deliveryMethod">
                      Delivery Methods
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "deliverymethodlist" ||
                      subPath == "adddeliverytype"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="deliverymethodlist">
                      Delivery Type
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "partner-bank" ||
                      subPath == "create-partner-bank"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="partner-bank">
                      Payout Partner
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "purpose-of-transfer"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="purpose-of-transfer">
                      Purpose of Transfer
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "relation"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="relation">
                      Relation
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "occupation"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="occupation">
                      Occupation
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "typeofid" || subPath == "create-type-of-id"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="typeofid">
                      Type of ID
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "id-issuing-authority" ||
                      subPath == "create-id-issuing-authority"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="id-issuing-authority">
                      Id Issuing Authority
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "country-settings-list" ||
                      subPath == "country-settings"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link
                      className="liInnerSettings"
                      to="country-settings-list"
                    >
                      Country Settings
                    </Link>
                  </li>

                  {/* <li
                    className={
                      activeKey === "Kycfrommangement"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="Kycfrommangement">
                      KYC Forms Management
                    </Link>
                  </li> */}
                  <li
                    className={
                      activeKey === "send-money-forms"
                        ? "active liInnerSettings d-none"
                        : "liInnerSettings d-none"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="send-money-forms">
                      Send Money Forms Management
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "utility-service-transaction"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link
                      className="liInnerSettings"
                      to="utility-service-transaction"
                    >
                      Utility Service Management
                    </Link>
                  </li>
                </ul>
              </div>

              <div
                className={
                  sideMenuTab[2]
                    ? "tab-pane p-l-15 p-r-15 show active"
                    : "tab-pane p-l-15 p-r-15"
                }
                id="setting"
              >
                <ul className="collapse11 ps-0">
                  <li
                    className={
                      activeKey === "reported-fraud"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="reported-fraud">
                      Reported Fraud
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "refunds"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="refunds">
                      Refunds
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "canceltransactions"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="canceltransactions">
                      Cancel Transactions
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "complaints-admin"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="complaints-admin">
                      Complaints
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "contactUs"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="contactUs">
                      Contact Us Lead
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "ouragents"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="ouragents">
                      Become an Agent
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "deviceinfo"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="deviceinfo">
                      Device and IP Info
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "payout-partners"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="payout-partners">
                      Partner Bank API
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "api-logs"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="api-logs">
                      API Logs
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "reviews" || subPath == "edit-reviews"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="reviews">
                      Reviews
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className={
                  sideMenuTab[3]
                    ? "tab-pane ps-2 p-r-15 show active"
                    : "tab-pane ps-2 p-r-15"
                }
                id="question"
              >
                <ul className="collapse11 ps-0">
                  <li
                    className={
                      activeKey === "faq-content"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="faq-content">
                      FAQ
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "aboutus-CMS"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="aboutus-CMS">
                      Contact Us
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "CMS"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="CMS">
                      CMS
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "blogsmangement"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="blogsmangement">
                      Blogs
                    </Link>
                  </li>
                  <li
                    className={
                      activeKey === "careermanagement" ||
                      subPath == "view-careermanagement"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="careermanagement">
                      Careers
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "news" || subPath == "news"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="news">
                      News
                    </Link>
                  </li>

                  <li
                    className={
                      activeKey === "siteconfig"
                        ? "active liInnerSettings"
                        : "liInnerSettings"
                    }
                    onClick={() => {}}
                  >
                    <Link className="liInnerSettings" to="siteconfig">
                      Configuration
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavbarMenu.propTypes = {
  addClassactive: PropTypes.array.isRequired,
  addClassactiveChild: PropTypes.array.isRequired,
  addClassactiveChildApp: PropTypes.array.isRequired,
  addClassactiveChildFM: PropTypes.array.isRequired,
  addClassactiveChildBlog: PropTypes.array.isRequired,
  addClassactiveChildUI: PropTypes.array.isRequired,
  addClassactiveChildWidgets: PropTypes.array.isRequired,
  addClassactiveChildAuth: PropTypes.array.isRequired,
  addClassactiveChildPages: PropTypes.array.isRequired,
  addClassactiveChildForms: PropTypes.array.isRequired,
  addClassactiveChildTables: PropTypes.array.isRequired,
  addClassactiveChildChart: PropTypes.array.isRequired,
  addClassactiveChildMaps: PropTypes.array.isRequired,
  themeColor: PropTypes.string.isRequired,
  generalSetting: PropTypes.array.isRequired,
  toggleNotification: PropTypes.bool.isRequired,
  toggleEqualizer: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ navigationReducer }) => {
  const {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
  } = navigationReducer;
  return {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
  };
};

export default connect(mapStateToProps, {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
})(NavbarMenu);
