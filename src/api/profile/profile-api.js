import { axiosInstance } from "../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getUserIdDetails = async () => {
  const { data } = await axiosInstance.post("/useriddetails/getbyuserid");
  return data;
};


{
  /*________________________GET_____________________________________*/
}
export const getUserKycDetails = async () => {
  const { data } = await axiosInstance.post("/userkycdetails/getbyuserid");
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addKycDetailsProfile = async (formData) => {
  const { data } = await axiosInstance.post(`/kycdetails/create`, formData);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addMyDocumentsProfile = async () => {
  const data = await axiosInstance.post("/deletedoc");
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addPersonalDetailsProfile = async (formData) => {
  const data = await axiosInstance.post(`/verifyotpbyphone`, formData);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addIdDetailsProfile = async (formData) => {
  const data = await axiosInstance.post(`/useriddetails/create`, formData);
  return data;
};
