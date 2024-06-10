import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getIdIssuingAuthority = async () => {
    const { data } = await axiosInstance.get(`/issueauthority/getall`);
    return data;
  };