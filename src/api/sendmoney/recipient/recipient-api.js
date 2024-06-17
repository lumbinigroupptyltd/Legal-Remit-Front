import { axiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getRecipientDetails = async () => {
  const { data } = await axiosInstance.get(`/recipientuser/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getRecipientDetailsById = async (id) => {
  const { data } = await axiosInstance.get(`/recipientuser/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addRecipientDetails = async (formData) => {
  const data = await axiosInstance.post(`/recipientuser/create`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editRecipientDetails = async (formData) => {
  const data = await axiosInstance.patch(`/recipientuser/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteRecipientDetails = async (id) => {
  if (id) {
    const data = await axiosInstance.delete(`recipientuser/delete/${id}`);
    return data;
  }
};
