import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getCompanyTypeDetails = async () => {
    const { data } = await coreAxiosInstance.get(`/companytype/getall`);
    return data;
  };