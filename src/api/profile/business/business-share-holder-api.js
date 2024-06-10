import { axiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________POST_____________________________________*/
  }
  export const addShareDetails = async (formData) => {
    const data = await axiosInstance.post(`/director/create`, formData);
    return data;
  };

  {
    /*________________________PATCH_____________________________________*/
  }
  export const editShareDetails = async (formData) => {
    const data = await axiosInstance.post(`/business/create`, formData);
    return data;
  };