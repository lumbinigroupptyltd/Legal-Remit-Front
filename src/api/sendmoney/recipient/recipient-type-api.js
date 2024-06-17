import { axiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getRecipientTypeDetails = async () => {
  const { data } = await axiosInstance.get(`/recipienttype/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getRecipientTypeDetailsById = async (id) => {
  const { data } = await axiosInstance.get(`/recipienttype/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addRecipientTypeDetails = async (formData) => {
  const data = await axiosInstance.post(`/recipienttype/create`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editRecipientTypeDetails = async (formData) => {
  const data = await axiosInstance.patch(`/recipienttype/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteRecipientTypeDetails = async (id) => {
  if (id) {
    const data = await axiosInstance.delete(`recipienttype/delete/${id}`);
    return data;
  }
};