import React, { useEffect, useState } from "react";
import "./Compliance.css";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import { CommonConstants } from "../../../Constants/common.constants";
import axios from "axios";
import Loader from "../../Loader/Loader";
import ModalComponent from "../ModalComponent";
import { saveAs } from 'file-saver';
import moment from "moment";
export default function Compliance() {

  const [TransactionData, setTransactionData] = useState([]);
  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(10);
  const [numItems, SetNumItems] = React.useState(0);
  const [loadervalue, setloadervalue] = useState(false);
  const [selectedValue, setSelectedValue] = useState(10);
  const [ReceiverInfo, setReceiverInfo] = useState([]);
  const [selectedDropDownValue, setSelectedDropDownValue] = useState('');
  const [mrReportData, setSmrReportData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndDate] = useState("");
  const [UserBlackListedData, setUserBlackListedData] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const [downloadHeaders, setDownloadHeaders] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);

  const summeryReportHeading = [
    'Total No of High Risk Clients ',
    'Total No of Medium Risk Clients',
    'Total No of Low Risk Clients',

    'Total No of registered customers',
    'Total No of newly verified KYC',
    'Total no of Unverified KYC',

    'Total No of Reverified KYC after 3 years',
    'Total No of Reverified KYC after ID expired',
    'Total No of unverified KYC(Three years Older KYC)',
    'Total No of Unverified KYC(ID Expired)',

    'Total no of ECDD',
    'Total No of Blacklisted clients',
    'Total No of SMR',

    'Total No of Austrac reports submitted(individual)',
    'Total No of Austrac Reports submitted(business)',

    'Total No of Active business Users',
    'Total No of Active individual users',
    'Total no of inactive buisness users ',
    'Total no of inactive individual users',

    'Total No of Transaction',
    'Total no of verified Transaction',
    'Total No of Refunded Transaction',
    'Total No of Fake Transaction',
    'Total No of Duplicate Transaction',
    'Total No of Fraud Transaction ',
    'Total No of Cancelled Transaction',

    'Total No of Individual Transaction ',
    'Total no of Buisness Transaction ',

    'Total No of Bank Deposit',
    'Total No of Wallet Deposit ',
    'Total no of Cash Pickup ',
    'Total No of Utility Transaction',
    'Other Devlivery Method'
  ]
  const summaryReportKeys = [
    'noOfHighriskUser',
    'noOfMeduimriskUser',
    'noOfLowriskUser',
    'noOfRegisteruser',
    'noOfNewlyKycVerified',
    'noOfUnverifiedKyc',
    'noOfReverifiedKycAfterThreeYrs',
    'noOfReverifiedKycAfterIdExp',
    'noOfUnverifiedKycThreeYrsOlder',
    'noOfUnverifiedKycIdExp',
    'noOfEcddUsers',
    'noOfBlacklistUsers',
    'noOfsmr',
    'noOfActivebusinessUsers',
    'noOfActiveIndividualUsers',
    'noOfInactiveBusinessUsers',
    'noOfInactiveIndividualUsers',
    'noOfTransactions',
    'noOfVerifiedTransactions',
    'noOfRefundedTransactions',
    'noOfFakeTransactions',
    'noOfDuplicateTransactions',
    'noOfFraudTransactions',
    'noOfCancelledTransactions',
    'noOfIndividualTransactions',
    'noOfBusinessTransaction',
    'noOfBankDeposit',
    'noOfWalletDeposit',
    'noOfCashPickup',
    'noOfUtilityTransactions',
    'noOfOtherDeliveryMethod',
  ];
  const handleDownloadButtonClick = (event) => {
    event.preventDefault();
    if (selectedDropDownValue == "SMR Report") {
      getSmrReports();
    } else if (selectedDropDownValue == "Blacklist Report") {
      getBlacklistReport();
    } else if (selectedDropDownValue == "OCDD Report") {
      getocddreports();
    } else if (selectedDropDownValue == "ECDD Report") {
      getecddreports();
    } else if (selectedDropDownValue == "TM Report") {
      gettmreports();
    } else if (selectedDropDownValue == "Compliance Report") {
      getcompliancesummeryreport();
    } else if (selectedDropDownValue == "Austrac Report") {
      getAustracReport();
    }
  };

  const firstLineHeaders = [
    { label: 'OUTGOING Transaction details' },
    { label: 'Ordering customer' },
    { label: 'Ordering customer - contact details' },
    { label: 'Ordering customer - identification details' },
    { label: 'Ordering customer - Beneficiary customer' },
    { label: 'Beneficiary customer - contact details' },
    { label: 'Beneficiary customer - business details' },
    { label: 'Beneficiary customer - account details' },
    { label: 'Person/organisation accepting the transfer instruction (Australian presumed)' },
    { label: 'Person/organisation receiving the transfer instruction (expecting overseas)' },
    { label: 'Person/organisation distributing money or property (if different) (expecting overseas)' },
    { label: 'Retail outlet/business location where money or property is being distributed (if different) (expecting overseas)' },
    { label: 'Reason' },
    { label: 'Person completing this report' },
  ];
  const secondLineHeaders = [
    { label: 'Date money / property received from the ordering customer' },
    { label: 'Date money / property made available to the beneficiary customer' },
    { label: 'Currency code' },
    { label: 'Total amount / value' },
    { label: 'Type of transfer' },
    { label: 'Description of property' },
    { label: 'Transaction reference number' },
  ];
  const thirdLineHeaders = [
    { label: 'Full name' },
    { label: 'If known by any other name' },
    { label: 'Date of birth' },
  ];
  const fourthHeaders = [
    { label: 'Business/ residential address' },
    { label: 'City / town / suburb' },
    { label: 'State' },
    { label: 'Postcode' },
    { label: 'Country' },
    { label: 'Phone' },
    { label: 'Email' },
  ]
  const FiveHeaders = [
    { label: 'Occupation, business or principal activity' },
    { label: 'ABN, ACN or ARBN' },
    { label: 'Customer number(allocated by remitter)' },
    { label: 'Account number(held by remitter)' },
    { label: 'Business structure(if not an individual)' },
  ]
  const sixthHeaders = [
    { label: 'ID type' },
    { label: 'Number' },
    { label: 'Issuer' },
    { label: 'Electronic data source' },
  ]
  const seventhHeaders = [
    { label: 'Account number' },
    { label: 'Name of institution(where account is held)' },
    { label: 'City' },
    { label: 'Country' },
  ]
  const gightHeadres = [
    { label: 'Identification number of the retail outlet/ business location' },
    { label: 'Identification number of the retail outlet/ business location' },
    { label: 'Full name' },
    { label: 'Business/ residential address(not a post box address)' },
    { label: 'City / town / suburb' },
    { label: 'state' },
    { label: 'Postcode' },
    { label: 'Is this person/ organisation accepting the money or property?' },
    { label: 'Is this person/ organisation sending the transfer instruction?' },
  ]
  const getAustracReport = async () => {
    const ausTracReportsHeading = [
      { label: 'SN', key: 'sn' },
      { label: 'Date money / property received from the ordering customer', key: 'deliveredDate' },
      { label: 'Date money / property made available to the beneficiary customer', key: 'propertyAvailableDate' },
      { label: 'Currency code', key: 'currencyCode' },
      { label: 'Total amount / value', key: 'totalSentAmt' },
      { label: 'Type of transfer', key: 'typeOfTransfer' },
      { label: 'Description of property', key: 'descriptionProperty' },
      { label: 'Transaction reference number', key: '-' },
      { label: 'Sender Full name', key: 'senderName' },
      { label: 'If known by any other name', key: '-' },
      { label: 'Date of birth', key: 'senderDob' },
      { label: 'Business/ residential address', key: 'senderAddress' },
      { label: 'City / town / suburb', key: '-' },
      { label: 'State', key: 'senderState' },
      { label: 'Postcode', key: 'senderPostalCode' },
      { label: 'Country', key: 'sendercountry' },
      { label: 'Phone', key: 'senderPhone' },
      { label: 'Email', key: 'senderEmail' },
      { label: 'Occupation, business or principal activity', key: 'occupation' },
      { label: 'ABN, ACN or ARBN', key: 'abn' },
      { label: 'Customer number', key: 'customerId' },
      { label: 'Account number(held by remitter)', key: 'accountNoRemitter' },
      { label: 'Business structure', key: 'businessStructure' },
      { label: 'ID type (1)', key: 'firstDirId' },
      { label: 'Number', key: 'firstDirIdNo' },
      { label: 'Issuer', key: 'firstDirIssueOfAuth' },
      { label: 'ID type (2)', key: 'secDirId' },
      { label: 'Number', key: 'secDirIdNo' },
      { label: 'Issuer', key: 'secDirIssueOfAuth' },
      { label: 'Electronic data source', key: 'electronicDataSource' },
      { label: 'Recipient Full name', key: 'recipientName' },
      { label: 'Date of birth', key: 'recipientDob' },
      { label: 'Any business name under which the beneficiary customer is operating', key: '-' },
      { label: 'Business/ residential address', key: 'recipientDob' },
      { label: 'City / town / suburb', key: 'recipientCity' },
      { label: 'State', key: 'recipientCity' },
      { label: 'Postcode', key: 'recipientCountry' },
      { label: 'Country', key: 'recipientPostalCode' },
      { label: 'Phone', key: 'recipientPhone' },
      { label: 'Email', key: 'recipientEmail' },
      { label: 'Occupation, business or principal activity', key: 'recipientOccupation' },
      { label: 'ABN, ACN or ARBN', key: 'recipientAbn' },
      { label: 'Business structure(if not an individual)', key: 'recipientBusinessStructure' },
      { label: 'Account number', key: 'recipientAccountNo' },
      { label: 'Name of institution(where account is held)', key: 'recipientBankName' },
      { label: 'City', key: 'comCity' },
      { label: 'Country', key: '-' },
      { label: 'Identification number of the retail outlet/ business location', key: 'comCity' },
      { label: 'Full name', key: 'comCity' },
      { label: 'Business/ residential address(not a post box address)', key: 'comAddress' },
      { label: 'City / town / suburb', key: 'comCity' },
      { label: 'state', key: 'comState' },
      { label: 'Postcode', key: 'comPostCode' },
      { label: 'Is this person/ organisation accepting the money or property?', key: 'isPersonAcceptingMoneyProperty' },
      { label: 'Is this person/ organisation sending the transfer instruction?', key: 'isPersonSendingTransferInstruction' },
      { label: 'Person organisation Full name', key: 'personOrgFullName' },
      { label: 'Business/ residential address', key: 'personOrgName' },
      { label: 'City / town / suburb', key: 'personOrgCity' },
      { label: 'State', key: 'personOrgState' },
      { label: 'Postcode', key: 'personOrgPostCode' },
      { label: 'personOrgKnowByAnyOtherName', key: 'personOrgKnowByAnyOtherName' },
      { label: 'Dob', key: 'personOrgDob' },
      { label: 'Postal address', key: 'personOrgAddress' },
      { label: 'person Org Sending Tran Instruction FullName', key: 'personOrgFullName' },
      { label: 'If known by any other name', key: 'personOrgSendingTranInstructionName' },
      { label: 'Dob', key: 'personOrgSendingTranInstructionDob' },
      { label: 'City / town / suburb', key: 'personOrgSendingTranInstructionCity' },
      { label: 'State', key: 'personOrgSendingTranInstructionState' },
      { label: 'Postcode', key: 'personOrgSendingTranInstructionPostCode' },
      { label: 'personOrgKnowByAnyOtherName', key: 'personOrgSendingTranInstructionKnowByAnyOtherName' },
      { label: 'Postal address', key: 'personOrgSendingTranInstructionAddress' },
      { label: 'Phone', key: 'personOrgSendingTranInstructionPhone' },
      { label: 'Email', key: 'personOrgSendingTranInstructionEmail' },
      { label: 'Occupation, business or principal activity', key: 'personOrgSendingTranInstructionOccupation' },
      { label: 'ABN, ACN or ARBN', key: 'personOrgSendingTranInstructionAbn' },
      { label: 'Business structure(if not an individual)', key: 'personOrgSendingTranInstructionBusinessStructure' },
      { label: 'partnerBankName', key: 'partnerBankName' },
      { label: 'partnerBankAddress', key: 'partnerBankAddress' },
      { label: 'partnerBankCity', key: 'partnerBankCity' },
      { label: 'partnerBankState', key: 'partnerBankState' },
      { label: 'partnerBankPostalCode', key: 'partnerBankPostalCode' },
      { label: 'partnerBankCountry', key: 'partnerBankCountry' },
      { label: 'partnerBankIsPersonOrgDisMoney', key: 'partnerBankIsPersonOrgDisMoney' },
      { label: 'isSperateRetail', key: 'isSperateRetail' },
      { label: 'person Org Dis Mone yOr Property Name', key: 'personOrgDisMoneyOrPropertyName' },
      { label: 'Business/ residential address', key: 'personOrgDisMoneyOrPropertyAddress' },
      { label: 'City / town / suburb', key: 'personOrgDisMoneyOrPropertyCity' },
      { label: 'state', key: 'personOrgDisMoneyOrPropertyState' },
      { label: 'Postcode', key: 'personOrgDisMoneyOrPropertyPostalCode' },
      { label: 'Country', key: 'personOrgDisMoneyOrPropertyPostalCountry' },
      { label: 'retailName', key: 'retailName' },
      { label: 'retailAddress', key: 'retailAddress' },
      { label: 'retailCity', key: 'retailCity' },
      { label: 'retailState', key: 'retailState' },
      { label: 'retailPostCode', key: 'retailPostCode' },
      { label: 'retailCountry', key: 'retailCountry' },
      { label: 'Reason for the transfer', key: 'transferReason' },
      { label: 'adminFullName', key: 'adminFullName' },
      { label: 'adminPhone', key: 'adminPhone' },
      { label: 'adminEmail', key: 'adminEmail' },
    ]
    setDownloadHeaders(ausTracReportsHeading);
    const id = localStorage.getItem("Id");
    const startDates = startDate || firstDayOfYear;
    const endDates = endDate || today;
    setloadervalue(true);
    await axios.get(CommonConstants.NEW_BASE_URL2 + `/getaustracreport?startDate=${startDates}&endDate=${endDates}`)
      .then((response) => {
        if (response.data.status === true) {
          const dataWithSN = response.data.data.map((item, index) => {
            return {
              ...item,
              sn: index + 1,
              isPersonAcceptingMoneyProperty: item.isPersonAcceptingMoneyProperty ? 'yes' : 'No',
              isPersonSendingTransferInstruction: item.isPersonSendingTransferInstruction ? "yes" : "No"
            }; // Add the 'sn' property with the index + 1 as the value
          });
          setDownloadData(dataWithSN);
          // downloadCSVFileAus(dataWithSN, ausTracReportsHeading, 'aus_report.csv', ",", "\n");
          downloadCSVFile(dataWithSN, ausTracReportsHeading, 'aus_report.csv', startDates, endDates);
          setloadervalue(false);
        }
      })
      .catch(err => console.log(err))
  }

  const getBlacklistReport = async () => {
    const BlacklistHeaders = [
      { label: 'SN', key: 'sn' }, // Add the 'sn' key for the Serial Number
      { label: 'User', key: "userName" },
      { label: 'RecipientPhone', key: "userPhone" },
      { label: 'Email', key: "userEmail" },
      { label: 'Recipient', key: "recipientName" },
      { label: 'Bank Account No', key: "bankAccNo" },
      { label: 'Bank name', key: "bankName" },
      { label: 'Receiving country', key: "recipientCountry" },
      { label: 'Recipient Mobile', key: "recipientPhone" },
      { label: 'Blacklisted Date', key: "recipientBlacklistDate" },
      { label: 'Blacklisted By', key: "recipientBlacklistByName" }
    ];

    setDownloadHeaders(BlacklistHeaders);

    const startDates = startDate || firstDayOfYear;
    const endDates = endDate || today;

    const payload = {
      "startDate": startDates,
      "endDate": endDates
    };
    setloadervalue(true);
    await axios.post(CommonConstants.NEW_BASE_URL2 + '/getblacklistedusers', payload)
      .then((response) => {
        const dataWithSN = response.data.data.map((item, index) => {
          return { ...item, sn: index + 1 }; // Add the 'sn' property with the index + 1 as the value
        });
        setDownloadData(dataWithSN);
        downloadCSVFile(dataWithSN, BlacklistHeaders, 'blacklist_report.csv', startDates, endDates);
        setloadervalue(false);
      })
      .catch(err => console.log(err))
  };
  const getSmrReports = async () => {
    const headers = [
      // { label: 'SN', key: 'sn' }, // Add the 'sn' key for the Serial Number
      { label: 'Fraud Transaction', key: 'type' },
      { label: 'SMR Date', key: 'createdAt' },
      { label: 'Reason for SMR', key: 'reason' },
      { label: 'Reported Date ', key: 'reportedDate' },
      { label: 'Reported By', key: 'userBlacklistDate' },
      { label: 'Transaction Status ', key: 'recipientCountry' },
      { label: 'Is Service provided', key: 'isServiceProvided' },
    ];
    setDownloadHeaders(headers);

    const startDates = startDate || firstDayOfYear;
    const endDates = endDate || today;

    const payload = {
      "startDate": startDates,
      "endDate": endDates
    };
    setloadervalue(true);
    await axios.post(CommonConstants.NEW_BASE_URL2 + '/getsmrreports', payload)
      .then((response) => {
        if (response.data.status === true) {
          const dataWithSN = response.data.data.map((item, index) => {
            return {
              ...item,
              sn: index + 1,
              createdAt: moment(item.createdAt).format(' DD MMM YYYY h:mm A'),
              isServiceProvided: item.isServiceProvided ? 'yes' : 'No'
            }; // Add the 'sn' property with the index + 1 as the value
          });
          setDownloadData(dataWithSN);
          downloadCSVFile(dataWithSN, headers, 'smr_report.csv', startDates, endDates);
        }
      })
      .catch(error => console.log(error));
  };
  const getocddreports = async () => {
    const headers = [
      { label: 'SN', key: 'sn' },
      { label: 'Name of User', key: 'userName' },
      { label: 'KYC Status', key: 'verified' },
      { label: 'KYC Verification Method', key: 'verificationMethod' },
      { label: 'Date of Verification', key: 'dateOfVerification' },
      { label: 'Verified By', key: 'verifiedBy' },
      { label: 'PEPs Checks?', key: 'pepCheck' },
      { label: 'DVS', key: 'dvs' },
      { label: 'AML CTF checks?', key: 'amlCtf' },
      { label: 'Clients Risk Level', key: 'riskLevel' },
      { label: 'Required ECDD?', key: 'ecdd' },
      { label: 'ECDD Note', key: 'ecddNote' },
      { label: 'No of Transaction', key: 'totalNoTransactions' },
      { label: 'No of active receiver', key: 'noOfReceiver' },
      { label: 'Total amount Sent', key: 'totalAmountSent' },
      { label: 'Account Status', key: 'accountStatus' },
    ];
    setDownloadHeaders(headers);

    const startDates = startDate || firstDayOfYear;
    const endDates = endDate || today;

    const payload = {
      "startDate": startDates,
      "endDate": endDates
    };
    setloadervalue(true);
    await axios.post(CommonConstants.NEW_BASE_URL2 + '/getocddreports', payload)
      .then((response) => {
        if (response.data.status === true) {
          const dataWithSN = response.data.data.map((item, index) => {
            // item = JSON.parse(
            //   JSON.stringify(item, (key, value) => (value === null || value === "") ? "-" : value)
            // );
            return {
              ...item,
              sn: index + 1,
              verified: item.verified ? 'Verified' : 'Unverified',
              pepCheck: item.pepCheck ? 'Yes' : 'No',
              dvs: item.dvs ? 'Yes' : 'No',
              amlCtf: item.amlCtf ? 'Yes' : 'No',
              ecdd: item.ecdd ? 'Yes' : 'No',
              dateOfVerification: item.dateOfVerification ? moment(item.dateOfVerification).format('DD MMM YYYY h:mm A') : "",
            };
          });
          setDownloadData(dataWithSN);
          downloadCSVFile(dataWithSN, headers, 'ocdd_report.csv', startDates, endDates);

        }
      })
      .catch(error => console.log(error));
  };
  const getecddreports = async () => {
    const headers = [
      { label: 'SN', key: 'sn' }, // Add the 'sn' key for the Serial Number
      { label: 'User', key: 'userName' },
      { label: 'Recipient', key: 'recipientName' },
      { label: 'Sending amount', key: 'totalPayable' },
      { label: 'Transaction Date', key: 'transactionDate' },
      { label: 'Reason for ECDD', key: 'ecddReason' },
      { label: 'ECDD Note', key: 'ecddNote' },
      { label: 'Verified By', key: 'verifiedByName' },
      { label: 'Verified date', key: 'verifiedDate' },
      { label: 'Account Status', key: 'accountStatus' },
    ];
    setDownloadHeaders(headers);

    const startDates = startDate || firstDayOfYear;
    const endDates = endDate || today;

    const payload = {
      "startDate": startDates,
      "endDate": endDates
    };
    setloadervalue(true);
    await axios.post(CommonConstants.NEW_BASE_URL2 + '/getecddreports', payload)
      .then((response) => {
        if (response.data.status === true) {
          console.log(response.data.data, "response.data.data");
          const dataWithSN = response.data.data.map((item, index) => {
            return {
              ...item,
              sn: index + 1,
              verifiedDate: item.verifiedDate ? moment(item.verifiedDate).format('DD MMM YYYY h:mm A') : "",
            }; // Add the 'sn' property with the index + 1 as the value
          });
          setDownloadData(dataWithSN);
          downloadCSVFile(dataWithSN, headers, 'ecdd_report.csv', startDates, endDates);
        }
      })
      .catch(error => console.log(error));
  };
  const gettmreports = async () => {
    const headers = [
      { label: 'SN', key: 'sn' }, // Add the 'sn' key for the Serial Number
      { label: 'Date of Transaction', key: 'dateOfTransaction' },
      { label: 'Sender', key: 'senderName' },
      { label: 'Recipient', key: 'receiverName' },
      { label: 'Sending Currency', key: 'sendingCurrencyCode' },
      { label: 'Sending Amount', key: 'amount' },
      { label: 'Receiving Currency', key: 'recevingCurrencyCode' },
      { label: 'Receiving amount', key: 'receivingAmount' },
      { label: 'Risk Level', key: 'riskLevel' },
      { label: 'Reason of High Risk', key: 'riskReason' },
      { label: 'How ECDD was done', key: 'howEcdd' },
      { label: 'ECDD note', key: 'ecdd' },
      { label: 'Is it SMR? ', key: 'ecddNote' },
      { label: 'SMR Note ', key: 'totalNoTransactions' },
      { label: 'Fraud Screening', key: 'isFraudScr' },
      { label: 'AML/CTF Screening ', key: 'isAmlCtfScr' },
      { label: 'PEPs Screening ', key: 'isPepScr' },
      { label: 'Fraud.net status if any', key: 'fraudStatus' },
      { label: 'Additional documents if any', key: 'isAdditionalDocument' },
      { label: 'Reason of Cancellation/Refund', key: 'cancellationReason' },
      { label: 'Approved By', key: 'approvedByName' },
    ];
    setDownloadHeaders(headers);

    const startDates = startDate || firstDayOfYear;
    const endDates = endDate || today;

    const payload = {
      "startDate": startDates,
      "endDate": endDates
    };
    setloadervalue(true);
    await axios.post(CommonConstants.NEW_BASE_URL2 + '/gettmreports', payload)
      .then((response) => {
        if (response.data.status === true) {
          const dataWithSN = response.data.data.map((item, index) => {
            return {
              ...item,
              sn: index + 1,
              dateOfTransaction: item.dateOfTransaction ? moment(item.dateOfTransaction).format('DD MMM YYYY h:mm A') : "",
              isFraudScr: item.isFraudScr ? 'Yes' : 'No',
              isAmlCtfScr: item.isAmlCtfScr ? 'Yes' : 'No',
              isPepScr: item.isPepScr ? 'Yes' : 'No',
              isAdditionalDocument: item.isAdditionalDocument ? 'yes' : 'No'
            };
          });
          setDownloadData(dataWithSN);
          downloadCSVFile(dataWithSN, headers, 'tmr_report.csv', startDates, endDates);
        }
      })
      .catch(error => console.log(error));
  };
  const generateCSVDataVertical = (headers, data) => {
    return headers.map((header, index) => {
      let colorClass = '';
      if (index >= 0 && index <= 2) {
        colorClass = 'blue-row'; // Apply blue color for the first 3 rows
      } else if (index >= 3 && index <= 5) {
        colorClass = 'dark-blue-row'; // Apply dark blue color for the next 3 rows
      } else if (index >= 6 && index <= 9) {
        colorClass = 'gray-row'; // Apply gray color for the next 4 rows
      } else if (index >= 10 && index <= 12) {
        colorClass = 'purple-row'; // Apply purple color for the next 3 rows
      } else if (index >= 13 && index <= 16) {
        colorClass = 'green-row'; // Apply green color for the next 4 rows
      } else if (index >= 17 && index <= 23) {
        colorClass = 'white-row'; // Apply white color for the next 7 rows
      } else if (index >= 24 && index <= 25) {
        colorClass = 'yellow-row'; // Apply yellow color for the next 2 rows
      } else if (index >= 26 && index <= 30) {
        colorClass = 'gray-row'; // Apply gray color for the next 5 rows
      } else {
        colorClass = 'pink-row'; // Apply pink color for the rest of the rows
      }

      return {
        Field: header,
        Value: data[summaryReportKeys[index]],
        ColorClass: colorClass,
      };
    });
  };
  const downloadCompliancesCSVFile = (data, fileName) => {
    setloadervalue(false);
    const csvData = [
      data.map((row) => [row.Field, row.Value].join(',')).join('\n'),
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, fileName);
  };
  const getcompliancesummeryreport = async () => {
    setloadervalue(true);
    await axios
      .get(CommonConstants.NEW_BASE_URL2 + '/getcompliancesummeryreport')
      .then((response) => {
        if (response.data.status === true) {
          setDownloadData(response.data.data[0]);

          const csvDataVertical = generateCSVDataVertical(summeryReportHeading, response.data.data[0]);

          downloadCompliancesCSVFile(csvDataVertical, 'compliance_summary_report.csv');
          setloadervalue(false);
        }
      })
      .catch((error) => console.log(error));
  };

  function downloadCSVFileAus(data, headers, filename, columnDelimiter = ",", lineDelimiter = "\n") {
    const keys = headers.map(header => header.key);

    // Add headers to the CSV content
    let csvContent = headers.map(header => header.label).join(columnDelimiter) + lineDelimiter;

    // Add data rows to the CSV content
    data.forEach(item => {
      const row = keys.map(key => item[key]).join(columnDelimiter);
      csvContent += row + lineDelimiter;
    });

    // Create a Blob containing the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link to the Blob and trigger a download
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const downloadCSVFile = (data, headers, fileName, startDate, endDate) => {
    setloadervalue(false);
    const timePeriodHeader = ['Time Period:', `${startDate} to ${endDate}`].join(' ');
    const csvData = [
      timePeriodHeader,
      headers.map((header) => header.label).join(','),
      ...data.map((item) =>
        headers.map((header) => {
          const value = item[header.key];
          return value !== null && value !== undefined ? value : '-';
        }).join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, fileName);
  };

  const formatDate = (dateString) => {
    // Format the date as needed, e.g., to 'YYYY-MM-DD'
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const today = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  const firstDayOfYear = `${currentYear}-01-01`;

  return (
    <>
      <section className=" statementSec responsiveMainForMobile" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        {loadervalue == true ? <Loader /> : ""}
        <Container fluid className="pb-2 mb-2 rounded-4">
          <div className="headerText d-flex justify-content-between py-4 respoChildFooter">
            <h1 className="purpleText  respTextCenter">Compliance</h1>
          </div>
          <div className="bg-white py-5 px-4 pt-3 rounded-4">
            <div className="filter-section py-4 pt-0 ">
              <div className=" overflow-hidden">
                <Col className="col-lg-12 d-flex ps-0 pe-0 justify-content-end align-items-center respoChildFooter">
                  <div class="WFull mx-2 ps-0 ">
                    &nbsp; &nbsp;
                    <Form.Group
                      as={Col}
                      className=" input-container required pb-0 ps-0 pe-0 "
                    >
                      <Form.Control
                        type="date"
                        required
                        placeholder="From date"
                        name="Referal"
                        className=" reflink link py-2 "
                        onChange={(e) => setStartData(e.target.value)}
                        value={startDate || firstDayOfYear}
                      />
                      <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                        From date
                      </small>
                    </Form.Group>
                  </div>
                  <div class="WFull mx-2 ps-0 ">
                    &nbsp; &nbsp;
                    <Form.Group
                      as={Col}
                      className=" input-container required pb-0 ps-0 pe-0"
                    >
                      <Form.Control
                        type="date"
                        required
                        placeholder="To date"
                        name="Referal"
                        className=" reflink link py-2 "
                        onChange={(e) => setEndDate(e.target.value)}
                        max={today}
                        value={endDate || today}
                      />
                      <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                        To date
                      </small>
                    </Form.Group>
                  </div>
                  <div className="WFull mx-2 ">
                    &nbsp; &nbsp;
                    <div className="dateSec ">
                      <Form.Select
                        aria-label="Default select example"
                        className="d-flex m-auto py-2 pe-5"
                        onChange={(event) => setSelectedDropDownValue(event.target.value)}
                        value={selectedDropDownValue}
                      >
                        <option>Select Report</option>
                        <option>Austrac Report</option>
                        <option>OCDD Report</option>
                        <option>TM Report</option>
                        <option>ECDD Report</option>
                        <option>SMR Report</option>
                        <option>Blacklist Report</option>
                        <option>Compliance Report</option>
                      </Form.Select>
                    </div>
                  </div>

                  {selectedDropDownValue ? (
                    <div className="mx-2  mt-3">
                      <a className="m-0  btn  mt-1 rounded-5 py-2 purpleBackground text-white"
                        onClick={handleDownloadButtonClick}
                      >
                        <i className="fa-solid fa fa-download text-white "></i>&nbsp; Download
                      </a>
                    </div>
                  ) :
                    <div className="mx-2  mt-3">
                      <button className="m-0  btn btn-default mt-1 rounded-5 py-2 purpleBackground text-white" onClick={() => setModalShowAdd(true)}>
                        <i className="fa-solid fa fa-download text-white "></i>&nbsp; Download
                      </button>
                    </div>
                  }
                </Col>

              </div>
            </div>
            <div className="tableContainer">
              <Table className="overflowYscrollResp" id="style-4">
                <thead>
                  <tr>
                    <th className="normal customTh py-4 px-2 border-left">
                      Compliance Rule For
                    </th>
                    <th className="normal customTh py-4 px-2">Compliance Type </th>
                    <th className="normal customTh py-4 px-2">Compliance Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="customTr">
                    <td className="text-center">
                      Registration
                    </td>
                    <td className="text-center">
                      KYC Verification
                    </td>
                    <td className="text-center">
                      Ongoing customer due diligence (OCDD)
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Registration
                    </td>
                    <td className="text-center">
                      KYC Re-verification
                    </td>
                    <td className="text-center">
                      Ongoing customer due diligence (OCDD)
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Registration
                    </td>
                    <td className="text-center">
                      AML/CTF and PEPs Verification (scantak)
                    </td>
                    <td className="text-center">
                      Ongoing customer due diligence (OCDD)
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Registration
                    </td>
                    <td className="text-center">
                      AML/CTF and PEPs Re-verification (scantak)
                    </td>
                    <td className="text-center">
                      Ongoing customer due diligence (OCDD)
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Account
                    </td>
                    <td className="text-center">
                      Fake Account
                    </td>
                    <td className="text-center">
                      Enhanced customer due diligence (ECDD) /  SMR
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Account
                    </td>
                    <td className="text-center">
                      Duplicate Account
                    </td>
                    <td className="text-center">
                      Enhanced customer due diligence (ECDD) /  SMR
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Transaction
                    </td>
                    <td className="text-center">
                      Fraud
                    </td>
                    <td className="text-center">
                      Transaction Monitoring (TM)
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Transaction
                    </td>
                    <td className="text-center">
                      Amount Threshold
                    </td>
                    <td className="text-center">
                      Transaction Monitoring (TM)
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Transaction
                    </td>
                    <td className="text-center">
                      Number of Transaction Threshold
                    </td>
                    <td className="text-center">
                      Transaction Monitoring (TM)
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Transaction
                    </td>
                    <td className="text-center">
                      Number of Active Recipients Threshold
                    </td>
                    <td className="text-center">
                      Transaction Monitoring (TM)
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Transaction
                    </td>
                    <td className="text-center">
                      Fake Transaction
                    </td>
                    <td className="text-center">
                      Transaction Monitoring (TM)
                    </td>
                  </tr>
                  <tr className="customTr">
                    <td className="text-center">
                      Transaction
                    </td>
                    <td className="text-center">
                      Duplicate Transaction
                    </td>
                    <td className="text-center">
                      Transaction Monitoring (TM)
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </section>
      <ModalComponent
        show={modalShowAdd}
        title11={"Please Select Report Type"}
        onHide={() => setModalShowAdd(false)}
      />
    </>
  );
}
