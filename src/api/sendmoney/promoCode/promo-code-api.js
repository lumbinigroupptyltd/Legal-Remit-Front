import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________POST_____________________________________*/
  }
  export const addPromoCode = async (formData) => {
    const data = await coreAxiosInstance.get(`/rewardconfig/getbyrewardcode/${formData?.promoCode}`, formData);
    return data;
  };
  