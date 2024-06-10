import { axiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________POST_____________________________________*/
  }
  export const addBusinessExtraDetails = async (formData) => {
    const data = await axiosInstance.post(`/businessdetails/create`, formData);
    return data;
  };

  {
    /*________________________PATCH_____________________________________*/
  }
  export const editBusinessExtraDetails = async (formData) => {
    const data = await axiosInstance.patch(`/businessdetails/update`, formData);
    return data;
  };