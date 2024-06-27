import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

  {
    /*________________________GET_____________________________________*/
  }
  export const getPaymentServiceCharge = async (props1) => {
    const { data } = await coreAxiosInstance.get(`/servicecharge/${props1?.fromCountryId}/${props1?.toCountryId}?paymentTypeId=${props1?.paymentType?.id}&amount=${props1?.amount}`);
    return data;
  };


  {
    /*________________________GET_____________________________________*/
  }
  export const getDeliveryServiceCharge = async (props2) => {
    const { data } = await coreAxiosInstance.get(`/servicecharge/${props2?.fromCountryId}/${props2?.toCountryId}?deliverytypeId=${props2?.deliveryType?.id}&amount=${props2?.amount}`);
    return data;
  };