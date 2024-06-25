import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getDeliveryTypeDetails = async () => {
  const { data } = await coreAxiosInstance.get(`/deliverytype/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getDeliveryTypeDetailsById = async (id) => {
  const { data } = await coreAxiosInstance.get(`/deliverytype/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addDeliveryTypeDetails = async (formData) => {
  const data = await coreAxiosInstance.post(`/deliverytype/create`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editDeliveryTypeDetails = async (formData) => {
  const data = await coreAxiosInstance.patch(`/deliverytype/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteDeliveryTypeDetails = async (id) => {
  if (id) {
    const data = await coreAxiosInstance.delete(`deliverytype/delete/${id}`);
    return data;
  }
};
