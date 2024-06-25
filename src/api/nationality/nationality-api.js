import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getUserNationality = async () => {
    const { data } = await coreAxiosInstance.get(`/nationality/getall`);
    return data;
  };