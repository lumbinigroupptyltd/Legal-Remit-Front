import { axiosInstance } from "../../../utils/axiosIntercepters";
/*________________________RECIPIENT_CONTACT_DETAILS_____________________________________*/

{
  /*________________________GET_____________________________________*/
}
export const getRecipientContactDetails = async () => {
  const { data } = await axiosInstance.get(`/getall`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addRecipientContactDetails = async (formData) => {
  const data = await axiosInstance.post(`/post`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editRecipientContactDetails = async (formData) => {
  const data = await axiosInstance.post(`/update`, formData);
  return data;
};

/*________________________RECIPIENT_BANK_DETAILS_____________________________________*/

export const getRecipientBankDetails = async () => {
  const { data } = await axiosInstance.get(`/getall`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addRecipientBankDetails = async (formData) => {
  const data = await axiosInstance.post(`/post`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editRecipientBankDetails = async (formData) => {
  const data = await axiosInstance.post(`/update`, formData);
  return data;
};




/*________________________RECIPIENT_MESSAGE_DETAILS_____________________________________*/

export const getRecipientMessageDetails = async () => {
    const { data } = await axiosInstance.get(`/getall`);
    return data;
  };
  
  {
    /*________________________POST_____________________________________*/
  }
  export const addRecipientMessageDetails = async (formData) => {
    const data = await axiosInstance.post(`/post`, formData);
    return data;
  };
  
  {
    /*________________________PATCH_____________________________________*/
  }
  export const editRecipientMessageDetails = async (formData) => {
    const data = await axiosInstance.post(`/update`, formData);
    return data;
  };
  