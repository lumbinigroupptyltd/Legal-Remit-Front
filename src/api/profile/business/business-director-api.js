import { axiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getBusinessDirectorDetails = async () => {
  const { data } = await axiosInstance.get(`/director/getall`);
  return data;
};

{
    /*________________________POST_____________________________________*/
  }
  export const addDirectorDetails = async (formData) => {
    const data = await axiosInstance.post(`/director/create`, formData);
    return data;
  };

  {
    /*________________________PATCH_____________________________________*/
  }
  export const editDirectorDetails = async (formData) => {
    const data = await axiosInstance.post(`/business/create`, formData);
    return data;
  };