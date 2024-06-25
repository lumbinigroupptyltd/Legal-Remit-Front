import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________POST_____________________________________*/
}
export const addSignUp = async (formData) => {
  const data = await coreAxiosInstance.post("/user/create", formData);
  return data;
};
