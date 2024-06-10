import { axiosInstance } from "../../../utils/axiosIntercepters";


{
    /*________________________GET_____________________________________*/
  }
  export const getBasicBusinessDetails = async () => {
    const { data } = await axiosInstance.get(`/businessdetails/getall`);
    return data;
  };

  
{
  /*________________________GET_____________________________________*/
}
export const getBusinessDetailsByUserId = async (userId) => {
  const { data } = await axiosInstance.get(`/businessdetails/getbyuserid/${userId}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addBasicBusinessDetails = async (formData) => {
  const data = await axiosInstance.post(`/user/update`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editBasicBusinessDetails = async (formData) => {
  const data = await axiosInstance.patch(`/user/update`, formData);
  return data;
};
