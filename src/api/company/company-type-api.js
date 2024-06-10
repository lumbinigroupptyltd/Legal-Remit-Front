import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getCompanyTypeDetails = async () => {
    const { data } = await axiosInstance.get(`/companytype/getall`);
    return data;
  };