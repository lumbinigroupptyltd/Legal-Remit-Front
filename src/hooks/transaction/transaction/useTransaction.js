import { useMutation, useQuery, useQueryClient } from "react-query";
import { addTransation, getTransation, getTransationByUserId } from "../../../api/transaction-controller/transaction/transaction-api";
{
  /*________________________GET_____________________________________*/
}
export const useGetTransation = () => {
  return useQuery(["getTransation"], () => getTransation(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetTransationByUserId = (userId) => {
  return useQuery(
    ["getTransationByUserId"],
    () => getTransationByUserId(userId),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

{
  /*________________________POST_____________________________________*/
}
export const useAddTransation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addTransation"],
    (formData) => addTransation(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Transaction added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getTransationByUserId");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};
