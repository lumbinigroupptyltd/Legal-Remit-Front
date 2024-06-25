import { coreAxiosInstance } from "../../../utils/axiosIntercepters";


{
    /*________________________GET_____________________________________*/
  }
  export const getBasicBusinessDetails = async () => {
    const { data } = await coreAxiosInstance.get(`/businessdetails/getall`);
    return data;
  };

  
{
  /*________________________GET_____________________________________*/
}
export const getBusinessDetailsByUserId = async (userId) => {
  const { data } = await coreAxiosInstance.get(`/businessdetails/getbyuserid/${userId}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addBasicBusinessDetails = async (formData) => {
  const data = await coreAxiosInstance.post(`/user/update`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editBasicBusinessDetails = async (formData) => {
  const data = await coreAxiosInstance.patch(`/user/update`, formData);
  return data;
};
