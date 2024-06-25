import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________POST_____________________________________*/
}
export const addLogin = async (formData) => {
  const data = await coreAxiosInstance.post("/user/login", formData);
  return data;
};
