import { coreAxiosInstance } from "../../utils/axiosIntercepters";

/*________________________BANK_CONTACT_DETAILS_____________________________________*/


{
  /*________________________GET_____________________________________*/
}
export const getBankDetails = async () => {
  const { data } = await coreAxiosInstance.get(`/banks/getall`);
  return data;
};

{
  /*________________________GET_BY_ID_____________________________________*/
}
export const getBANKDetailsById = async (id) => {
  const { data } = await coreAxiosInstance.get(`/banks/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addBANKDetails = async (formData) => {
  const data = await coreAxiosInstance.post(`/banks/create`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editBANKDetails = async (formData) => {
  const data = await coreAxiosInstance.patch(`/banks/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteBANKDetails = async (id) => {
  const data = await coreAxiosInstance.delete(`/banks/delete/${id}`);
  return data;
};
