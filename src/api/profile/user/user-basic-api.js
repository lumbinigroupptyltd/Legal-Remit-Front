import { coreAxiosInstance } from "../../../utils/axiosIntercepters";

{
  /*________________________POST_____________________________________*/
}
export const addUserBasicUserDetails = async (formData) => {
  const data = await coreAxiosInstance.post(`/user/update`, formData);
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editUserBasicUserDetails = async (formData) => {
  const data = await coreAxiosInstance.patch(`/user/update`, formData);
  return data;
};

