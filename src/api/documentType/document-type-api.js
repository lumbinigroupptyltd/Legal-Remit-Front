import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getDocTypeById = async (id) => {
    const { data } = await axiosInstance.get(`/documenttype/getbyid/${id}`);
    return data;
  };