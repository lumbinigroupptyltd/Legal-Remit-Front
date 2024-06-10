import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getIndustryTypeDetails = async () => {
    const { data } = await axiosInstance.get(`/industrytype/getall`);
    return data;
  };
  