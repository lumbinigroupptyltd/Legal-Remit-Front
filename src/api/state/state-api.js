import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getUserAllStates = async () => {
    const { data } = await coreAxiosInstance.get(`/states/getall`);
    return data;
  };


  {
    /*________________________POST_____________________________________*/
  }
  export const getUserStatesByCountry = async (formData) => {
    const { data } = await coreAxiosInstance.post(`/getallstatebycountryid`, {formData});
    return data;
  };