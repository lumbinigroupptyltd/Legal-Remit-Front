import { coreAxiosInstance } from "../../../utils/axiosIntercepters";
console.log(coreAxiosInstance, "axiosInstance")
{
    /*________________________GET_____________________________________*/
  }
  export const getUserKycDetailsByUserId = async (userId) => {
    const { data } = await coreAxiosInstance.get(`/kycdetails/getbyuserid/${userId}`);
    return data;
  };
  
  {
    /*________________________POST_____________________________________*/
  }
  export const addKycUserDetails = async (formData) => {
    const { data } = await coreAxiosInstance.post(`/kycdetails/create`, formData);
    return data;
  };
  {
    /*________________________PATCH_____________________________________*/
  }
  export const editKycUserDetails = async (formData) => {
    const { data } = await coreAxiosInstance.patch(`/kycdetails/update`, formData);
    return data;
  };