import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getPaymentMethodDetails = async () => {
  const { data } = await coreAxiosInstance.get(`/paymentmethod/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getPaymentMethodDetailsById = async (id) => {
  const { data } = await coreAxiosInstance.get(`/paymentmethod/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addPaymentMethodDetails = async (formData) => {
  const data = await coreAxiosInstance.post(`/paymentmethod/create`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editPaymentMethodDetails = async (formData) => {
  const data = await coreAxiosInstance.patch(`/paymentmethod/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deletePaymentMethodDetails = async (id) => {
  if (id) {
    const data = await coreAxiosInstance.delete(`paymentmethod/delete/${id}`);
    return data;
  }
};
