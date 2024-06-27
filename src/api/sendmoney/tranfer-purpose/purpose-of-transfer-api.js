import { coreAxiosInstance } from "../../../utils/axiosIntercepters";
/*________________________PURPOSE_OF_TRANSFER_DETAILS_____________________________________*/

{
  /*________________________GET_____________________________________*/
}
export const getPurposeOfTransfer = async () => {
  const { data } = await coreAxiosInstance.get(`/purposeoftransfer/getall`);
  return data;
};

{
  /*________________________GET_BY_ID_____________________________________*/
}
export const getPurposeOfTransferById = async (id) => {
  const { data } = await coreAxiosInstance.get(
    `/purposeoftransfer/getbyid/${id}`
  );
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addPurposeOfTransfer = async (formData) => {
  const data = await coreAxiosInstance.post(
    `/purposeoftransfer/create`,
    formData
  );
  return data;
};

{
  /*________________________PATCH_____________________________________*/
}
export const editPurposeOfTransfer = async (formData) => {
  const data = await coreAxiosInstance.patch(
    `/purposeoftransfer/update`,
    formData
  );
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deletePurposeOfTransfer = async (id) => {
  const data = await coreAxiosInstance.delete(
    `/purposeoftransfer/delete/${id}`
  );
  return data;
};
