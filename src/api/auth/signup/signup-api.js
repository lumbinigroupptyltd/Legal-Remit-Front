import { axiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________POST_____________________________________*/
}
export const addSignUp = async (formData) => {
  const data = await axiosInstance.post("/user/create", formData);
  return data;
};
