import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getUserIdDetails = async () => {
  const { data } = await axiosInstance.post("/useriddetails/getbyuserid");
  return data;
};


{
  /*________________________GET_____________________________________*/
}
export const getUserKycDetails = async (userId) => {
  const { data } = await axiosInstance.get(`/kycdetails/getbyuserid/${userId}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addKycDetailsProfile = async (formData) => {
  const { data } = await axiosInstance.post(`/kycdetails/create`, formData);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addMyDocumentsProfile = async () => {
  const data = await axiosInstance.post("/deletedoc");
  return data;
};

export const addDocument = async (formData) => {
  console.log(formData?.kycfront, "formData");
 
  try {
    const imgData = new FormData();
    imgData.append("file", formData?.kycfront);
    imgData.append("file", formData?.kycback);
    const url = `/client/client-document`;
    const data = await axiosInstance.post(url, imgData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (error) {
    toast.error(getErrorMessage(error));
    return false;
  }
};

{
  /*________________________POST_____________________________________*/
}
export const addPersonalDetailsProfile = async (formData) => {
  const data = await axiosInstance.post(`/verifyotpbyphone`, formData);
  return data;
};
{
  /*________________________POST_____________________________________*/
}
export const editPersonalDetailsProfile = async (formData) => {
  const data = await axiosInstance.patch(`/user/update`, formData);
  return data;
};
{
  /*________________________POST_____________________________________*/
}
export const addIdDetailsProfile = async (formData) => {
  const data = await axiosInstance.post(`/useriddetails/create`, formData);
  return data;
};
