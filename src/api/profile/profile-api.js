import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axiosIntercepters";
import { getErrorMessage } from "../../utils/getErrorMessage";

{
  /*________________________GET_____________________________________*/
}
export const getUserIdDetails = async (userId) => {
  const { data } = await axiosInstance.get(`/iddetails/getbyuserid/${userId}`);
  return data;
};
{
  /*________________________GET_____________________________________*/
}
export const getDocTypeDetails = async () => {
  const { data } = await axiosInstance.get(`/documenttype/getiddetails`);
  return data;
};
{
  /*________________________GET_____________________________________*/
}
export const getDocTypeById = async (doTypeId) => {
  const { data } = await axiosInstance.get(`/documenttype/getbyid/${doTypeId}`);
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
  /*________________________PATCH_____________________________________*/
}
export const editKycDetailsProfile = async (formData) => {
  const { data } = await axiosInstance.patch(`/kycdetails/update`, formData);
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
  try {
    const imgData = new FormData();
    imgData.append("file", formData?.Front);
    imgData.append("file", formData?.Back);
    imgData.append("requests", JSON.stringify(formData?.getDocData));
    const url = `/documents/save`;
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
  const data = await axiosInstance.post(`/iddetails/create`, formData);
  return data;
};
{
  /*________________________PATCH_____________________________________*/
}
export const editIdDetailsProfile = async (formData) => {
  const data = await axiosInstance.patch(`/useriddetails/update`, formData);
  return data;
};













{
  /*________________________GET_____________________________________*/
}
export const getVerifyEmail = async () => {
  const data = await axiosInstance.post("/user/sendVerificationEmail");
  return data;
};


{
  /*________________________GET_____________________________________*/
}
export const getBusinessDirectorDetails = async () => {
  const { data } = await axiosInstance.get(`/director/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getBusinessDetails = async () => {
  const { data } = await axiosInstance.get(`/businessdetails/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getBusinessTypeDetails = async () => {
  const { data } = await axiosInstance.get(`/businesstype/getall`);
  return data;
};


{
  /*________________________GET_____________________________________*/
}
export const getBusinessIndustryType = async () => {
  const { data } = await axiosInstance.get(`/industrytype/getall`);
  return data;
};