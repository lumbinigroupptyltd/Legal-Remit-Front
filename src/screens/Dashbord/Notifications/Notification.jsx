import React, { useEffect, useState } from 'react';
import './Notification.scss'
import { Container } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { CommonConstants } from '../../../Constants/common.constants';
import Loader from '../../Loader/Loader';

export default function Notification(props) {
    const [loadervalue, setloadervalue] = useState(false);
    const [allNotifications, setAllNotifications] = useState([]);
    const [CountPage, SetCountPage] = useState(0);
    const [Page, SetPage] = useState(1);
    const [RowsPerPage, SetRowsPerPage] = useState(CommonConstants.DefaultPageSize);
    const [numItems, SetNumItems] = useState(0);
    const getAllNotifications = async () => {
        const userId = localStorage.getItem("Id");
        setloadervalue(true);
        const sendData = {
            "userId": userId,
            "pageindex": Page,
            "pagesize": RowsPerPage,
            "sortparam": "created_at",
            "sortorder": "DESC"
        }
        const getData = await axios.post(CommonConstants.BASE_URL + '/getallnotificationsbyuser', sendData);
        if (getData.data.status == true) {
            setAllNotifications(getData.data.data);
            SetCountPage(getData.data.totalPageCount)
            SetNumItems(getData.data.recordCount);
        }
        setloadervalue(false);
    }
    const HandleChangePage = (Event, NewPage) => {
        if (NewPage == Page) {
            SetPage(NewPage);
        } else {
            SetPage(NewPage);
        }
    };

    useEffect(() => {
        getAllNotifications();
    }, [RowsPerPage, Page])
    return (
        <>
            <section className=' abtPage'>
                {loadervalue == true ? <Loader /> : ""}
                <Container className='bg-white py-2 px-5 rounded-4 mb-5'>
                    <div className='headerText pt-4'>
                        <h1 className='purpleText bolder'>Notifications</h1>
                    </div>
                    <div className='my-4'>
                        {allNotifications && allNotifications.map((row, index) => (
                            <div className='notify-box' key={index}>
                                <div className='innerBoxItem my-4 mx-4 pb-4 border-bottom'>
                                    {/* Conditionally set the text color based on notificationType */}
                                    <span >
                                        <span className={row.notificationType === 'alert' ? 'alert-text' : row.notificationType === 'warning' ? 'warning-text' : 'default-text'}>{row.body}</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className='innerBoxItem my-4 mx-4 pb-4 border-bottom'>
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
                    <Container className='mt-5 pb-3 moneySendRespo'>
                        <div className='d-flex justify-content-end ms-auto'>
                            <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                        </div>
                    </Container>
                </Container>
            </section>
        </>
    )
}
