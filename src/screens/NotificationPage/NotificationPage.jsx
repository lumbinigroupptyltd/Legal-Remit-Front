import React, { useEffect, useState } from "react";
import "./NotificationPage.scss";
import { Container, Dropdown } from "react-bootstrap";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiPaginationItem-root': {
//       color: '#000',
//       border: '1px solid #ccc',
//       borderRadius: '50%',
//       marginRight: '4px',
//       fontWeight: 'bold',
//       '&:hover': {
//         backgroundColor: '#f5f5f5',
//       },
//       '&.Mui-selected': {
//         backgroundColor: '#f5f5f5',
//         color: '#000',
//       },
//     },
//   },
// }));

export default function NotificationPage(props) {
  const [selectedValue, setSelectedValue] = useState(50);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(50);
  const [notifications, setNotifications] = useState([]);
  const [numItems, SetNumItems] = React.useState(0);
  const [CountPage, SetCountPage] = React.useState(0);
  // const classes = useStyles();
  const getNotification = async () => {
    try {
      const NotifyObj = {
        userId: localStorage.getItem("Id"),
        pageindex: Page,
        pagesize: RowsPerPage,
        sortparam: "created_at",
        sortorder: "DESC",
      };

      const Notifyresponse = await axios.post(
        CommonConstants.BASE_URL + "/getallnotificationsbyuser",
        NotifyObj
      );
      if (Notifyresponse.data.status == true) {
        setNotifications(Notifyresponse.data.data);
        SetCountPage(Notifyresponse.data?.totalPageCount);
        SetNumItems(Notifyresponse.data.recordCount);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ChangeRowSelected = (Event) => {
    setSelectedValue(Event);
    SetRowsPerPage(Number(Event));
    SetPage(1);
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };

  useEffect(() => {
    getNotification();
  }, [Page, RowsPerPage]);

  return (
    <>
      <section className=" abtPage">
        <NavBar></NavBar>
        <Container className="bg-white py-2 px-5 rounded-4 mb-5">
          <div className="headerText d-flex justify-content-between py-4 respoChildFooter">
            <h1 className="purpleText bolder">Notifications</h1>
            <Dropdown className={`bg-transparent ${notifications?.length > 0 ? 'd-block' : 'd-none'}`} onSelect={ChangeRowSelected}>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="m-0 bg-transparent purpleText1 purpleText"
              >
                {selectedValue}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {CommonConstants.show_rows?.map((value) => (
                  <Dropdown.Item key={value} eventKey={value}>
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="my-4">
            <div className="notify-box">
              {notifications?.length > 0 ? (
                notifications?.map((Notify, index) => {
                  return (
                    <>
                      <div className="innerBoxItem my-4 mx-4 pb-4 border-bottom">
                        <small>
                          {/* <small
                            className={`capitalize badgeText  fw-semibold badge ${
                              Notify?.notificationType == "warning"
                                ? "bg-warning text-white"
                                : Notify?.notificationType == "alert"
                                ? "bg-danger text-white"
                                : "bg-light text-dark"
                            } mr-2`}
                          >
                            {Notify?.notificationType}
                          </small> */}
                          <span
                            style={{ color: "#000" }}
                            className= {` ${
                              Notify?.notificationType == "warning"
                                ? "text-warning"
                                : Notify?.notificationType == "alert"
                                ? "text-danger"
                                : Notify?.notificationType == "Info"
                                ? "text-info"
                                : Notify?.notificationType == "action"
                                ? "text-primary"
                                : "text-dark"
                            }`}
                          >
                            {Notify?.body}
                          </span>
                        </small>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center BlankNotificationHeight align-items-center">
                  <p>No Notifications are available</p>
                </div>
              )}
              {/* <div className='innerBoxItem my-4 mx-4 pb-4 border-bottom'>
                         <small className='text-black'>Verify your email address!  To finish setting up your Legalremit account, we just need to make sure this email address is yours. To verify <b className='purpleText'>Click here</b></small>
                      </div>
                      <div className='innerBoxItem my-4 mx-4 pb-4 border-bottom'>
                         <small className='text-black'>Your transaction status with Pooja Shah is updated. Your transaction is  <b className='successText'>Completed</b></small>
                      </div>
                      <div className='innerBoxItem my-4 mx-4 pb-4 border-bottom'>
                         <small className='text-black'>Hey ! You can pay your utility bills with Legalremit now. There is no need to go to any other plateform to pay your bills. 10% off for Utility Bill Payments in Nepal.</small>
                      </div>
                      <div className='innerBoxItem my-4 mx-4 pb-4 border-bottom'>
                         <small className='text-black'>Hey ! You can pay your utility bills with Legalremit now. There is no need to go to any other plateform to pay your bills. 10% off for Utility Bill Payments in Nepal.</small>
                      </div>
                      <div className='innerBoxItem my-4 mx-4 pb-4 border-bottom'>
                         <small className='text-black'>Verify your email address!  To finish setting up your Legalremit account, we just need to make sure this email address is yours. To verify <b className='purpleText'>Click here</b></small>
                      </div>
                      <div className='innerBoxItem my-4 mx-4 pb-4 border-bottom'>
                         <small className='text-black'>Hey ! You can pay your utility bills with Legalremit now. There is no need to go to any other plateform to pay your bills. 10% off for Utility Bill Payments in Nepal.</small>
                      </div>
                      <div className='innerBoxItem my-4 mx-4 pb-3'>
                         <small className='text-black'>Hey ! You can pay your utility bills with Legalremit now. There is no need to go to any other plateform to pay your bills. 10% off for Utility Bill Payments in Nepal.</small>
                      </div> */}
            </div>
          </div>
          <Container className={`pb-3 moneySendRespo align-items-center justify-content-between`}>
            <div className={`filter-row pt-2 ${notifications?.length > 0 ? 'd-block' : 'd-none'}`}>
              Showing {(Page - 1) * RowsPerPage + 1} to{" "}
              {Page * RowsPerPage > numItems ? numItems : Page * RowsPerPage} of{" "}
              {numItems} entries
            </div>
            <Pagination
            className={`${notifications?.length > 0 ? 'd-block' : 'd-none'}`}
              count={CountPage}
              page={Page}
              onChange={HandleChangePage}
            />
          </Container>
        </Container>
      </section>
      <Footer></Footer>
    </>
  );
}
