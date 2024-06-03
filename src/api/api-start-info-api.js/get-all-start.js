import { useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getUserInfo = async (userId) => {
  const { data } = await axiosInstance.get(`/user/getbyid/${userId}`);
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
  const { data } = await axiosInstance.get(`/nationality/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getUserAllStates = async () => {
  const { data } = await axiosInstance.get(`/states/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getAllOccupations = async () => {
  const { data } = await axiosInstance.get(`/occupation/getall`);
  return data;
};
{
  /*________________________GET_____________________________________*/
}
export const getIdIssuingAuthority = async () => {
  const { data } = await axiosInstance.get(`/issueauthority/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getUserStates = async (formData) => {
  const { data } = await axiosInstance.post(`/getallstatebycountryid`, {formData});
  return data;
};