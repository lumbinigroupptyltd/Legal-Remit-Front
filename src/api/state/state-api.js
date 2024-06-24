import { axiosInstance } from "../../utils/axiosIntercepters";

{
    /*________________________GET_____________________________________*/
  }
  export const getUserAllStates = async () => {
    const { data } = await axiosInstance.get(`/states/getall`);
    return data;
  };


  {
    /*________________________POST_____________________________________*/
  }
  export const getUserStatesByCountry = async (formData) => {
    const { data } = await axiosInstance.post(`/getallstatebycountryid`, {formData});
    return data;
  };