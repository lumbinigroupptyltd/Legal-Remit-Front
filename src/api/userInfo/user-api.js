import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getUserInfoByUserId = async (userId) => {
    const { data } = await coreAxiosInstance.get(`/user/getbyid/${userId}`);
    return data;
  };

  {
    /*________________________GET_____________________________________*/
  }
  export const getVerifyEmail = async (userId) => {
    const data = await coreAxiosInstance.post(`/user/sendVerificationEmail/${userId}`);
    return data;
  };

  {
    /*________________________GET_____________________________________*/
  }
  export const getVerifyPhoneByUserId = async (otpData) => {
    const data = await coreAxiosInstance.post(`/otp/send/`, {phone: otpData?.phoneNumber, phoneCode: otpData?.phoneCode});
    return data;
  };