import { axiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________POST_____________________________________*/
  }
  export const addPromoCode = async (formData) => {
    console.log(formData, "formData")
    const data = await axiosInstance.get(`/rewardconfig/getbyrewardcode/${formData?.promoCode}`, formData);
    return data;
  };
  