import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getBusinessDirectorDetails = async () => {
  const { data } = await coreAxiosInstance.get(`/director/getall`);
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getDirectorDetailsByBussId = async (bussId) => {
  const { data } = await coreAxiosInstance.get(`/director/getByBusinessDetailsId/${bussId}`);
  return data;
};


{
    /*________________________POST_____________________________________*/
  }
  export const addDirectorDetails = async (formData) => {
    const data = await coreAxiosInstance.post(`/director/create`, formData);
    return data;
  };

  {
    /*________________________PATCH_____________________________________*/
  }
  export const editDirectorDetails = async (formData) => {
    const data = await coreAxiosInstance.patch(`/director/update`, formData);
    return data;
  };