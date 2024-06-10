import { axiosInstance } from "../../../utils/axiosIntercepters";

  {
    /*________________________GET_____________________________________*/
  }
  export const getUserIdDetailsByUserId = async (userId) => {
    const { data } = await axiosInstance.get(`/iddetails/getbyuserid/${userId}`);
    return data;
  };

  {
    /*________________________GET_____________________________________*/
  }
  export const getUserIdDetailsById = async (id) => {
    const { data } = await axiosInstance.get(`/iddetails/getbyid/${id}`);
    return data;
  };

  {
    /*________________________POST_____________________________________*/
  }
  export const addUserIdDetails= async (formData) => {
    const data = await axiosInstance.post(`/iddetails/create`, formData);
    return data;
  };
  {
    /*________________________PATCH_____________________________________*/
  }
  export const editUserIdDetails= async (formData) => {
    const data = await axiosInstance.patch(`/iddetails/update`, formData);
    return data;
  };