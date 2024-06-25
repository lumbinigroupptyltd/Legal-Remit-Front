import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

  {
    /*________________________GET_____________________________________*/
  }
  export const getUserIdDetailsByUserId = async (userId) => {
    const { data } = await coreAxiosInstance.get(`/iddetails/getbyuserid/${userId}`);
    return data;
  };

  {
    /*________________________GET_____________________________________*/
  }
  export const getUserIdDetailsById = async (id) => {
    const { data } = await coreAxiosInstance.get(`/iddetails/getbyid/${id}`);
    return data;
  };

  {
    /*________________________POST_____________________________________*/
  }
  export const addUserIdDetails= async (formData) => {
    const data = await coreAxiosInstance.post(`/iddetails/create`, formData);
    return data;
  };
  {
    /*________________________PATCH_____________________________________*/
  }
  export const editUserIdDetails= async (formData) => {
    const data = await coreAxiosInstance.patch(`/iddetails/update`, formData);
    return data;
  };