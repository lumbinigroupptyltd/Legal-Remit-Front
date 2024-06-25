import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getBusinessTypeDetails = async () => {
    const { data } = await coreAxiosInstance.get(`/businesstype/getall`);
    return data;
  };