import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getScantekDetailsByUserId = async (userId) => {
    const { data } = await axiosInstance.get(`/scantek/getbyuserid/${userId}`);
    return data;
  };