import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________POST_____________________________________*/
  }
  export const addBusinessExtraDetails = async (formData) => {
    const data = await coreAxiosInstance.post(`/businessdetails/create`, formData);
    return data;
  };

  {
    /*________________________PATCH_____________________________________*/
  }
  export const editBusinessExtraDetails = async (formData) => {
    const data = await coreAxiosInstance.patch(`/businessdetails/update`, formData);
    return data;
  };