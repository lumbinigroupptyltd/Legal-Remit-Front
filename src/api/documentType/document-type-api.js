import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getDocTypeById = async (id) => {
    const { data } = await coreAxiosInstance.get(`/documenttype/getbyid/${id}`);
    return data;
  };