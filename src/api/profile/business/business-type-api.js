import { axiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getBusinessTypeDetails = async () => {
    const { data } = await axiosInstance.get(`/businesstype/getall`);
    return data;
  };