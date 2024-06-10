import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { CommonConstants } from '../../Constants/common.constants';
import { useParams } from 'react-router-dom';

function VerifyEmailPage(props) {
    const queryParameters = new URLSearchParams(window.location.search)
    const Number = queryParameters.get("no")
    const { no } = useParams();
    const verificationCode = props.match.params.no;
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const [loadervalue, setloadervalue] = useState(false);

    useEffect(() => {
        async function verifyEmail() {
            setloadervalue(true);
            const sendData = new FormData();
            const decodedVerificationCode = Number.replace(/\s/g, '+');
            sendData.append('verificationnumber', `${decodedVerificationCode}`);
            try {
                const response = await axios.post(
                    CommonConstants.BASE_URL + '/verifyemailfromadmin',
                    sendData
                );
                if (response.data.status === true) {
                    setVerificationStatus(response.data.message);
                } else {
                    setVerificationStatus(response.data.message);
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setVerificationStatus('error');
            }
            setloadervalue(false);
        }

        verifyEmail();
    }, [Number]);


    const renderContent = () => {
        switch (verificationStatus) {
            case 'verifying':
                return <div><h2 className='purpleText mt-3'>Verifying...</h2></div>;
            case 'verified':
                return <div> <h2 className='purpleText mt-3'> Email Verified Successfully! </h2></div>;
            case 'error':
                return <div> <h2 className='purpleText mt-3'> Error Verifying Email. Please try again later.</h2></div>;
            default:
                return null;
        }
    };

    return (
        <div>
            {loadervalue == true ? <Loader /> : ""}
            <div className="theme-cyan">
                <div className="error-page-container">
                    <img src="https://dev.legalremitnepal.com.au/image/logo2.png" alt="404" />
                    {verificationStatus}
                    {/* <p className="pt-3">OOPPS! THE PAGE YOU WERE LOOKING DOESN'T EXIST.</p> */}
                    {/* <p>
                        <a href="" className="button purpleBackground text-white">
                            <i className="fa fa-home text-white" /> &nbsp;  Go to home page
                        </a>
                    </p> */}
                </div>
            </div>
        </div>
    );
}

export default VerifyEmailPage;
