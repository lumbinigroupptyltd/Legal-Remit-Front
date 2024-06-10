import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getUserNationality = async () => {
    const { data } = await axiosInstance.get(`/nationality/getall`);
    return data;
  };