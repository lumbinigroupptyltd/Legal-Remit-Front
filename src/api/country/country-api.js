import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getAllCountries = async () => {
    const { data } = await axiosInstance.get(`/country/getall`);
    return data;
  };