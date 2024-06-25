import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  console.log(coreAxiosInstance, "coreAxiosInstance")
  export const getAllCountries = async () => {
    const { data } = await coreAxiosInstance.get(`/country/getall`);
    return data;
  };