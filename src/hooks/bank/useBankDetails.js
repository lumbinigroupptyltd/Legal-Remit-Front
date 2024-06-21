import { useMutation, useQuery, useQueryClient } from "react-query";
import { addBANKDetails, deleteBANKDetails, editBANKDetails, getBANKDetailsById, getBankDetails } from "../../api/bank/bank-api";
{
  /*________________________GET_____________________________________*/
}
export const useGetBankDetails = () => {
  return useQuery(["getBankDetails"], () => getBankDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetBankDetailsById = (id) => {
  return useQuery(
    ["getBankDetailsById"],
    () => getBANKDetailsById(id),
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
export const useAddBankDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addBankDetails"],
    (formData) => addBANKDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Bank added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getBankDetails");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

{
  /*________________________PATCH_____________________________________*/
}
export const useEditBankDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editBankDetails"],
    (formData) => {
      editBANKDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("Bank updated successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getBankDetails");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

{
  /*________________________DELETE_____________________________________*/
}
export const useDeleteBankDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteBankDetails"],
    (id) => deleteBANKDetails(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Bank deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getBankDetails");
      },
    }
  );
};
