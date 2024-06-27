import { transactionAxiosInstance } from "../../../utils/axiosIntercepters";


/*________________________TRANSACTION_DETAILS_____________________________________*/



{
  /*________________________GET_____________________________________*/
}
export const getTransation = async () => {
  const { data } = await transactionAxiosInstance.get(`/api/transaction`);
  return data;
};

{
  /*________________________GET_BY_ID_____________________________________*/
}
export const getTransationByUserId = async (userId) => {
  const { data } = await transactionAxiosInstance.get(`/api/transaction/${userId}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addTransation = async (formData) => {
  const data = await transactionAxiosInstance.post(`/api/transaction`, formData);
  return data;
};
