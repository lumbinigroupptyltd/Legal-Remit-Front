import { axiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getBusinessIdDetailsByUserId = async (userId) => {
    const { data } = await axiosInstance.get(`/iddetails/getbyuserid/${userId}`);
    return data;
  };

  {
    /*________________________POST_____________________________________*/
  }
  export const addBusinessIdDetails= async (formData) => {
    const data = await axiosInstance.post(`/iddetails/create`, formData);
    return data;
  };
  {
    /*________________________PATCH_____________________________________*/
  }
  export const editBusinessIdDetails= async (formData) => {
    const data = await axiosInstance.patch(`/useriddetails/update`, formData);
    return data;
  };