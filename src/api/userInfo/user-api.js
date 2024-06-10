import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getUserInfoByUserId = async (userId) => {
    const { data } = await axiosInstance.get(`/user/getbyid/${userId}`);
    return data;
  };

  {
    /*________________________GET_____________________________________*/
  }
  export const getVerifyEmail = async () => {
    const data = await axiosInstance.post("/user/sendVerificationEmail");
    return data;
  };

  {
    /*________________________GET_____________________________________*/
  }
  export const getVerifyPhoneByUserId = async (otpData) => {
    const data = await axiosInstance.post(`/otp/send/`, {phone: otpData?.phoneNumber, phoneCode: otpData?.phoneCode});
    return data;
  };