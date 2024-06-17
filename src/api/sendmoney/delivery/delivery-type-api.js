import { axiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getDeliveryTypeDetails = async () => {
  const { data } = await axiosInstance.get(`/deliverytype/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getDeliveryTypeDetailsById = async (id) => {
  const { data } = await axiosInstance.get(`/deliverytype/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addDeliveryTypeDetails = async (formData) => {
  const data = await axiosInstance.post(`/deliverytype/create`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editDeliveryTypeDetails = async (formData) => {
  const data = await axiosInstance.patch(`/deliverytype/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteDeliveryTypeDetails = async (id) => {
  if (id) {
    const data = await axiosInstance.delete(`deliverytype/delete/${id}`);
    return data;
  }
};
