import { axiosInstance } from "../../../../utils/axiosIntercepters";

{
  /*________________________POST_____________________________________*/
}
export const addOtpVerNum = async ({formData}) => {
  const { data } = await axiosInstance.post('/otp/send', {
    phone: formData.phoneNumber,
    phoneCode: formData.phoneCode
  });
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getOTPVerify = async (formData) => {
  const { data } = await axiosInstance.get(`/otp/getbyotp/${formData?.otp}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addResendVerification = async () => {
  const data = await axiosInstance.post("/sendotp");
  return data;
};
 
{
  /*________________________POST_____________________________________*/
}
export const addChangeOtpNumber = async (formData) => {
    const data = await axiosInstance.get(`/otp/getbyphone/${formData?.change_phone_verify_number}`);
    return data;
  };