import { useQuery } from "react-query";
import { getDeliveryServiceCharge, getPaymentServiceCharge } from "../../../api/sendmoney/serviceCharge/service-charge-api";

  {
    /*________________________GET_____________________________________*/
  }
  export const useGetPaymentServiceCharge = (props1) => {
    return useQuery(
      ["getServiceCharge"],
      () => getPaymentServiceCharge(props1),
      {
        cacheTime: 10000,
        refetchInterval: false,
        refetchOnWindowFocus: false,
      }
    );
  };

  {
    /*________________________GET_____________________________________*/
  }
  export const useGetDeliveryServiceCharge = (props2) => {
    return useQuery(
      ["getServiceCharge"],
      () => getDeliveryServiceCharge(props2),
      {
        cacheTime: 10000,
        refetchInterval: false,
        refetchOnWindowFocus: false,
      }
    );
  };