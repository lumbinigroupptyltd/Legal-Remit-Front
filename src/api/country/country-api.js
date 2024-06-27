import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }

  export const getAllCountries = async () => {
    const { data } = await coreAxiosInstance.get(`/country/getall`);
    return data;
  };