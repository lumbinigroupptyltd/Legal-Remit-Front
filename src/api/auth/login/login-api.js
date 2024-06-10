import { axiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________POST_____________________________________*/
}
export const addLogin = async (formData) => {
  const data = await axiosInstance.post("/user/login", formData);
  return data;
};
