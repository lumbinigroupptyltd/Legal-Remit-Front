import { axiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________POST_____________________________________*/
  }
  export const addBasicBusinessExtraDetails = async (formData) => {
    const data = await axiosInstance.post(`/businessdetails/create`, formData);
    return data;
  };

  {
    /*________________________PATCH_____________________________________*/
  }
  export const editPersonalBusinessExtraDetails = async (formData) => {
    const data = await axiosInstance.patch(`/businessdetails/update`, formData);
    return data;
  };