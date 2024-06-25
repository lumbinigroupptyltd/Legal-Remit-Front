import { coreAxiosInstance } from "../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getRoles = async () => {
  const { data } = await coreAxiosInstance.post("role/getall");
  return data;
};