import { axiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getBusinessKycDetailsByUserId = async (userId) => {
    const { data } = await axiosInstance.get(`/kycdetails/getbyuserid/${userId}`);
    return data;
  };
  
  {
    /*________________________POST_____________________________________*/
  }
  export const addKycBusinessDetails = async (formData) => {
    const { data } = await axiosInstance.post(`/kycdetails/create`, formData);
    return data;
  };
  {
    /*________________________PATCH_____________________________________*/
  }
  export const editKycBusinessDetails = async (formData) => {
    const { data } = await axiosInstance.patch(`/kycdetails/update`, formData);
    return data;
  };