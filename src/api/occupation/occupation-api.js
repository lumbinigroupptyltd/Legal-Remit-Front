import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getAllOccupations = async () => {
    const { data } = await coreAxiosInstance.get(`/occupation/getall`);
    return data;
  };