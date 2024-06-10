import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getAllOccupations = async () => {
    const { data } = await axiosInstance.get(`/occupation/getall`);
    return data;
  };