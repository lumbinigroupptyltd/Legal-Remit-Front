import { axiosInstance } from "../../utils/axiosIntercepters";

{
  /*________________________GET_____________________________________*/
}
export const getRoles = async () => {
  const { data } = await axiosInstance.post("role/getall");
  return data;
};