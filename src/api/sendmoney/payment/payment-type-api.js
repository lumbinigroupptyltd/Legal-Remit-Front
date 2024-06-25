import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getPaymentTypeDetails = async () => {
  const { data } = await coreAxiosInstance.get(`/paymenttype/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getPaymentTypeDetailsById = async (id) => {
  const { data } = await coreAxiosInstance.get(`/paymenttype/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addPaymentTypeDetails = async (formData) => {
  const data = await coreAxiosInstance.post(`/paymenttype/create`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editPaymentTypeDetails = async (formData) => {
  const data = await coreAxiosInstance.patch(`/paymenttype/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deletePaymentTypeDetails = async (id) => {
  if (id) {
    const data = await coreAxiosInstance.delete(`paymenttype/delete/${id}`);
    return data;
  }
};
