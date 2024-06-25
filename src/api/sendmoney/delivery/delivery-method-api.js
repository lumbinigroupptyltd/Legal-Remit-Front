import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getDeliveryMethodDetails = async () => {
  const { data } = await coreAxiosInstance.get(`/deliverymethod/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getDeliveryMethodDetailsById = async (id) => {
  const { data } = await coreAxiosInstance.get(`/deliverymethod/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addDeliveryMethodDetails = async (formData) => {
  const data = await coreAxiosInstance.post(`/deliverymethod/create`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editDeliveryMethodDetails = async (formData) => {
  const data = await coreAxiosInstance.patch(`/deliverymethod/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteDeliveryMethodDetails = async (id) => {
  if (id) {
    const data = await coreAxiosInstance.delete(`deliverymethod/delete/${id}`);
    return data;
  }
};
