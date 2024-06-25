import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getIndustryTypeDetails = async () => {
    const { data } = await coreAxiosInstance.get(`/industrytype/getall`);
    return data;
  };
  