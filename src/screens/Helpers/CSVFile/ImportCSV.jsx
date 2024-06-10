import React, { useState, useEffect, CSSProperties } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./ImportCsv.scss"
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';
import axios from 'axios';
import { CommonConstants } from '../../../Constants/common.constants';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 50,
  } ,
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 150,
    width: 200,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  } ,
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  } ,
  size: {
    // backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  } ,
  name: {
    // backgroundColor: none,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  } ,
  progressBar: {
    bottom: 5,
    position: 'absolute',
    width: '100%',
    height: '10%',
    paddingLeft: 15,
    paddingRight: 15,
  } ,
  zoneHover: {
    borderColor: GREY_DIM,
  } ,
  default: {
    borderColor: GREY,
  } ,
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  } ,
};



function ImportCSV(props) {
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [PaymentMethods, setPaymentMethods] = useState([]);
    const [DeliveryMethods, setDeliveryMethods] = useState([]);
    const [MethodsArray, setMethodsArray] = useState();
    const [removeHoverColor, setRemoveHoverColor] = useState(
      DEFAULT_REMOVE_HOVER_COLOR
    );

    useEffect(()=>{
      GetAllPayments()
      GetAllDelivery()
    },[])

    const GetAllPayments = async (values) => {
      try {
        const response = await axios.get(
          CommonConstants.BASE_URL + "/getallpaymentmethodname"
        );
        if (response.data.status === true) {
          // console.log(response.data.data,"response.datadata")
          var Payment = response.data.data.map((payment) => ({
            id: payment.id,
            name: payment.name,
          }));
          setPaymentMethods(Payment);
        } else if (response.data.status === "error") {
        }
      } catch (err) {
        // console.log(err)
      }
    };

    const GetAllDelivery = async (values) => {
      try {
        const response = await axios.get(
          CommonConstants.BASE_URL + "/getactivedeliverytype"
        );
        if (response.data.status === true) {
          // console.log(response.data.data,"response.datadata")
          var DeliveryMethod = response.data.data.map((Delivery) => ({
            id: Delivery.id,
            name: Delivery.type
          }));
          setDeliveryMethods(DeliveryMethod);
        } else if (response.data.status === "error") {
        }
      } catch (err) {
        // console.log(err)
      }
    };

    // console.log(PaymentMethods,"PaymentMethods")
    // console.log(MethodsArray,"MethodsArray")


    const handleFileLoad =(results)=> {

      // console.log('---------------------------');
      // console.log(results);
      // console.log('---------------------------');
      setZoneHover(false);

      var columns=results.data[0].map((col,index)=>{
        return col
      })

      const Rows = results.data.slice(1).map((row) => {
        return row.reduce((acc, curr, index) => {
          acc[results.data[0][index]] = curr;
          return acc;
        }, {});
      });

      // console.log(columns,"AllData")
      // console.log('-------Create Object------');
      // console.log(Rows);
      // console.log('--------------------------');
      // console.log(Rows,"Rows")

      var CsvData=[];
      // var paymentArray=[];
      // var deliveryArray=[];
      var CsvObjectArray=[];
      setMethodsArray(CsvObjectArray)

      Rows.map((data,index)=>{
        // console.log(data)
        // var filter = Rows.filter(item => item.ExchangeFrom === data.ExchangeFrom && item.ExchangeTo === data.ExchangeTo && item.ValidFrom === data.ValidFrom && item.Minimum === data.Minimum && item.Maximum === data.Maximum && item.Deafult_Service_charge == data.Deafult_Service_charge)
        var filter = Rows.filter(item => item.ExchangeFrom === data.ExchangeFrom && item.ExchangeTo === data.ExchangeTo && item.ValidFrom === data.ValidFrom && item.Minimum === data.Minimum && item.Maximum === data.Maximum )
        // CsvData.push(filter)
        // const lastIndex = filter[filter.length - 1];
        // console.log(lastIndex,"aaaa")
        if (!CsvData.some(item => JSON.stringify(item) === JSON.stringify(filter))) {
          // const lastIndex = filter[filter.length - 1];
          // console.log(lastIndex,"aaaa")
          CsvData.push(filter);
        }


        var paymentArray=[];
        var deliveryArray=[];

        filter.map((item)=>{
          if(item.Method==="Payment"){
            if(item.MethodType==="Debit Card" || item.MethodType==="Credit Card"){
              var methodnameCD=item.MethodType.replace(/\s+/g, "").toLowerCase()
              var paymentMNCD=PaymentMethods.filter(payment => payment.name.replace(/\s+/g, "").toLowerCase() === methodnameCD)
              // console.log(paymentMNCD[0].id,"paymentMN")
              var CsvArrayPaymentCard=`{"typeid":${paymentMNCD[0].id},"type": "${item.MethodType}","range":[ { "lower":${item.LowerBound} ,"upper": ${item.UpperBound} , "fixfees" :${item.FixFees} , "ourfees" :${item.OurFees} ,"charge":${item.Rate},"type":"${item.TypeRate}"}]}`
              // console.log(item.MethodType.replace(/\s+/g, "").toLowerCase(),"CsvArrayPayment")
           
              if (!paymentArray.some(item => item === CsvArrayPaymentCard)) {
                paymentArray.push(CsvArrayPaymentCard);
              }
       
             }else{
              var methodname=item.MethodType.replace(/\s+/g, "").toLowerCase()
              var paymentMN=PaymentMethods.filter(payment => payment.name.replace(/\s+/g, "").toLowerCase() === methodname)
              // console.log(paymentMN[0].id,"paymentMN")

              var CsvArrayPayment=`{"typeid":${paymentMN[0].id},"type": "${item.MethodType}","range":[ { "lower":${parseInt(item.LowerBound)} ,"upper": ${item.UpperBound} ,"charge":${item.Rate},"type":"${item.TypeRate}"}]}`
              //  console.log(item.MethodType.replace(/\s+/g, "").toLowerCase(),"CsvArrayPayment")
               if (!paymentArray.some(item => item === CsvArrayPayment)) {
                paymentArray.push(CsvArrayPayment);
              }
             }
          }
          if(item.Method==="Delivery"){
              var Deliverymethodname=item.MethodType.replace(/\s+/g, "").toLowerCase()
              var DeliverypaymentMN=DeliveryMethods.filter(Delivery => Delivery.name.replace(/\s+/g, "").toLowerCase() === Deliverymethodname)
              // console.log(DeliverypaymentMN,"paymentMND")

               var CsvArrayDelivery=`{"typeid":${DeliverypaymentMN[0]?.id},"type": "${item.MethodType}","range":[ { "lower":${parseInt(item.LowerBound)} ,"upper": ${item.UpperBound} ,"charge":${item.Rate},"type":"${item.TypeRate}"}]}`
              //  console.log(CsvArrayDelivery,"CsvArrayDelivery")
               if (!deliveryArray.some(item => item === CsvArrayDelivery)) {
                deliveryArray.push(CsvArrayDelivery);
              }
          }
          // console.log(item,"item")
        })

      // var CsvObject= CsvData.filter(item => item.ExchangeFrom == filter[0].ExchangeFrom && item.ExchangeTo == filter[0].ExchangeTo && item.ValidFrom == filter[0].ValidFrom && item.Minimum == filter[0].Minimum && item.Maximum == filter[0].Maximum && item.Deafult_Service_charge == filter[0].Deafult_Service_charge)
      var CsvObject= CsvData.filter(item => item.ExchangeFrom == filter[0].ExchangeFrom && item.ExchangeTo == filter[0].ExchangeTo && item.ValidFrom == filter[0].ValidFrom && item.Minimum == filter[0].Minimum && item.Maximum == filter[0].Maximum)
      if(CsvObject.length === 0) {
        var CsvArray={
              fromCountryId: filter[0].ExchageFrom,
              toCountryId: filter[0].ExchageTo,
              serviceCharge: filter[0].Deafult_Service_charge,
              paymentMethodCharges: "["+paymentArray.toString()+"]",
              deliveryMethodCharges: "["+deliveryArray.toString()+"]",
              validFrom: filter[0].ValidFrom,
              minimumTransaction: filter[0].Minimum,
              maximumTransaction: filter[0].Maximum
            }

            if (!CsvObjectArray.some(item => JSON.stringify(item) === JSON.stringify(CsvArray))) {
              CsvObjectArray.push(CsvArray);
            }
            // CsvObjectArray.push(CsvArray)
      } 
        // console.log(filter,"Filtered data")
        // console.log(CsvObjectArray,"CsvObjectArray")
        // console.log(paymentArray,"paymentArray")
        // console.log(deliveryArray,"deliveryArray")
      })
      
      // console.log(CsvData,"CsvData")
      // console.log(CsvObjectArray,"CsvObjectArray")
    }

    const UploadCSV = async(e) =>{
      
      try {

        var csvdata=MethodsArray;

        // console.log(csvdata,"csvdata")
        const response = await axios.post(
          CommonConstants.BASE_URL + "/importservicecharges",csvdata
        );
        if (response.data.status === true) {
          // console.log(response.data.data)
          props.SavePr()
          
        } else{
          console.log(response.data.data)
        }
      } catch (err) {
        // console.log(err)
      }
    }

  return (
    <div>
    <Modal className='rounded'
    //   {...props}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className='d-flex flex-column py-4'>
        {/* <i className="fa fa-check-circle fa-5x success-icon mb-4" color="green" ></i>
        <p className='text-center fs-6 mb-0'>SUCCESS</p> */}
        <p className='text-center fs-2 mb-0'>Import CSV File</p>

      </div>
      <Modal.Body className=' d-flex justify-content-center'>
        <p className='text-center w-75'>
        <CSVReader
        onUploadAccepted={handleFileLoad}
      // onUploadAccepted={(results) => {
      //   console.log('---------------------------');
      //   console.log(results);
      //   console.log('---------------------------');
      //   setZoneHover(false);
      // }}
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }) => (
        <>
          <div
            {...getRootProps()}
            style={Object.assign(
              {},
              styles.zone,
              zoneHover && styles.zoneHover
            )}
          >
            {acceptedFile ? (
              <>
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size} className='spantagCSVSize'>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <div className='line'></div>
                    <span style={styles.name} className='spantagCSV'>{acceptedFile.name}</span>
                  </div>
                  
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(e) => {
                      e.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(e) => {
                      e.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                </div>
              </>
            ) : (
              'Drop CSV file here or click to upload'
            )}
            
          </div>
        </>
      )}
    </CSVReader>
        </p>
      </Modal.Body>
      <div className='justify-content-center d-flex'>
      <div className='w-75 d-flex justify-content-around'>
        <button className='w-auto px-3 success-btn border-0 rounded btn-dark text-light' onClick={(e)=> UploadCSV(e)}>Upload</button>
        <button className='w-auto px-3 success-btn border-0 rounded btn-danger text-light' onClick={props.cancle}>Cancel</button>
      </div>
      </div>
    </Modal></div>
  )
}

export default ImportCSV;