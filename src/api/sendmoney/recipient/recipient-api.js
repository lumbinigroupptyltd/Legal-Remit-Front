import { coreAxiosInstance } from "../../../utils/axiosIntercepters";
/*________________________RECIPIENT_CONTACT_DETAILS_____________________________________*/

{
  /*________________________GET_____________________________________*/
}
export const getRecipientDetails = async () => {
  const { data } = await coreAxiosInstance.get(`/recipientuser/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getRecipientDetailsByUserId = async (userId) => {
  const { data } = await coreAxiosInstance.get(`/recipientuser/getbyuserid/${userId}`);
  return data;
};

{
  /*________________________GET_BY_ID_____________________________________*/
}
export const getRecipientDetailsById = async (id) => {
  const { data } = await coreAxiosInstance.get(`/recipientuser/getbyid/${id}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addRecipientDetails = async (formData) => {
  const data = await coreAxiosInstance.post(`/recipientuser/create`, formData);
  return data;
};



{
  /*________________________PATCH_____________________________________*/
}
export const editRecipientDetails = async (formData) => {
  const data = await coreAxiosInstance.patch(`/recipientuser/update`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteRecipientDetails = async (id) => {
  const data = await coreAxiosInstance.delete(`/recipientuser/delete/${id}`);
  return data;
};


/*________________________RECIPIENT_MESSAGE_DETAILS_____________________________________*/

export const getRecipientMessageDetails = async () => {
    const { data } = await coreAxiosInstance.get(`/getall`);
    return data;
  };
  
  {
    /*________________________POST_____________________________________*/
  }
  export const addRecipientMessageDetails = async (formData) => {
    const data = await coreAxiosInstance.post(`/post`, formData);
    return data;
  };
  
  {
    /*________________________PATCH_____________________________________*/
  }
  export const editRecipientMessageDetails = async (formData) => {
    const data = await coreAxiosInstance.post(`/update`, formData);
    return data;
  };
  