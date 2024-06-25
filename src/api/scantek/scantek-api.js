import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getScantekDetailsByUserId = async (userId) => {
    const { data } = await coreAxiosInstance.get(`/scantek/getbyuserid/${userId}`);
    return data;
  };

  {
    /*________________________POST_____________________________________*/
  }
  export const getScantekLinkByUserId = async (userId) => {
    const { data } = await coreAxiosInstance.post(`/scantek/generatedigitalverificationlink/${userId}`);
    return data;
  };