import { coreAxiosInstance } from "../../../utils/axiosIntercepters";
/*________________________RECIPIENT_RELATION_DETAILS_____________________________________*/

{
  /*________________________GET_____________________________________*/
}
export const getRelation = async () => {
  const { data } = await coreAxiosInstance.get(`/relations/getall`);
  return data;
};

{
  /*________________________GET_BY_ID_____________________________________*/
}
export const getRelationById = async (id) => {
  const { data } = await coreAxiosInstance.get(`/recipientuser/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addRelation = async (formData) => {
  const data = await coreAxiosInstance.post(`/recipientuser/create`, formData);
  return data;
};

{
    /*________________________PATCH_____________________________________*/
  }
  export const editRelation = async (formData) => {
    const data = await coreAxiosInstance.patch(`/recipientuser/update`, formData);
    return data;
  };

{
  /*________________________DELETE_____________________________________*/
}
export const deleteRelation = async (id) => {
  const data = await coreAxiosInstance.delete(`/recipientuser/delete/${id}`);
  return data;
};

