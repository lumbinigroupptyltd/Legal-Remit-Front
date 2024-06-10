import React, { useEffect, useState } from "react";

import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import ModalComponent from "./ModalComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CommonConstants } from "../../Constants/common.constants";
// import { type } from "jquery";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

export default function CreateServiceCharge(props) {
  const [key, setKey] = useState("pay1");
  // const [key1, setKey1] = useState("payinner1");
  // const [key2, setKey2] = useState("payinners1");
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [paymentTab, setPaymentTab] = useState([]);
  const [deliveryTab, setDeliveryTab] = useState([]);
  const [activeTabDelivery, setActiveDeliveryTab] = useState(0);
  const [activeTabPayment, setActivePaymentTab] = useState(0);
  const [formData, setFormData] = useState([
    {
      lowerbound: 0,
      upperbound: 0,
      charge: 0,
    },
  ]);
  const [id, setid] = useState(props.location.state);
  const [countries, setcountries] = useState([]);
  const [ShowHide, SetShowHide] = useState(null);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [serviceCharge, setserviceCharge] = useState(0);
  const [minTransaction, setminTransaction] = useState(0);
  const [maxTransaction, setmaxTransaction] = useState(0);
  const [lowerPayment, setlowerPayment] = useState(0);
  const [upperPayment, setupperPayment] = useState(0);
  const [chargePayment, setchargePayment] = useState(0);
  const [lowerDelivery, setlowerDelivery] = useState(0);
  const [upperDelivery, setupperDelivery] = useState(0);
  const [chargeDelivery, setchargeDelivery] = useState(0);
  const [exchangeFromIDs, setexchangeFromIDss] = useState(14);
  const [exchangeToID, setexchangeToID] = useState(154);
  const [exchangeFromCurrency, setexchangeFromCurrency] = useState("AUD");
  const [exchangeToCurrency, setexchangeToCurrency] = useState("NPR");
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const [validFrom, setvalidFrom] = useState(date);
  const [deliveryMethod, setDeliveryMethod] = useState([]);
  const [deliveryMethodArray, setdeliveryMethodArray] = useState([]);
  const [paymentMethod, setpaymentMethod] = useState([]);
  const [paymentMethodArray, setpaymentMethodArray] = useState([]);
  const [paymentLablename, setpaymentLablename] = useState("");
  const [paymentLableId, setpaymentLableId] = useState("");
  const [DeliveryLablename, setDeliveryLablename] = useState("");
  const [DeliveryLableId, setDeliveryLableId] = useState("");
  const [EditpaymentLablename, setEditpaymentLablename] = useState("");
  const [EditpaymentLableId, setEditpaymentLableId] = useState("");
  const [EditDeliveryLablename, setEditDeliveryLablename] = useState("");
  const [EditDeliveryLableId, setEditDeliveryLableId] = useState("");
  const [Lowerboundval, setLowerboundval] = useState(0);
  const [Upperboundval, setUpperboundval] = useState(0);
  const [UpperboundvalDelivery, setUpperboundvalDelivery] = useState(0);
  const [EditUpperboundval, setEditUpperboundval] = useState(0);
  const [EditUpperboundvalDelivery, setEditUpperboundvalDelivery] = useState('0');
  const [paymentLablenamewithdata, setpaymentLablenamewithdata] = useState({});
  const [paymentdata, setpaymentdata] = useState([]);
  const [Deliverydata, setDeliverydata] = useState([]);
  const [ErrorUP, setErrorUP] = useState("");
  const [ActiveTabPayment, setActiveTabPayment] = useState([]);
  const [value, setValue] = useState(validFrom);
  const navigate = useNavigate();
  const [PaymentUpperLastSet, setPaymentUpperLastSet] = useState("0");
  const [DeliveryUpperLastSet, setDeliveryUpperLastSet] = useState("0");
  const [PaymentIndex, setPaymentIndex] = useState(1);

  useEffect(() => {
    SetShowHide(props.location.state);
    getAllCountries();
    getallactivepaymentmethods();
    getallactivedeliverymethods();
    populateDataFromServiceCharge();
  }, []);

  const getAllCountries = () => {
    axios
      .get(`${CommonConstants.BASE_URL}/getallcountries`)
      .then((res) => {
        setcountries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    const formattedValue = e.target.value
      .replace(/\D/g, "") // Remove non-digit characters
      .slice(0, 8); // Limit input to 8 characters

    let formatted = "";
    if (formattedValue.length > 4) {
      formatted += formattedValue.slice(0, 4) + "-";
      if (formattedValue.length > 6) {
        formatted += formattedValue.slice(4, 6) + "-";
        formatted += formattedValue.slice(6);
      } else {
        formatted += formattedValue.slice(4);
      }
    } else {
      formatted = formattedValue;
    }

    setValue(formatted);
  };

  const getallactivepaymentmethods = async () => {
    try {
      const payload = {
        // countryId: exchangeFromIDs

        pageindex: 1,
        pagesize: 5,
        searchdata: "%%",
        sortparam: "created_at",
        sortorder: "ASC",
      };
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallpaymentmethodname " //"/getallactivepaymentmethods"
        // , payload
      );
      if (response.data.status === true) {
        setpaymentLablename(response.data.data[0].name);
        setpaymentLableId(response.data.data[0].id);
        setEditpaymentLablename(response.data.data[0].name);
        setEditpaymentLableId(response.data.data[0].id);
        const activeTabForPayment = response.data.data.map((paymentTab) => ({
          value: paymentTab.id,
          label: paymentTab.name,
        }));
        setPaymentTab(activeTabForPayment);
        const filtered = paymentTab.filter(
          (input, index) => Number(activeTabForPayment) === PaymentIndex
        );

        const FindArrayBlank = [];

        inputFields.map((input, index) => {
          if (filtered[0].value === input.typeid) {
            FindArrayBlank.push(input);
          }
        });

        var tempPaymentandUpper = [];
        var tempArray = [];

        activeTabForPayment.map((item,index) => {
          tempArray.push({
            ArrayofIndex:index,
            ArrayPayment:1,
            LowerBound: '0',
            UpperBound: '0',
            FixFees: '0',
            OurFees: '0',
            charge: '0',
            TypeRate: "amount",
            type: item.label,
            typeid: item.value,
          });
          tempPaymentandUpper.push({ name: item.label, Uppervalue: "0" });
        });
        setInputFields(tempArray);

      }
    } catch (err) {
      console.log(err);
    }
  };

  const getallactivedeliverymethods = async () => {
    try {
      const payload = {
        countryId: exchangeFromIDs,
      };
      // const response = await axios.post(
      //   CommonConstants.BASE_URL + "/getactivedeliverytype",// payload
      // );
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getactivedeliverytype "
        // , payload
      );
      if (response.data.status === true) {
        setDeliveryLablename(response.data.data[0].type);
        setDeliveryLableId(response.data.data[0].id);
        setEditDeliveryLablename(response.data.data[0].type);
        setEditDeliveryLableId(response.data.data[0].id);
        const activeTabForDelivery = response.data.data.map((deliveryTab) => ({
          id: deliveryTab.id,
          labelDelivery: deliveryTab.type,
        }));
        
        setDeliveryTab(activeTabForDelivery);

        var tempArray = [];
        activeTabForDelivery.map((items,index) => {
          tempArray.push({
            ArrayofIndex:index,
            ArrayPayment:1,
            LowerBound: '0',
            UpperBound: '0',
            FixFees: '0',
            OurFees: '0',
            charge: '0',
            TypeRate: "amount",
            type: items.labelDelivery,
            typeid: items.id,
          });
        });
        setInputFieldsDelivery(tempArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const populateDataFromServiceCharge = async () => {
    var activeTabForDelivery;
    const payload1 = {
      countryId: exchangeFromIDs,
    };
    const response1 = await axios.post(
      CommonConstants.BASE_URL + "/getallactivedeliverymethods",
      payload1
    );
    if (response1.data.status === true) {
      activeTabForDelivery = response1.data.data.map((deliveryTab) => ({
        id: deliveryTab.id,
        labelDelivery: deliveryTab.deliveryTypeName,
      }));
    }

    var activeTabForPayment;
    const payload2 = {
      countryId: exchangeFromIDs,
    };
    const response2 = await axios.post(
      CommonConstants.BASE_URL + "/getpaymentmethods",
      payload2
    );
    if (response2.data.status === true) {
      activeTabForPayment = response2.data.data.map((paymentTab) => ({
        value: paymentTab.id,
        label: paymentTab.name,
      }));
    }

    if (!ShowHide === true) {
      const payloadPost = {
        id: id,
      };
      await axios
        .post(`${CommonConstants.BASE_URL}/getservicechargebyid`, payloadPost)
        .then((res) => {
          setexchangeFromCurrency(res.data.data.fromCurrencyCode);
          setexchangeToCurrency(res.data.data.toCurrencyCode);
          setValue(moment(res.data.data.validFrom).format("YYYY-MM-DD"));
          setserviceCharge(res.data.data.serviceCharge);
          setminTransaction(res.data.data.minimumTransaction);
          setmaxTransaction(res.data.data.maximumTransaction);
          setDeliveryMethod(JSON.parse(res.data.data.deliveryMethodCharges));
          setpaymentMethod(JSON.parse(res.data.data.paymentMethodCharges));
          setexchangeFromIDss(res.data.data.fromCountryId)
          setexchangeToID(res.data.data.toCountryId)
          let tempArray = JSON.parse(res.data.data.paymentMethodCharges);
          let currentIndex = 0;
          let currentIndex2 = 0;
          var EdittempArray = [];
          var EdittempIndex = 0;
          
          const transformedArray = tempArray.flatMap((item,index) => 
            item.range.map((range,ind) => ({
              ArrayofIndex:currentIndex++,
              typeid: item.typeid,
              type: item.type,
              LowerBound: `${range.lower}`,
              UpperBound: `${range.upper}`,
              FixFees: `${range.fixfees}`,
              OurFees: `${range.ourfees}`,
              charge: `${range.charge}`,
              TypeRate: `${range.type}`,
            }))
          );

          // const deliveryMethod = 'Bank Transfer';

          // // Filter the array based on the delivery method
          // const filteredArray = transformedArray.filter(item => item.type === deliveryMethod);

          // // Increment the ArrayPayment property for the filtered data
          // const updatedData = filteredArray.map(item => {
          //   EdittempIndex = EdittempIndex+1
          //   (
          //   {
          //   ...item,
          //   ArrayPayment: EdittempIndex + 1,
          // })});

          // EdittempArray.push(updatedData)

          const groupedByType = transformedArray.reduce((acc, payment) => {
            const type = payment.type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(payment);
            return acc;
        }, []);
        
        var ArrayPayment = {};

        // Grouping array items based on the "type" property
        // debugger
        var FinalObj = []
        Object.keys(groupedByType).forEach((item) => {
          // debugger
            if (!ArrayPayment[item.type]) {
                ArrayPayment[item.type] = [];
            }

            groupedByType[item].forEach((Item,index) => {
              Item.ArrayPayment = index+1;
              FinalObj.push(Item)
          });            
        });

        EditsetInputFields(FinalObj);

          let tempArrayDelivery = JSON.parse(
            res.data.data.deliveryMethodCharges
          );

          const transformedArray2 = tempArrayDelivery.flatMap((item,index) => 
            item.range.map((range,ind) => ({
              ArrayofIndex:currentIndex2++,
              ArrayPayment:1,
              typeid: item.typeid,
              type: item.type,
              LowerBound: `${range.lower}`,
              UpperBound: `${range.upper}`,
              charge: `${range.charge}`,
              TypeRate: `${range.type}`,
            }))
          );

          const groupedByType2 = transformedArray2.reduce((acc, payment) => {
            const type = payment.type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(payment);
            return acc;
        }, []);
        
        var ArrayPayment2 = {};

        // Grouping array items based on the "type" property
        // debugger
        var FinalObj2 = []
        Object.keys(groupedByType2).forEach((item) => {
          // debugger
            if (!ArrayPayment2[item.type]) {
                ArrayPayment2[item.type] = [];
            }

            groupedByType2[item].forEach((Item,index) => {
              Item.ArrayPayment2 = index+1;
              FinalObj2.push(Item)
          });            
        });

          setEditInputFieldsDelivery(FinalObj2);

          // var EdittempArray2 = [];
          // tempArrayDelivery.map((item, index) => {
          //   EdittempArray2.push({
          //     ArrayofIndex:index,
          //     LowerBound: `${item.range[0].lower}`,
          //     UpperBound: `${item.range[0].upper}`,
          //     charge: `${item.range[0].charge}`,
          //     TypeRate: `${item.range[0].type}`,
          //     type: item.type,
          //     typeid: item.typeid,
          //   });
          // });
          // setEditInputFieldsDelivery(EdittempArray2);

          // var ddd = JSON.parse(res.data.data.deliveryMethodCharges);

          var indexData1;
          var indexData2;

          // var idata1 = activeTabForDelivery.map((e, i) => {
          //   if (
          //     e.labelDelivery ==
          //     JSON.parse(res.data.data.deliveryMethodCharges)[0].type
          //   ) {
          //     indexData1 = i;
          //   }
          // });
          // var idata2 = activeTabForPayment.map((e, i) => {
          //   if (
          //     e.label == JSON.parse(res.data.data.paymentMethodCharges)[0].type
          //   ) {
          //     indexData2 = i;
          //   }
          // });

          setActiveDeliveryTab(indexData1);
          setActivePaymentTab(indexData2);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  ///////Add Service Charge Api//////

  const addData = async (e) => {
    // debugger
    let Deliverydataget = submitDelivery(e);
    let paymentdataget = submit(e);
    var LegalAdd = inputFields.filter((input,i)=> input.UpperBound === '0' )
    var LegalAdd1 = inputFieldsDelivery.filter((input,i)=> input.UpperBound === '0' )
    if(LegalAdd.length == 0 && LegalAdd1.length == 0){
      var LegalAddUpperGrater = inputFields.filter((input,i)=> Number(input.LowerBound) > Number(input.UpperBound))
      var LegalAddUpperGrater1 = inputFieldsDelivery.filter((input,i)=> Number(input.LowerBound) > Number(input.UpperBound))
      if(LegalAddUpperGrater.length == 0 && LegalAddUpperGrater1.length == 0) {

      var temArray1 = [];
      var temArray2 = [];

      for (let i = 0; i < deliveryMethodArray.length; i++) {
        const obj = JSON.parse(deliveryMethodArray[i]);
        temArray1.push(obj.type);
      }
  
      const filteredDeliveryTab = deliveryTab.filter(
        (value) => !temArray1.includes(value.labelDelivery)
      );

      filteredDeliveryTab.map((ite) => {
        var deliveryMethodCharges = `{"type": "${ite?.labelDelivery}","range":[ { "lower":0 ,"upper": 0 ,"charge":0,"type":"amount"}]}`;
        deliveryMethodArray.push(deliveryMethodCharges);
      });
  
      for (let i = 0; i < paymentMethodArray.length; i++) {
        const obj = JSON.parse(paymentMethodArray[i]);
        temArray2.push(obj.type);
      }
  
      const filteredPaymentTab = paymentTab.filter(
        (value) => !temArray2.includes(value.label)
      );

      filteredPaymentTab.map((ite) => {
        var paymentMethodCharges = `{"type": "${ite?.label}","range":[ { "lower":0 ,"upper": 0 ,"charge":0,"type":"amount"}]}`;
        paymentMethodArray.push(paymentMethodCharges);
      });
  
      const updatedArrayDelivery = [deliveryMethodArray];
      const updatedArrayPayment = [paymentMethodArray];

      const groupedData = {};

      const jsonObject = Deliverydataget.map(jsonString => JSON.parse(jsonString));

      // Iterate through the array and group by type and typeid
      jsonObject.forEach(item => {
        const key = `${item.type}_${item.typeid}`;
        if (!groupedData[key]) {
          groupedData[key] = { ...item, range: [] };
        }
        groupedData[key].range = groupedData[key].range.concat(item.range);
      });
      
      // Convert the groupedData object back to an array
      const result = Object.values(groupedData);

      const DeliveryArrayObject = result.map(item => {
        return JSON.stringify(item);
    });
    const groupedData2 = {};
    const jsonObject2 = paymentdataget.map(jsonString => JSON?.parse(jsonString));
    
      // Iterate through the array and group by type and typeid
      jsonObject2.forEach(item => {
        const key = `${item.type}_${item.typeid}`;
        if (!groupedData2[key]) {
          groupedData2[key] = { ...item, range: [] };
        }
        groupedData2[key].range = groupedData2[key].range.concat(item.range);
      });
      
      // Convert the groupedData object back to an array
      const result2 = Object.values(groupedData2);

      const PaymentArrayObject = result2.map(item => {
        return JSON.stringify(item);
    });
      
      
      var ddd = DeliveryArrayObject.map((str) => str.replace(/\\/g, ""));
      var ddd1 = PaymentArrayObject.map((str) => str.replace(/\\/g, ""));
      const validFromDateFormat = moment(validFrom).format("YYYY-MM-DD");
      const payload = {
        fromCountryId: exchangeFromIDs,
        toCountryId: exchangeToID,
        fromCurrencyCode: exchangeFromCurrency,
        toCurrencyCode: exchangeToCurrency,
        serviceCharge: serviceCharge,
        paymentMethodCharges: "[" + ddd1.toString() + "]",
        deliveryMethodCharges: "[" + ddd.toString() + "]",
        validFrom: validFromDateFormat,
        minimumTransaction: minTransaction,
        maximumTransaction: maxTransaction,
      };
      
      await axios
        .post(`${CommonConstants.BASE_URL}/addservicecharges`, payload)
        .then((res) => {
          if (res.data.statuscode == 200) {
            setModalShowAdd(true);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      }else{
        setLowergaterUpper(true)
      }
    }else{
      setinputErrorUpperBound(true)
    }
  };

  ///////////////////////////////////

  ///////Edit Service Charge Api//////

  const editData = async (e) => {
    const UpdatetPaymentMethos = Editpaymentsubmit(e);
    const UpdatetDeliveryMethos = submitEditDelivery(e);

    var LegalAdd = EditinputFields.filter((input,i)=> input.UpperBound === '0' )
    var LegalAdd1 = EditinputFieldsDelivery.filter((input,i)=> input.UpperBound === '0' )
    if(LegalAdd.length == 0 && LegalAdd1.length == 0){

    var LegalAddUpperGrater = EditinputFields.filter((input,i)=>  Number(input.LowerBound) >  Number(input.UpperBound))
    var LegalAddUpperGrater1 = EditinputFieldsDelivery.filter((input,i)=>  Number(input.LowerBound) >  Number(input.UpperBound))
    if(LegalAddUpperGrater.length == 0 && LegalAddUpperGrater1.length == 0) {

    var temEditArray1 = [];
    var temEditArray2 = [];

    for (let i = 0; i < deliveryMethodArray.length; i++) {
      const obj = JSON.parse(deliveryMethodArray[i]);
      temEditArray1.push(obj.type);
    }

    const filteredDeliveryTab = deliveryMethod.filter(
      (value) => !temEditArray1.includes(value.type)
    );

    filteredDeliveryTab.map((ite) => {
      var deliveryMethodCharges = `{"type": "${ite?.type}","range":[ { "lower":${parseFloat(ite.range[0].lower)} ,"upper": ${parseFloat(ite.range[0].upper)} ,"charge":${parseFloat(ite.range[0].charge)},"type":"percentage"}]}`;
      deliveryMethodArray.push(deliveryMethodCharges);
    });

    for (let i = 0; i < paymentMethodArray.length; i++) {
      const obj = JSON.parse(paymentMethodArray[i]);
      temEditArray2.push(obj.type);
    }

    const filteredPaymentTab = paymentMethod.filter(
      (value) => !temEditArray2.includes(value.type)
    );

    filteredPaymentTab.map((ite) => {
      var paymentMethodCharges = `{"type": "${ite?.type}","range":[ { "lower":${parseFloat(ite.range[0].lower)} ,"upper": ${parseFloat(ite.range[0].upper)} ,"charge":${parseFloat(ite.range[0].charge)},"type":"percentage"}]}`;
      paymentMethodArray.push(paymentMethodCharges);
    });

    const groupedData = {};

      const jsonObject = UpdatetDeliveryMethos.map(jsonString => JSON.parse(jsonString));

      // Iterate through the array and group by type and typeid
      jsonObject.forEach(item => {
        const key = `${item.type}_${item.typeid}`;
        if (!groupedData[key]) {
          groupedData[key] = { ...item, range: [] };
        }
        groupedData[key].range = groupedData[key].range.concat(item.range);
      });
      
      // Convert the groupedData object back to an array
      const result = Object.values(groupedData);

      const DeliveryArrayObject = result.map(item => {
        return JSON.stringify(item);
    });

      const groupedData2 = {};
      const jsonObject2 = UpdatetPaymentMethos.map(jsonString => JSON.parse(jsonString));

      // Iterate through the array and group by type and typeid
      jsonObject2.forEach(item => {
        const key = `${item.type}_${item.typeid}`;
        if (!groupedData2[key]) {
          groupedData2[key] = { ...item, range: [] };
        }
        groupedData2[key].range = groupedData2[key].range.concat(item.range);
      });
      
      // Convert the groupedData object back to an array
      const result2 = Object.values(groupedData2);

      const PaymentArrayObject = result2.map(item => {
        return JSON.stringify(item);
    });

    var updatedPaymentArray = PaymentArrayObject.map((str) =>
      str.replace(/\\/g, "")
    );
    var updatedDeliveryArray = DeliveryArrayObject.map((str) =>
      str.replace(/\\/g, "")
    );

    const payload = {
      id: id,
      fromCountryId: exchangeFromIDs,
      toCountryId: exchangeToID,
      fromCurrencyCode: exchangeFromCurrency,
      toCurrencyCode: exchangeToCurrency,
      serviceCharge: serviceCharge,
      paymentMethodCharges: `[${updatedPaymentArray}]`,
      deliveryMethodCharges: `[${updatedDeliveryArray}]`,
      validFrom: moment(validFrom).format("YYYY-MM-DD"),
      minimumTransaction: minTransaction,
      maximumTransaction: maxTransaction,
    };
    await axios
      .post(`${CommonConstants.BASE_URL}/updateservicecharge`, payload)
      .then((res) => {
        if (res.data.statuscode == 200) {
          setModalShowEdit(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
    }else{
      setLowergaterUpper(true)
    }
  }else{
    setinputErrorUpperBound(true)
  }
  };

  ////////////////////////////////////

  const HandleChangeFromCountry = (e) => {
    setexchangeFromCurrency(e.target.value);
    const datafrom = countries.filter(
      (value) => value.currency === e.target.value
    );
    setexchangeFromIDss(datafrom[0].id);
  };

  const HandleChangeToCountry = (e) => {
    setexchangeToCurrency(e.target.value);
    const dataTo = countries.filter(
      (value) => value.currency === e.target.value
    );
    setexchangeToID(dataTo[0].id);
  };

  const redirectToServicePage = () => {
    navigate("/service-charge");
  };

  const onHandleSelectDelivery = (tabIndex) => {
    // setinputErrorUpperBound(false)
    setActiveDeliveryTab(tabIndex);
    setlowerDelivery(0);
    setupperDelivery(0);
    setchargeDelivery(0);
    setDeliveryLablename(deliveryTab[tabIndex].labelDelivery);
    setDeliveryLableId(deliveryTab[tabIndex].id);
    const filtered = deliveryTab.filter(
      (input, index) => Number(tabIndex) === index
    );
    setActiveTabPayment(filtered);

    const DeliveryFindArray = [];

    inputFieldsDelivery.map((input, index) => {
      if (filtered[0]?.id === input.typeid) {
        DeliveryFindArray.push(input);
      }
    });

    const LastUpper = DeliveryFindArray[DeliveryFindArray?.length - 1];
    const LastUpperBound = LastUpper?.UpperBound == undefined ? "" : LastUpper?.UpperBound ;
    setDeliveryUpperLastSet(LastUpperBound);
  };

  const onHandleSelectPayment = (tabIndex,event) => {
    // 
    setActivePaymentTab(tabIndex);
    setlowerPayment(0);
    setupperPayment(0);
    setchargePayment(0);
    setpaymentLablename(paymentTab[tabIndex].label);
    setpaymentLableId(paymentTab[tabIndex].value);

    const filtered = paymentTab.filter(
      (input, index) => Number(tabIndex) === index
    );
    setActiveTabPayment(filtered);

    const FindArray = [];
    inputFields.map((input, index) => {
      if (filtered[0]?.value === input.typeid) {
        FindArray.push(input);
      }
    });

    const LastUpper = FindArray[FindArray?.length - 1];
    const LastUpperBound = LastUpper?.UpperBound == undefined ? "" : LastUpper?.UpperBound
    setPaymentUpperLastSet(LastUpperBound);
  };

  ////////////Edit Option///////////////

  const onHandleSelectEditPayment = (tabIndex) => {
    setActivePaymentTab(tabIndex);
    setlowerPayment(0);
    setupperPayment(0);
    setchargePayment(0);
    setEditpaymentLablename(paymentTab[tabIndex].label);
    setEditpaymentLableId(paymentTab[tabIndex].value);

    const filtered = paymentTab.filter(
      (input, index) => Number(tabIndex) === index
    );

    const EditPaymentFindArrayBlank = [];

    EditinputFields.map((input, index) => {
      if (filtered[0]?.value === input.typeid) {
        EditPaymentFindArrayBlank.push(input);
      }
    });

    const LastUpper = EditPaymentFindArrayBlank[EditPaymentFindArrayBlank?.length - 1];
    const LastUpperBound = LastUpper?.UpperBound == undefined ? "" : LastUpper?.UpperBound
    setEditUpperboundval(LastUpperBound)
  };

  const onHandleSelectEditDelivery = (tabIndex) => {
    setActiveDeliveryTab(tabIndex);
    setlowerDelivery(0);
    setupperDelivery(0);
    setchargeDelivery(0);
    setEditDeliveryLablename(deliveryTab[tabIndex].labelDelivery);
    setEditDeliveryLableId(deliveryTab[tabIndex].id);

    const filtered = deliveryTab.filter(
      (input, index) => Number(tabIndex) === index
    );

    const EditDeliveryFindArrayBlank = [];

    EditinputFieldsDelivery.map((input, index) => {
      if (filtered[0]?.id === input.typeid) {
        EditDeliveryFindArrayBlank.push(input);
      }
    });

    
    const LastUpper = EditDeliveryFindArrayBlank[EditDeliveryFindArrayBlank?.length - 1];
    const LastUpperBound = LastUpper?.UpperBound == undefined ? "" : LastUpper?.UpperBound
    setEditUpperboundvalDelivery(LastUpperBound)
  };

  //////////////////////////////////////

  const handleAddTabsDelivery = () => {
    const newDeliveryMethod = `{"type": "${deliveryTab[activeTabDelivery]?.labelDelivery}","range":[ { "lower":${lowerDelivery} ,"upper": ${upperDelivery} ,"charge":${chargeDelivery},"type":"percentage"}]}`;
    
    // Create a new array with the existing delivery methods and the new delivery method
    const updatedDeliveryMethods = [...deliveryMethodArray, newDeliveryMethod];
    setdeliveryMethodArray(updatedDeliveryMethods);
  };
  const handleAddTabsPayment = () => {
    var lowerboundvalue;
    var upperboundvalue;
    var chargevalue;

    // {
    paymentTab.map((item, index) => {
      if (activeTabPayment == index) {
        formData.map((form, indexx) => {
          lowerboundvalue = document.getElementById(
            item.label + "lowerbound" + indexx
          ).value;
          upperboundvalue = document.getElementById(
            item.label + "upperbound" + indexx
          ).value;
          chargevalue = document.getElementById(
            item.label + "charge" + indexx
          ).value;
        });
      }
    });
    // }
    setlowerPayment(lowerboundvalue);
    setupperPayment(upperboundvalue);
    setchargePayment(chargevalue);
    const newForm = {
      // Define the initial data for the new form here
      lowerbound: lowerboundvalue,
      upperbound: upperboundvalue,
      charge: chargevalue,
    };

    setFormData([...formData, newForm]);
    const newPaymentMethod = `{"type": "${paymentTab[activeTabPayment]?.label}","range":[ { "lower":${lowerboundvalue} ,"upper": ${upperboundvalue} ,"charge":${chargevalue},"type":"percentage"}]}`;
    const updatedPaymentMethods = [...paymentMethodArray, newPaymentMethod];
    setpaymentMethodArray(updatedPaymentMethods);
  };

  /////////payment dynamic field add/////////////

  const [inputFields, setInputFields] = useState([]);
  const [inputErrorUpperBound, setinputErrorUpperBound] = useState(false);

  const addFieldsBankDeposite = (tabIndex) => {
    const filtered = paymentTab.filter(
      (input, index) => Number(tabIndex) === index
    );
    const FindArrayBlank = [];
    inputFields.map((input, index) => {
      if (filtered[0].value === input.typeid) {
        FindArrayBlank.push(input);
      }
    });
    if (!FindArrayBlank.length == 0) {
      if (LowergaterUpperErrorpayment === false) {
        const filtered = paymentTab.filter(
          (input, index) => Number(tabIndex) === index
        );
        const FindArray = [];
        inputFields.map((input, index) => {
          if (filtered[0].value === input.typeid) {
            FindArray.push(input);
          }
        });

        const LastUpper = FindArray[FindArray.length - 1];
        const LastUpperBound = LastUpper.UpperBound;

        if (!Number(LastUpperBound) == "0" || !LastUpperBound === "") {
          const values = [...inputFields];
          values.length == 1 ? setUpperboundval(0) : setUpperboundval("");
          let newfield = {
            ArrayofIndex:"",
            ArrayPayment:FindArray?.length+1,
            LowerBound: `${
              PaymentUpperLastSet !== ""
                ? parseInt(PaymentUpperLastSet) + parseInt("1")
                : "0"
            }`,
            UpperBound: 0,
            charge: 0,
            FixFees:'0',
            OurFees:'0',
            TypeRate: "amount",
            type: paymentLablename,
            typeid: paymentLableId,
          };

          setInputFields([...inputFields, newfield]);
        } else {
          setinputErrorUpperBound(true);
          // alert("Last UpperBound is not 0 and blank")
        }
      } else {
        setLowergaterUpper(true);
      }
    } else {
      const values = [...inputFields];
      values.length == 1 ? setUpperboundval(0) : setUpperboundval("");
      let newfield = {
        ArrayofIndex : "",
        ArrayPayment:1,
        LowerBound: '0',
        UpperBound: '0',
        charge: '0',
        FixFees:'0',
        OurFees:'0',
        TypeRate: 'amount',
        type: paymentLablename,
        typeid: paymentLableId,
      };

      setInputFields([...inputFields, newfield]);
    }


  };

  const addIndex = (index) =>{
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].ArrayofIndex = i;
      inputFields[i].index = i;
    }
  }

  const addIndexD = (index) =>{
    for (let i = 0; i < inputFieldsDelivery.length; i++) {
      inputFieldsDelivery[i].ArrayofIndex = i;
      inputFieldsDelivery[i].index = i;
    }
  }

  const EditIndex = (index) =>{
    for (let i = 0; i < EditinputFields.length; i++) {
      EditinputFields[i].ArrayofIndex = i;
      EditinputFields[i].index = i;
    }
  }

  const EditIndexD = (index) =>{
    for (let i = 0; i < EditinputFieldsDelivery.length; i++) {
      EditinputFieldsDelivery[i].ArrayofIndex = i;
      EditinputFieldsDelivery[i].index = i;
    }
  }


  const handleuppertoLower = (tabIndex) =>{
    const filtered = paymentTab.filter(
      (input, index) => Number(tabIndex) === index
    );
    const FindArrayBlank = [];
    inputFields.map((input, index) => {
      if (filtered[0].value === input.typeid) {
        FindArrayBlank.push(input);
      }
    });
  }

  const handleChangesLower = (tabIndex ,index, event, ArrayofIndex) =>{
    const filtered = paymentTab.filter(
      (input, index) => Number(tabIndex) === index
    );
    const FindArrayBlank = [];
    inputFields.map((input, index) => {
      if (filtered[0].value === input.typeid) {
        FindArrayBlank.push(input);
      }
    });

    for (let i = 0; i < FindArrayBlank.length; i++) {
      if(FindArrayBlank[i].ArrayofIndex === ArrayofIndex){

        for (let x = 0; x < inputFields.length; x++) {
          if(inputFields[x] === FindArrayBlank[i+1]){
            if (x < inputFields.length) {
              const nextData = { ...inputFields[x] };
              nextData.LowerBound = parseInt(event.target.value) + 1;
      
              setInputFields((prevState) => {
                const updatedFields = [...prevState];
                updatedFields[x] = nextData;
                return updatedFields;
              });
            }
          }
        }
      }
    }
  }

  const handleChangesLowerDelivery = (tabIndex ,index, event, ArrayofIndex) =>{
    const filtered = deliveryTab.filter(
      (input, index) => Number(tabIndex) === index
    );
    const FindArrayBlank = [];
    inputFieldsDelivery.map((input, index) => {
      if (filtered[0].id === input.typeid) {
        FindArrayBlank.push(input);
      }
    });

    for (let i = 0; i < FindArrayBlank.length; i++) {
      if(FindArrayBlank[i].ArrayofIndex === ArrayofIndex){

        for (let x = 0; x < inputFieldsDelivery.length; x++) {
          if(inputFieldsDelivery[x] === FindArrayBlank[i+1]){
            if (x < inputFieldsDelivery.length) {
              const nextData = { ...inputFieldsDelivery[x] };
              nextData.LowerBound = parseInt(event.target.value) + 1;
      
              setInputFieldsDelivery((prevState) => {
                const updatedFields = [...prevState];
                updatedFields[x] = nextData;
                return updatedFields;
              });
            }
          }
        }
      }
    }
  }

  const handleEditChangesLower = (tabIndex ,index, event, ArrayofIndex) =>{
    const filtered = paymentTab.filter(
      (input, index) => Number(tabIndex) === index
    );
    const FindArrayBlank = [];
    EditinputFields.map((input, index) => {
      if (filtered[0].value === input.typeid) {
        FindArrayBlank.push(input);
      }
    });

    for (let i = 0; i < FindArrayBlank.length; i++) {
      if(FindArrayBlank[i].ArrayofIndex === ArrayofIndex){

        for (let x = 0; x < EditinputFields.length; x++) {
          if(EditinputFields[x] === FindArrayBlank[i+1]){
            if (x < EditinputFields.length) {
              const nextData = { ...EditinputFields[x] };
              nextData.LowerBound = parseInt(event.target.value) + 1;
      
              EditsetInputFields((prevState) => {
                const updatedFields = [...prevState];
                updatedFields[x] = nextData;
                return updatedFields;
              });
            }
          }
        }
      }
    }
  }

  const handleEditChangesLowerDelivery = (tabIndex ,index, event, ArrayofIndex) =>{
    const filtered = deliveryTab.filter(
      (input, index) => Number(tabIndex) === index
    );
    const FindArrayBlank = [];
    EditinputFieldsDelivery.map((input, index) => {
      if (filtered[0].id === input.typeid) {
        FindArrayBlank.push(input);
      }
    });

    for (let i = 0; i < FindArrayBlank.length; i++) {
      if(FindArrayBlank[i].ArrayofIndex === ArrayofIndex){

        for (let x = 0; x < EditinputFieldsDelivery.length; x++) {
          if(EditinputFieldsDelivery[x] === FindArrayBlank[i+1]){
            if (x < EditinputFieldsDelivery.length) {
              const nextData = { ...EditinputFieldsDelivery[x] };
              nextData.LowerBound = parseInt(event.target.value) + 1;
      
              setEditInputFieldsDelivery((prevState) => {
                const updatedFields = [...prevState];
                updatedFields[x] = nextData;
                return updatedFields;
              });
            }
          }
        }
      }
    }
  }

  const handleFormChangeBankDeposite = (index, event, label) => {
   
    let data = [...inputFields];
    let data1 = [...inputFields];
    let data2 = [...inputFields];
    data[index][event.target.name] = event.target.value;
    data1[index]["type"] = paymentLablename;
    data2[index]["typeid"] = paymentLableId;
    setInputFields(data, data1, data2);
    if (data[index]["LowerBound"] > data[index]["UpperBound"]) {
      setErrorUP(index);
    } else if (data[index]["LowerBound"] < data[index]["UpperBound"]) {
      setErrorUP("");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const lol = [];
    const dataArraye = inputFields.map((item) => {
      if (item.type === "Debit Card" || item.type === "Credit Card") {
        var data = `{"typeid":${item.typeid},"type": "${
          item.type
        }","range":[ { "lower":${parseInt(item.LowerBound)} ,"upper": ${
          item.UpperBound
        } , "fixfees" :${item?.FixFees == undefined || item?.FixFees == "" ? 0 : item?.FixFees} , "ourfees" :${item.OurFees == undefined || item?.OurFees == "" ? 0 : item?.OurFees} ,"charge":${
          item.charge == undefined || item?.charge == "" ? 0 : item?.charge
        },"type":"${item.TypeRate}"}]}`;
      } else {
        var data = `{"typeid":${item.typeid},"type": "${
          item.type
        }","range":[ { "lower":${parseInt(item.LowerBound)} ,"upper": ${
          item.UpperBound
        } , "charge":${item.charge == undefined || item?.charge == "" ? 0 : item?.charge},"type":"${item.TypeRate}"}]}`;
      }
      lol.push(data);
    });

    const data = JSON.stringify(dataArraye);
    //  setpaymentdata(lol)
    return lol;
  };

  const removeFields = (index,PaymetIndex,PaymetType) => {
    // debugger
    var DeleteLower = "";
    var PIndex = PaymetIndex
    inputFields.map((field, i) => {
      if (field?.ArrayPayment === PaymetIndex && field?.type === PaymetType) {
        DeleteLower = field.LowerBound;
      }
    });

    const updatedFields = inputFields.map((field, i) => {
      if(field?.type === PaymetType){
        // debugger
        if (PaymetIndex + 1 === field?.ArrayPayment) {
          return {
            ...field,
            ArrayPayment:PaymetIndex,
            LowerBound: DeleteLower,
          };
        } else if (PaymetIndex < field?.ArrayPayment) {
          PIndex = PIndex+1
          return {
            ...field,
            ArrayPayment:PIndex
          };
        } else {
          return field;
        }
      } else {
        return field;
      }
    });

    updatedFields.splice(index, 1);
    setInputFields(updatedFields);
  };

  ////////////////////////////////////////////////

  /////////Delivery dynamic field add/////////////

  const [inputFieldsDelivery, setInputFieldsDelivery] = useState([]);
  const DeliveryLastDataError = [];

  const addFieldsDelivery = (tabIndex) => {

    const filtered = deliveryTab.filter(
      (input, index) => Number(tabIndex) === index
    );

    const DeliveryFindArrayBlank = [];

    inputFieldsDelivery.map((input, index) => {
      if (filtered[0].id === input.typeid) {
        DeliveryFindArrayBlank.push(input);
      }
    });

    if(!DeliveryFindArrayBlank.length==0){
      if (LowergaterUpperError == false) {
        const filtered = deliveryTab.filter(
          (input, index) => Number(tabIndex) === index
        );

        const DeliveryFindArray = [];

        inputFieldsDelivery.map((input, index) => {
          if (filtered[0].id === input.typeid) {
            DeliveryFindArray.push(input);
          }
        });


        const LastUpper = DeliveryFindArray[DeliveryFindArray.length - 1];
        const LastUpperBound = LastUpper.UpperBound;

        if (!Number(LastUpperBound) == "0" || !LastUpperBound === "") {
          let newfield = {
            ArrayofIndex:"",
            ArrayPayment:DeliveryFindArray?.length+1,
            LowerBound: `${
              DeliveryUpperLastSet !== ""
                ? parseInt(DeliveryUpperLastSet) + parseInt("1")
                : "0"
            }`,
            UpperBound: "0",
            charge: "0",
            TypeRate: "amount",
            type: DeliveryLablename,
            typeid: DeliveryLableId,
          };
          setInputFieldsDelivery([...inputFieldsDelivery, newfield]);
        } else {
          setinputErrorUpperBound(true);
          // alert("Last UpperBound is not 0 and blank")
        }
      } else {
        // LowergaterUpperError
        setLowergaterUpper(true);
      }
    }else{
      let newfield = {
        ArrayofIndex : "",
        ArrayPayment:1,
        LowerBound: "0",
        UpperBound: "0",
        charge: "0",
        TypeRate: "amount",
        type: DeliveryLablename,
        typeid: DeliveryLableId,
      };
      setInputFieldsDelivery([...inputFieldsDelivery, newfield]);
    }
  };

  const handleFormChangeDelivery = (index, event, label) => {
    let data = [...inputFieldsDelivery];
    let data1 = [...inputFieldsDelivery];
    let data2 = [...inputFieldsDelivery];
    data[index][event.target.name] = event.target.value;
    data1[index]["type"] = DeliveryLablename;
    data2[index]["typeid"] = DeliveryLableId;
    setInputFieldsDelivery(data, data1, data2);

  };

  const [LowergaterUpper, setLowergaterUpper] = useState(false);
  const [LowergaterUpperErrorpayment, setLowergaterUpperErrorpayment] = useState(false);
  const [LowergaterUpperError, setLowergaterUpperError] = useState(false);
  const handleUppergaterLower = () => {};

  const submitDelivery = (e) => {
    e.preventDefault();

    const lol = [];
    const dataArraye = inputFieldsDelivery.map((item) => {
      // var data = `{"typeid":112,"type": "${item.type}","range":[ { "lower":${item.LowerBound} ,"upper": ${item.UpperBound} ,"charge":${item.Rate},"type":"${item.TypeRate}"}]}`
      var data = `{"typeid":${item.typeid},"type": "${
        item.type
      }","range":[ { "lower":${parseInt(item.LowerBound)} ,"upper": ${
        item.UpperBound
      } ,"charge":${item?.charge== undefined || item?.charge == "" ? 0 : item.charge},"type":"${item.TypeRate}"}]}`;
      lol.push(data);
    });

    const data = JSON.stringify(dataArraye);
    setDeliverydata(lol);
    return lol;
  };

  const removeFieldsDelivery = (index,DeliveryIndex,DeliveryType) => {
    var DeleteLower="";
    var DIndex = DeliveryIndex
    inputFieldsDelivery.map((field, i) => {
      if (field?.ArrayPayment === DeliveryIndex && field?.type === DeliveryType) {
        DeleteLower = field.LowerBound;
      }
    });

    const updatedFields = inputFieldsDelivery.map((field, i) => {
      if(field?.type === DeliveryType){
        // debugger
        if (DeliveryIndex + 1 === field?.ArrayPayment) {
          return {
            ...field,
            ArrayPayment:DeliveryIndex,
            LowerBound: DeleteLower,
          };
        } else if (DeliveryIndex < field?.ArrayPayment) {
          DIndex = DIndex+1
          return {
            ...field,
            ArrayPayment:DIndex
          };
        } else {
          return field;
        }
      } else {
        return field;
      }
    });

    updatedFields.splice(index, 1);
    setInputFieldsDelivery(updatedFields);
  };

  ////////////////////////////////////////////////

  /////////Edit payment dynamic field add/////////////

  const [EditinputFields, EditsetInputFields] = useState([]);

  const addFieldsEditPaymentMethod = (tabIndex) => {

    const filtered = paymentTab.filter(
      (input, index) => Number(tabIndex) === index
    );

    const EditPaymentFindArrayBlank = [];

    EditinputFields.map((input, index) => {
      if (filtered[0].value === input.typeid) {
        EditPaymentFindArrayBlank.push(input);
      }
    });

    if(!EditPaymentFindArrayBlank.length == 0){

      if (LowergaterUpperErrorpayment == false) {
        const filtered = paymentTab.filter(
          (input, index) => Number(tabIndex) === index
        );
  
        const PaymentFindArray = [];
  
        EditinputFields.map((input, index) => {
          if (filtered[0].value === input.typeid) {
            PaymentFindArray.push(input);
          }
        });
        // setEditUpperboundvalPayment
  
        const LastUpper = PaymentFindArray[PaymentFindArray.length - 1];
        const LastUpperBoundd = LastUpper.UpperBound;

        
        if (!Number(LastUpperBoundd) == 0 || !LastUpperBoundd === "")  {

          let newfield = {
            ArrayofIndex:"",
            ArrayPayment:PaymentFindArray?.length+1,
            LowerBound: `${
              EditUpperboundval !== ""
                    ? parseInt(EditUpperboundval) + parseInt("1")
                    : ""
                }`,
            UpperBound: '0',
            charge: '0',
            FixFees:'0',
            OurFees:'0',
            TypeRate: 'amount',
            type: EditpaymentLablename,
            typeid: EditpaymentLableId,
          };
      
          EditsetInputFields([...EditinputFields, newfield]);
        } else {
          setinputErrorUpperBound(true);
          // alert("Last UpperBound is not 0 and blank")
        }
      } else {
        // LowergaterUpperError
        setLowergaterUpper(true);
      }
      }else{
        let newfield = {
          ArrayofIndex:"",
          ArrayPayment:1,
          LowerBound: '0',
          UpperBound: '0',
          charge: '0',
          FixFees:'0',
          OurFees:'0',
          TypeRate: 'amount',
          type: EditpaymentLablename,
          typeid: EditpaymentLableId,
        };
    
        EditsetInputFields([...EditinputFields, newfield]);
      }
    // -------------------------------------------- //

    // const values = [...EditinputFields];
    // const lastInput = values[values.length - 1];

    // let newfield = {
    //   LowerBound: `${parseInt(lastInput.UpperBound) + parseInt("1")}`,
    //   UpperBound: "",
    //   charge: "",
    //   TypeRate: "",
    //   type: EditpaymentLablename,
    //   typeid: EditpaymentLableId,
    // };

    // EditsetInputFields([...EditinputFields, newfield]);

  };

  const handleFormChangeEditPaymentmethod = (index, event, label) => {
    let data = [...EditinputFields];
    let data1 = [...EditinputFields];
    let data2 = [...EditinputFields];
    data[index][event.target.name] = event.target.value;
    data1[index]["type"] = EditpaymentLablename;
    data2[index]["typeid"] = EditpaymentLableId;
    EditsetInputFields(data, data1, data2);
  };

  const Editpaymentsubmit = (e) => {
    e.preventDefault();

    const lol = [];
    const dataArraye = EditinputFields.map((item) => {
      if (item.type === "Debit Card" || item.type === "Credit Card") {
        var data = `{"typeid":${item.typeid},"type": "${
          item.type
        }","range":[ { "lower":${parseInt(item.LowerBound)} ,"upper": ${
          item.UpperBound
        } , "fixfees" :${parseFloat(item.FixFees == undefined || item.FixFees == "" ? 0 : item?.FixFees)} , "ourfees" :${parseFloat(item.OurFees == undefined || item.OurFees == "" ? 0 : item?.OurFees)} ,"charge":${
          parseFloat(item.charge == undefined || item.charge == "" ? 0 : item?.charge)
        },"type":"${item.TypeRate}"}]}`;
      } else {
        var data = `{"typeid":${item.typeid},"type": "${
          item.type
        }","range":[ { "lower":${parseInt(item.LowerBound)} ,"upper": ${
          item.UpperBound
        } ,"charge":${parseFloat(item.charge == undefined || item.charge == "" ? 0 : item?.charge)},"type":"${item.TypeRate}"}]}`;
      }
      lol.push(data);
    });

    const data = JSON.stringify(dataArraye);
    //  setpaymentdata(lol)
    return lol;
  };

  const EditPaymentremoveFields = (index , index1 , PaymetIndex,PaymetType) => {
    // debugger
    var DeleteLower = "";
    var PIndex = PaymetIndex
    EditinputFields.map((field, i) => {
      if (field?.ArrayPayment === PaymetIndex && field?.type === PaymetType) {
        DeleteLower = field.LowerBound;
      }
    });
  
    const updatedFields = EditinputFields.map((field, i) => {
      if(field?.type === PaymetType){
        // debugger
        if (PaymetIndex + 1 === field?.ArrayPayment) {
          return {
            ...field,
            ArrayPayment:PaymetIndex,
            LowerBound: DeleteLower,
          };
        } else if (PaymetIndex < field?.ArrayPayment) {
          PIndex = PIndex+1
          return {
            ...field,
            ArrayPayment:PIndex
          };
        } else {
          return field;
        }
      } else {
        return field;
      }
    });
  
    updatedFields.splice(index, 1);
    EditsetInputFields(updatedFields);

    let data = updatedFields

    const filtered = paymentTab.filter(
      (input, i) => Number(index1) === i
    );

    const EditPaymentFindArrayBlank = [];

    updatedFields.map((input, index) => {
      if (filtered[0].value === input.typeid) {
        EditPaymentFindArrayBlank.push(input);
      }
    });
    
    if(!EditPaymentFindArrayBlank.length==0){
    const LastUpper = EditPaymentFindArrayBlank[EditPaymentFindArrayBlank.length - 1];
    const LastUpperBound = LastUpper.UpperBound;
    setEditUpperboundval(LastUpperBound)
  }
};

  ////////////////////////////////////////////////

  /////////Delivery dynamic field add/////////////

  const [EditPaymentUpperLastSet, setEditPaymentUpperLastSet] = useState("0");
  const [EditDeliveryUpperLastSet, setEditDeliveryUpperLastSet] = useState("0");

  const [EditinputFieldsDelivery, setEditInputFieldsDelivery] = useState([]);

  const addFieldsEditDelivery = (tabIndex) => {
    const filtered = deliveryTab.filter(
      (input, index) => Number(tabIndex) === index
    );

    const EditDeliveryFindArrayBlank = [];

    EditinputFieldsDelivery.map((input, index) => {
      if (filtered[0].id === input.typeid) {
        EditDeliveryFindArrayBlank.push(input);
      }
    });
//---------------------------------------------------------//
    if(!EditDeliveryFindArrayBlank.length == 0){

      if (LowergaterUpperError == false) {
        const filtered = deliveryTab.filter(
          (input, index) => Number(tabIndex) === index
        );
  
        const DeliveryFindArray = [];
  
        EditinputFieldsDelivery.map((input, index) => {
          if (filtered[0].id === input.typeid) {
            DeliveryFindArray.push(input);
          }
        });
        // setEditUpperboundvalDelivery
  
        const LastUpper = DeliveryFindArray[DeliveryFindArray.length - 1];
        const LastUpperBoundd = LastUpper.UpperBound;

        
        if (!Number(LastUpperBoundd) == 0 || !LastUpperBoundd === "")  {

          let newfield = {
            ArrayofIndex:"",
            ArrayPayment:DeliveryFindArray?.length+1,
            LowerBound: `${
              EditUpperboundvalDelivery !== ""
                    ? parseInt(EditUpperboundvalDelivery) + parseInt("1")
                    : ""
                }`,
            UpperBound: '0',
            charge: '0',
            TypeRate: 'amount',
            type: EditDeliveryLablename,
            typeid: EditDeliveryLableId,
          };
      
          setEditInputFieldsDelivery([...EditinputFieldsDelivery, newfield]);
        } else {
          setinputErrorUpperBound(true);
          // alert("Last UpperBound is not 0 and blank")
        }
      } else {
        // LowergaterUpperError
        setLowergaterUpper(true);
      }
      }else{
        let newfield = {
          ArrayofIndex:"",
          ArrayPayment:1,
          LowerBound: '0',
          UpperBound: '0',
          charge: '0',
          TypeRate: 'amount',
          type: EditDeliveryLablename,
          typeid: EditDeliveryLableId,
        };
    
        setEditInputFieldsDelivery([...EditinputFieldsDelivery, newfield]);
      }
//---------------------------------------------------------//

    //////////////////////////////////////////

    // let newfield = {
    //   LowerBound: "",
    //   UpperBound: "",
    //   charge: "",
    //   TypeRate: "",
    //   type: EditDeliveryLablename,
    //   typeid: EditDeliveryLableId,
    // };

    // setEditInputFieldsDelivery([...EditinputFieldsDelivery, newfield]);
  };

  const handleFormChangeEditDelivery = (index, event, label) => {
    let data = [...EditinputFieldsDelivery];
    let data1 = [...EditinputFieldsDelivery];
    let data2 = [...EditinputFieldsDelivery];
    data[index][event.target.name] = event.target.value;
    data1[index]["type"] = EditDeliveryLablename;
    data2[index]["typeid"] = EditDeliveryLableId;
    setEditInputFieldsDelivery(data, data1, data2);
  };

  const submitEditDelivery = (e) => {
    e.preventDefault();

    const lol = [];
    const dataArraye = EditinputFieldsDelivery.map((item) => {
      // var data = `{"typeid":112,"type": "${item.type}","range":[ { "lower":${item.LowerBound} ,"upper": ${item.UpperBound} ,"charge":${item.Rate},"type":"${item.TypeRate}"}]}`
      var data = `{"typeid":${item.typeid},"type": "${
        item.type
      }","range":[ { "lower":${parseInt(item.LowerBound)} ,"upper": ${
        item.UpperBound
      } ,"charge":${parseFloat(item.charge == undefined || item.charge == "" ? 0 : item?.charge)},"type":"${item.TypeRate}"}]}`;
      lol.push(data);
    });

    const data = JSON.stringify(dataArraye);
    setDeliverydata(lol);
    return lol;
  };

  const removeEditFieldsDelivery = (index,index1,DeliveryIndex,DeliveryType) => {

    var DeleteLower = "";
    var DIndex = DeliveryIndex
    EditinputFieldsDelivery.map((field, i) => {
      if (field?.ArrayPayment === DeliveryIndex && field?.type === DeliveryType) {
        DeleteLower = field.LowerBound;
      }
    });
  
    const updatedFields = EditinputFieldsDelivery.map((field, i) => {
      if(field?.type === DeliveryType){
        // debugger
        if (DeliveryIndex + 1 === field?.ArrayPayment) {
          return {
            ...field,
            ArrayPayment:DeliveryIndex,
            LowerBound: DeleteLower,
          };
        } else if (DeliveryIndex < field?.ArrayPayment) {
          DIndex = DIndex+1
          return {
            ...field,
            ArrayPayment:DIndex
          };
        } else {
          return field;
        }
      } else {
        return field;
      }
    });
  
    updatedFields.splice(index, 1);
    setEditInputFieldsDelivery(updatedFields);

    let data = updatedFields;

    const filtered = deliveryTab.filter(
      (input, index) => Number(index1) === index
    );

    const EditDeliveryFindArrayBlank = [];

    updatedFields.map((input, index) => {
      if (filtered[0].id === input.typeid) {
        EditDeliveryFindArrayBlank.push(input);
      }
    });

    if(!EditDeliveryFindArrayBlank.length==0){
      const LastUpper = EditDeliveryFindArrayBlank[EditDeliveryFindArrayBlank.length - 1];
      const LastUpperBound = LastUpper.UpperBound;
      setEditUpperboundvalDelivery(LastUpperBound)
    }
    };
  ////////////////////////////////////////////////

  const handleUpperValuegraterpayment = (Lower) => {
    // 
    if (Lower > Number(Upperboundval)) {
      setLowergaterUpper(true);
      setLowergaterUpperErrorpayment(true);
    } else {
      setLowergaterUpper(false);
      setLowergaterUpperErrorpayment(false);
    }
  };

  const handleUpperValuegrater = (Lower) => {
    // 
    if (Lower > Number(UpperboundvalDelivery)) {
      setLowergaterUpper(true);
      setLowergaterUpperError(true);
    } else {
      setLowergaterUpper(false);
      setLowergaterUpperError(false);
    }
  };

    const handleEditUpperValuegraterpayment = (Lower) => {
    // 
    if (Lower > Number(EditUpperboundval)) {
      setLowergaterUpper(true);
      setLowergaterUpperErrorpayment(true);
    } else {
      setLowergaterUpper(false);
      setLowergaterUpperErrorpayment(false);
    }
  };

  const handleEditUpperValuegrater = (Lower) => {
    // 
    if (Lower > Number(EditUpperboundvalDelivery)) {
      setLowergaterUpper(true);
      setLowergaterUpperError(true);
    } else {
      setLowergaterUpper(false);
      setLowergaterUpperError(false);
    }
  };


  // const handleLowerValueChangeSet = (e,index) => {
  //   var UpdateLower="";
  //   inputFieldsDelivery.map((field, i) => {
  //     if (index === i) {
  //       UpdateLower = field.UpperBound;
  //     }
  //   });

  //   const updatedFields = inputFieldsDelivery.map((field, i) => {
  //     if (index + 1 === i) {
  //       return {
  //         ...field,
  //         LowerBound: UpdateLower,
  //       };
  //     } else {
  //       return field;
  //     }
  //   });
  //   inputFieldsDelivery[index+1]['LowerBound'] = event.target.value;
  //   // updatedFields.splice(index, 1);
  //   // inputFieldsDelivery
  //   setInputFieldsDelivery(updatedFields);
  // }

  return (
    <>
      <section      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
        <Container>
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-white rounded-2">
              <h3 className="text-black px-4 mx-2 responsiveFontLargeHeading normal  border-bottom  pt-4 pb-3 pb-2">
                {ShowHide === true
                  ? "New Service Charge"
                  : "Update Service Charge"}
              </h3>
              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                {/* /////////First Block /////////// */}
                <Container className="">
                  <Row className="mb-4 respoChildFooter">
                    <Form.Group as={Col} controlId="formGridState" className="pbSt">
                      <Form.Label>Exchange From</Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          HandleChangeFromCountry(e);
                        }}
                        value={exchangeFromCurrency}
                      >
                        {countries.map((value) => {
                          return (
                            <option value={value?.currency}>
                              {value?.currency}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Exchange To</Form.Label>
                      <Form.Select
                        onChange={(e) => HandleChangeToCountry(e)}
                        value={exchangeToCurrency}
                      >
                        {countries.map((value) => {
                          return (
                            <option value={value?.currency}>
                              {value?.currency}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  <Row className="mb-4 respoChildFooter">
                    <Form.Group as={Col} controlId="formGridCity"  className="pbDowSt pbSt">
                      <Form.Label>Valid From </Form.Label>
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={handleChange}
                      />

                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={date => {
                          setvalidFrom(moment(date.$d).format("MM/DD/YYYY"))
                        }} 
                         />
                    </LocalizationProvider> */}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Default Service Charge</Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        value={serviceCharge}
                        onChange={(e) => setserviceCharge(e.target.value)}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-4 respoChildFooter">
                    <Form.Group as={Col} controlId="formGridCity"  className="pbDowSt pbSt" >
                      <Form.Label>Minimum Transaction Limit</Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        value={minTransaction}
                        onChange={(e) => setminTransaction(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip" >
                      <Form.Label>Maximum Transaction Limit</Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        value={maxTransaction}
                        onChange={(e) => setmaxTransaction(e.target.value)}
                      />
                    </Form.Group>
                  </Row>
                </Container>
                {/* ///////////////////////////// */}

                {/*//////////////////Add Service Charge start///////////////////*/}
                {ShowHide === true ? (
                  <>
                    <Container>
                      <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="border-0 navTabs text-black"
                      >
                        {/* Payment method tab option  */}
                        <Tab
                          eventKey="pay1"
                          title="Payment Method Charges"
                          className="text-black navTabs border-0 pt-0"
                        >
                          <hr />
                          <Tabs
                            defaultActiveKey="profile"
                            id="justify-tab-example"
                            className="border-0 px-0 mx-0 navTabs"
                            activeKey={activeTabPayment}
                            onSelect={(tabIndex) =>{
                              onHandleSelectPayment(tabIndex)
                              setPaymentIndex(tabIndex)
                            }}
                            // onClick={}
                          >
                            {paymentTab.map((tab, index1) => (
                              <Tab eventKey={index1} title={tab.label}>
                                <hr />

                                <div>
                                  {inputFields.map((input, index) => {
                                    if (tab.label === input.type) {
                                      return (
                                        <>
                                          <div className="CreateServiceChargeDynamicCard mb-5">
                                            <Row>
                                              <div className="d-flex ms-auto justify-content-end">
                                                <div className=" pb-4 justify-content-end">
                                                  <a
                                                    className="btn btn-danger  text-white bolder ms-3"
                                                    onClick={() =>
                                                      removeFields(index,input?.ArrayPayment,input?.type)
                                                    }
                                                  >
                                                    <i className="text-white fa fa-trash bolder"></i>{" "}
                                                    {/* Delete */}
                                                  </a>
                                                </div>
                                              </div>
                                            </Row>

                                            <div key={index}>
                                              <Row className="mb-3 respoChildFooter pbSt ">
                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridCity"  className="pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Lower Bound:
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    readOnly
                                                    disabled
                                                    placeholder="Lower Bound"
                                                    min={0}
                                                    className="bg-white"
                                                    name="LowerBound"
                                                    value={input.LowerBound}
                                                    onChange={(event) => {
                                                      handleFormChangeBankDeposite(
                                                        index,
                                                        event,
                                                        tab.label
                                                      );
                                                    }}
                                                  />
                                                </Form.Group>

                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridZip"  className="pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Upper Bound:
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    className="bg-white"
                                                    min={input.LowerBound}
                                                    name="UpperBound"
                                                    value={input.UpperBound}
                                                    onBlur={(e) =>{
                                                      handleUpperValuegraterpayment(
                                                        input.LowerBound
                                                      );
                                                      handleChangesLower(index1 , index, e ,input.ArrayofIndex)
                                                      addIndex(index)
                                                    }}
                                                    onChange={(event) => {
                                                      handleFormChangeBankDeposite(
                                                        index,
                                                        event,
                                                        tab.label
                                                      );
                                                      setPaymentUpperLastSet(
                                                        event.target.value
                                                      );
                                                      setUpperboundval(
                                                        event.target.value
                                                      );
                                                    }}
                                                  />
                                                  {/* {ErrorUP==index ? <span>Upper Is Wrong</span>:''} */}
                                                </Form.Group>
                                              </Row>
                                              {/* <Row className="mb-3 respoChildFooter pbSt"> */}
                                              <Row
                                                className={`mb-3 respoChildFooter pbSt d-flex ${
                                                  input.type === "Debit Card" ||
                                                  input.type === "Credit Card"
                                                    ? "d-block"
                                                    : "d-none"
                                                }`}
                                              >
                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridCity"
                                                  className="col-lg-6 pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Fix Fees:
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    className="bg-white"
                                                    min={0}
                                                    name="FixFees"
                                                    value={input.FixFees}
                                                    onChange={(event) =>
                                                      handleFormChangeBankDeposite(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                    }
                                                  />
                                                </Form.Group>

                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridZip" 
                                                  className="col-lg-6 pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Our Fees:
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    className="bg-white"
                                                    min={0}
                                                    name="OurFees"
                                                    value={input.OurFees}
                                                    onChange={(event) =>
                                                      handleFormChangeBankDeposite(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                    }
                                                  />
                                                </Form.Group>
                                              </Row>
                                              <Row className="mb-3 respoChildFooter pbSt ">
                                                <Form.Group
                                                  as={Col}
                                                  controlId=" formGridCity"  className="pbDowSt"
                                                >
                                                  <Form.Label>Rate:</Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    className="bg-white"
                                                    min={0}
                                                    name="charge"
                                                    value={input.charge}
                                                    onChange={(event) =>
                                                      handleFormChangeBankDeposite(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                    }
                                                  />
                                                </Form.Group>

                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridCity"  className="pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Type Rate:
                                                  </Form.Label>
                                                  <Form.Select
                                                    type="number"
                                                    name="TypeRate"
                                                    value={input.TypeRate}
                                                    onChange={(event) =>
                                                      handleFormChangeBankDeposite(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                    }
                                                  >
                                                    <option value={""}>
                                                      Select Type of Rate
                                                    </option>
                                                    <option value={"amount"}>
                                                      Amount
                                                    </option>
                                                    <option
                                                      value={"percentage"}
                                                      className={`${
                                                        input.type ===
                                                          "Debit Card" ||
                                                        input.type ===
                                                          "Credit Card"
                                                          ? "d-block"
                                                          : "d-none"
                                                      }`}
                                                    >
                                                      Percentage
                                                    </option>
                                                  </Form.Select>
                                                </Form.Group>
                                              </Row>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    }
                                  })}

                                  <Row className="d-flex justify-content-center text-center">
                                    <a
                                      onClick={(e) => {
                                        addFieldsBankDeposite(index1);
                                        // addIndex(index1)
                                      }}
                                      className="btn btn-primary text-center col-lg-2 d-flex m-auto text-white bolder justify-content-center"
                                    >
                                      <i className="fa fa-plus"></i> Add Data
                                    </a>
                                  </Row>
                                </div>
                              </Tab>
                            ))}
                          </Tabs>
                        </Tab>

                        {/* Delivery method tab option  */}
                        <Tab
                          eventKey="payinners1"
                          title="Delivery Method Charges"
                          className=" text-black navTabs"
                        >
                          <hr />

                          <Tabs
                            defaultActiveKey="profile"
                            id="justify-tab-example"
                            className="mb-3 respoChildFooter pbSt border-0 navTabs"
                            activeKey={activeTabDelivery}
                            onSelect={(tabIndex) =>
                              onHandleSelectDelivery(tabIndex)
                            }
                          >
                            {deliveryTab.map((tab, index1) => (
                              <Tab eventKey={index1} title={tab.labelDelivery}>
                                {/*  */}

                                {inputFieldsDelivery.map((input, index) => {
                                  if (tab.labelDelivery === input.type) {
                                    return (
                                      <>
                                        <div className="CreateServiceChargeDynamicCard mb-3 respoChildFooter pbSt">
                                          <div className=" d-flex justify-content-end">
                                            <a
                                              className="btn btn-danger  text-white bolder ms-3"
                                              onClick={() =>
                                                removeFieldsDelivery(index,input?.ArrayPayment,input?.type)
                                              }
                                            >
                                              <i className="text-white fa fa-trash bolder"></i>{" "}
                                              {/* Delete */}
                                            </a>
                                          </div>
                                          <div key={index}>
                                            <Row className="mb-3 respoChildFooter pbSt">
                                              <Form.Group
                                                as={Col}
                                                controlId="formGridCity"  className="pbDowSt"
                                              >
                                                <Form.Label>
                                                  Lower Bound:
                                                </Form.Label>
                                                <Form.Control
                                                  type="number"
                                                  min={0}
                                                  className="bg-white"
                                                  disabled
                                                  readOnly
                                                  name="LowerBound"
                                                  value={input.LowerBound}
                                                  onChange={(event) =>
                                                    handleFormChangeDelivery(
                                                      index,
                                                      event,
                                                      tab.label
                                                    )
                                                  }
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                as={Col}
                                                controlId="formGridZip"  className="pbDowSt"
                                              >
                                                <Form.Label>
                                                  Upper Bound:
                                                </Form.Label>
                                                <Form.Control
                                                  type="number"
                                                  className="bg-white"
                                                  min={0}
                                                  name="UpperBound"
                                                  value={input.UpperBound}
                                                  onBlur={(e) =>{
                                                    handleUpperValuegrater(
                                                      input.LowerBound
                                                    )
                                                    handleChangesLowerDelivery(index1 , index, e ,input?.ArrayofIndex)
                                                    addIndexD()
                                                    // handleLowerValueChangeSet(e,index)
                                                  }
                                                  }
                                                  onChange={(event) => {
                                                    handleFormChangeDelivery(
                                                      index,
                                                      event,
                                                      tab.label
                                                    );
                                                    setDeliveryUpperLastSet(
                                                      event.target.value
                                                    );
                                                    setUpperboundvalDelivery(
                                                      event.target.value
                                                    );
                                                  }}
                                                />
                                              </Form.Group>
                                            </Row>
                                            <Row className="mb-3 respoChildFooter pbSt ">
                                              <Form.Group
                                                as={Col}
                                                controlId=" formGridCity"  className="pbDowSt"
                                              >
                                                <Form.Label>Rate:</Form.Label>
                                                <Form.Control
                                                  type="number"
                                                  className="bg-white"
                                                  min={0}
                                                  name="charge"
                                                  value={input.charge}
                                                  onChange={(event) =>
                                                    handleFormChangeDelivery(
                                                      index,
                                                      event,
                                                      tab.label
                                                    )
                                                  }
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                as={Col}
                                                controlId="formGridCity"  className="pbDowSt"
                                              >
                                                <Form.Label>
                                                  Type Rate:
                                                </Form.Label>
                                                <Form.Select
                                                  type="number"
                                                  name="TypeRate"
                                                  value={input.TypeRate}
                                                  onChange={(event) =>
                                                    handleFormChangeDelivery(
                                                      index,
                                                      event,
                                                      tab.label
                                                    )
                                                  }
                                                >
                                                  <option value={""}>
                                                    Select Type of Rate
                                                  </option>
                                                  <option value={"amount"}>
                                                    Amount
                                                  </option>
                                                  <option
                                                    value={"percentage"}
                                                    className={`${
                                                      input.type ===
                                                        "Debit Card" ||
                                                      input.type ===
                                                        "Credit Card"
                                                        ? "d-block"
                                                        : "d-none"
                                                    }`}
                                                  >
                                                    Percentage
                                                  </option>
                                                </Form.Select>
                                              </Form.Group>
                                            </Row>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  }
                                })}
                                <br />

                                <Row className="d-flex justify-content-center">
                                  <a
                                    onClick={() => addFieldsDelivery(index1)}
                                    className="btn btn-primary text-center col-lg-2 d-flex m-auto text-white bolder justify-content-center"
                                  >
                                    <i className="fa fa-plus"></i> Add Data
                                  </a>
                                </Row>
                              </Tab>
                            ))}
                          </Tabs>
                        </Tab>
                      </Tabs>
                      <Row>
                        <div className="d-flex border-top pt-3 paginationEnd">
                          <div className="">
                            <div
                              style={{ background: "#AA2AE1" }}
                              className="rounded btn text-white"
                              onClick={(e) => {
                                addData(e);
                              }}
                            >
                              Create
                            </div>
                          </div>
                          <div className="">
                            <div className=" border-0">
                              <a
                                onClick={() => redirectToServicePage()}
                                className="btn btn-default ms-3 text-black bolder border 2"
                              >
                                Cancel
                              </a>
                            </div>
                          </div>
                        </div>
                      </Row>
                    </Container>
                    {/*//////////////////Add Service Charge end///////////////////*/}
                  </>
                ) : (
                  <>
                    {/*//////////////////Edit Service Charge start///////////////////*/}
                    <Container>
                      <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="border-0 text-black navTabs"
                      >
                        {/* Edit Payment method tab option  */}
                        <Tab
                          eventKey="pay1"
                          title="Payment Method Charges"
                          className="text-black navTabs border-0 pt-0"
                        >
                          <hr />
                          <Tabs
                            defaultActiveKey="profile"
                            id="justify-tab-example"
                            className="border-0 navTabs px-0 mx-0"
                            activeKey={activeTabPayment}
                            onSelect={(tabIndex) =>
                              onHandleSelectEditPayment(tabIndex)
                            }
                          >
                            {paymentTab.map((tab, index1) => (
                              <Tab eventKey={index1} title={tab.label}>
                                <hr />

                                <div>
                                  {EditinputFields.map((input, index) => {
                                    if (tab.label === input.type) {
                                      // paymentMethod.map((payment,index)=>{})
                                      // input.range.map((inpput,I)=>{

                                      
                                      return (
                                        <>
                                          <div
                                            className="CreateServiceChargeDynamicCard mb-5"
                                            id="p"
                                          >
                                            <Row>
                                              <div className="d-flex ms-auto justify-content-end">
                                              
                                                <div className=" pb-4 justify-content-end">
                                                  <a
                                                    className="btn btn-danger  text-white bolder ms-3"
                                                    onClick={() =>
                                                      EditPaymentremoveFields(
                                                        index,index1,input?.ArrayPayment,input?.type
                                                      )
                                                    }
                                                  >
                                                    <i className="text-white fa fa-trash bolder"></i>{" "}
                                                    {/* Delete */}
                                                  </a>
                                                </div>
                                              </div>
                                            </Row>

                                            <div key={index}>
                                              <Row className="mb-3 respoChildFooter pbSt">
                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridCity"  className="pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Lower Bound:
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    min={0}
                                                    className="bg-white"
                                                    disabled
                                                    readOnly
                                                    name="LowerBound"
                                                    value={input.LowerBound}
                                                    onChange={(event) =>
                                                      handleFormChangeEditPaymentmethod(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                    }
                                                  />
                                                </Form.Group>

                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridZip"  className="pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Upper Bound:
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    className="bg-white"
                                                    min={0}
                                                    name="UpperBound"
                                                    value={input.UpperBound}
                                                    onBlur={(e)=>{
                                                      handleEditUpperValuegraterpayment(input.LowerBound)
                                                      handleEditChangesLower(index1 , index, e ,input.ArrayofIndex)
                                                      EditIndex()
                                                    }}
                                                    onChange={(event) =>{
                                                      handleFormChangeEditPaymentmethod(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                      setEditUpperboundval(event.target.value)
                                                    }
                                                    }
                                                  />
                                                </Form.Group>
                                              </Row>
                                              {/* <Row className="mb-3 respoChildFooter pbSt"> */}
                                              <Row
                                                className={`mb-3 respoChildFooter pbSt d-flex ${
                                                  input.type === "Debit Card" ||
                                                  input.type === "Credit Card"
                                                    ? "d-block"
                                                    : "d-none"
                                                }`}
                                              >
                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridCity"
                                                  className="col-lg-6 pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Fix Fees:
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    className="bg-white"
                                                    min={0}
                                                    name="FixFees"
                                                    value={input.FixFees}
                                                    onChange={(event) =>
                                                      handleFormChangeEditPaymentmethod(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                    }
                                                  />
                                                </Form.Group>

                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridZip"
                                                  className="col-lg-6 pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Our Fees:
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    className="bg-white"
                                                    min={0}
                                                    name="OurFees"
                                                    value={input.OurFees}
                                                    onChange={(event) =>
                                                      handleFormChangeEditPaymentmethod(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                    }
                                                  />
                                                </Form.Group>
                                              </Row>
                                              <Row className="mb-3 respoChildFooter pbSt ">
                                                <Form.Group
                                                  as={Col}
                                                  controlId=" formGridCity"  className="pbDowSt"
                                                >
                                                  <Form.Label>Rate:</Form.Label>
                                                  <Form.Control
                                                    type="number"
                                                    className="bg-white"
                                                    min={0}
                                                    name="charge"
                                                    value={input.charge}
                                                    onChange={(event) =>
                                                      handleFormChangeEditPaymentmethod(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                    }
                                                  />
                                                </Form.Group>

                                                <Form.Group
                                                  as={Col}
                                                  controlId="formGridCity"  className="pbDowSt"
                                                >
                                                  <Form.Label>
                                                    Type Rate:
                                                  </Form.Label>
                                                  <Form.Select
                                                    type="number"
                                                    name="TypeRate"
                                                    value={input.TypeRate}
                                                    onChange={(event) =>
                                                      handleFormChangeEditPaymentmethod(
                                                        index,
                                                        event,
                                                        tab.label
                                                      )
                                                    }
                                                  >
                                                    <option value={""}>
                                                      Select Type of Rate
                                                    </option>
                                                    <option value={"amount"}>
                                                      Amount
                                                    </option>
                                                    <option
                                                      value={"percentage"}
                                                      className={`${
                                                        input.type ===
                                                          "Debit Card" ||
                                                        input.type ===
                                                          "Credit Card"
                                                          ? "d-block"
                                                          : "d-none"
                                                      }`}
                                                    >
                                                      Percentage
                                                    </option>
                                                  </Form.Select>
                                                </Form.Group>
                                              </Row>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    // })
                                    }
                                  })}

                                  <Row className="d-flex justify-content-center">
                                    <a
                                      onClick={(e)=> addFieldsEditPaymentMethod(index1)}
                                      className="btn btn-primary w-auto d-flex m-auto text-white bolder"
                                    >
                                      <i className="fa fa-plus"></i> Edit Data
                                    </a>
                                  </Row>
                                  {/* /////////////////// */}
                                </div>
                              </Tab>
                            ))}
                          </Tabs>
                        </Tab>

                        {/* Edit Delivery method tab option  */}
                        <Tab
                          eventKey="payinners1"
                          title="Delievery Method Charges"
                          className=" text-black navTabs"
                        >
                          <Tabs
                            defaultActiveKey="profile"
                            id="justify-tab-example"
                            className="mb-3 respoChildFooter pbSt border-0 navTabs"
                            activeKey={activeTabDelivery}
                            onSelect={(tabIndex) =>
                              onHandleSelectEditDelivery(tabIndex)
                            }
                          >
                            <hr/>
                            {deliveryTab.map((tab, index1) => (
                              <Tab eventKey={index1} title={tab.labelDelivery}>
                                {/*  */}

                                {EditinputFieldsDelivery.map((input, index) => {
                                  if (tab.labelDelivery === input.type) {
                                    return (
                                      <>
                                        <div className="CreateServiceChargeDynamicCard mb-3 respoChildFooter pbSt">
                                          <div className=" d-flex justify-content-end">
                                            <a
                                              className="btn btn-danger  text-white bolder ms-3"
                                              onClick={() =>
                                                removeEditFieldsDelivery(index,index1,input?.ArrayPayment,input?.type)
                                              }
                                            >
                                              <i className="text-white fa fa-trash bolder"></i>{" "}
                                              {/* Delete */}
                                            </a>
                                          </div>
                                          <div key={index}>
                                            <Row className="mb-3 respoChildFooter pbSt">
                                              <Form.Group
                                                as={Col}
                                                controlId="formGridCity"  className="pbDowSt"
                                              >
                                                <Form.Label>
                                                  Lower Bound:
                                                </Form.Label>
                                                <Form.Control
                                                  type="number"
                                                  min={0}
                                                  className="bg-white"
                                                  disabled
                                                  readOnly
                                                  name="LowerBound"
                                                  value={input.LowerBound}
                                                  onChange={(event) =>
                                                    handleFormChangeEditDelivery(
                                                      index,
                                                      event,
                                                      tab.label
                                                    )
                                                  }
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                as={Col}
                                                controlId="formGridZip"  className="pbDowSt"
                                              >
                                                <Form.Label>
                                                  Upper Bound:
                                                </Form.Label>
                                                <Form.Control
                                                  type="number"
                                                  className="bg-white"
                                                  min={0}
                                                  name="UpperBound"
                                                  value={input.UpperBound}
                                                  onChange={(event) =>{
                                                    handleFormChangeEditDelivery(
                                                      index,
                                                      event,
                                                      tab.label
                                                    )
                                                    setEditDeliveryUpperLastSet(event.target.value)
                                                    setEditUpperboundvalDelivery(event.target.value)
                                                  }
                                                  }
                                                  onBlur={(e)=>{
                                                    handleEditUpperValuegrater(input.LowerBound)
                                                    handleEditChangesLowerDelivery(index1 , index, e ,input.ArrayofIndex)
                                                    EditIndexD()
                                                  }}
                                                  
                                                />
                                              </Form.Group>
                                            </Row>

                                            <Row className="mb-3 respoChildFooter pbSt ">
                                              <Form.Group
                                                as={Col}
                                                controlId=" formGridCity"  className="pbDowSt"
                                              >
                                                <Form.Label>Rate:</Form.Label>
                                                <Form.Control
                                                  type="number"
                                                  className="bg-white"
                                                  min={0}
                                                  name="charge"
                                                  value={input.charge}
                                                  onChange={(event) =>
                                                    handleFormChangeEditDelivery(
                                                      index,
                                                      event,
                                                      tab.label
                                                    )
                                                  }
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                as={Col}
                                                controlId="formGridCity"  className="pbDowSt"
                                              >
                                                <Form.Label>
                                                  Type Rate:
                                                </Form.Label>
                                                <Form.Select
                                                  type="number"
                                                  name="TypeRate"
                                                  value={input.TypeRate}
                                                  onChange={(event) =>
                                                    handleFormChangeEditDelivery(
                                                      index,
                                                      event,
                                                      tab.label
                                                    )
                                                  }
                                                >
                                                  <option value={""}>
                                                    Select Type of Rate
                                                  </option>
                                                  <option value={"amount"}>
                                                    Amount
                                                  </option>
                                                  <option
                                                    value={"percentage"}
                                                    className={`${
                                                      input.type ===
                                                        "Debit Card" ||
                                                      input.type ===
                                                        "Credit Card"
                                                        ? "d-block"
                                                        : "d-none"
                                                    }`}
                                                  >
                                                    Percentage
                                                  </option>
                                                </Form.Select>
                                              </Form.Group>
                                            </Row>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  }
                                })}
                                <br />

                                <Row className="d-flex justify-content-center">
                                  <a
                                    onClick={(e)=>addFieldsEditDelivery(index1)}
                                    className="btn btn-primary w-auto d-flex m-auto text-white bolder"
                                  >
                                    <i className="fa fa-plus"></i> Edit Data
                                  </a>
                                </Row>
                              </Tab>
                            ))}
                          </Tabs>
                        </Tab>
                      </Tabs>
                      <Row>
                        <div className="d-flex">
                          <div className="">
                            <div
                              style={{ background: "#AA2AE1" }}
                              className="rounded btn text-white"
                              onClick={(e) => {
                                editData(e);
                              }}
                            >
                              Update
                            </div>
                          </div>
                          <div className="">
                            <div className=" border-0">
                              <a
                                onClick={() => redirectToServicePage()}
                                className="btn btn-default ms-3 text-black bolder border 2"
                              >
                                Cancel
                              </a>
                            </div>
                          </div>
                        </div>
                      </Row>
                    </Container>
                    {/*//////////////////Edit Service Charge end///////////////////*/}
                  </>
                )}
                <ModalComponent
                  show={modalShowEdit}
                  title11={"Service Charge updated successfully"}
                  onHide={() => navigate("/service-charge")}
                />
                <ModalComponent
                  show={modalShowAdd}
                  title11={"Service Charge added successfully"}
                  onHide={() => navigate("/service-charge")}
                />

                <ModalComponent
                  show={inputErrorUpperBound}
                  title11={"UpperBound Value Is not '0' or Blank"}
                  onHide={() => setinputErrorUpperBound(false)}
                />
                <ModalComponent
                  show={LowergaterUpper}
                  title11={"UpperBound Value Is not Lower Than LowerBound"}
                  onHide={() => setLowergaterUpper(false)}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
