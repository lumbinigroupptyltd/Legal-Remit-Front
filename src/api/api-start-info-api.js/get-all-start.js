import { axiosInstance } from "../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getUserInfo = async () => {
  const { data } = await axiosInstance.post(`/getuserinfobyid`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getAllCountries = async () => {
  const { data } = await axiosInstance.get(`/country/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getUserNationality = async () => {
  const { data } = await axiosInstance.get(`/getallnationality`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getUserAllStates = async () => {
  const { data } = await axiosInstance.post(`/getallstatebycountryid`, {id: 14});
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getAllOccupations = async () => {
  const { data } = await axiosInstance.get(`/getalloccupations`);
  return data;
};
{
  /*________________________GET_____________________________________*/
}
export const getIdIssuingAuthority = async () => {
  const { data } = await axiosInstance.get(`/getissueauthoritybynationality`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getUserStates = async (formData) => {
  const { data } = await axiosInstance.post(`/getallstatebycountryid`, {formData});
  return data;
};