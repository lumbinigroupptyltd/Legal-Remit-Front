import { axiosInstance } from "../../utils/axiosIntercepters";

/*________________________BANK_CONTACT_DETAILS_____________________________________*/


{
  /*________________________GET_____________________________________*/
}
export const getBankDetails = async () => {
  const { data } = await axiosInstance.get(`/banks/getall`);
  return data;
};

{
  /*________________________GET_BY_ID_____________________________________*/
}
export const getBANKDetailsById = async (id) => {
  const { data } = await axiosInstance.get(`/banks/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addBANKDetails = async (formData) => {
  const data = await axiosInstance.post(`/banks/create`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editBANKDetails = async (formData) => {
  const data = await axiosInstance.patch(`/banks/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteBANKDetails = async (id) => {
  const data = await axiosInstance.delete(`/banks/delete/${id}`);
  return data;
};
