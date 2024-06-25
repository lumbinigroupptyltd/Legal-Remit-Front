import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getIdIssuingAuthority = async () => {
    const { data } = await coreAxiosInstance.get(`/issueauthority/getall`);
    return data;
  };