import { useMutation, useQuery, useQueryClient } from "react-query";
import { addRecipientDetails, deleteRecipientDetails, editRecipientDetails, getRecipientDetails, getRecipientDetailsById } from "../../../api/sendmoney/recipient/recipient-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetRecipientDetails = () => {
  return useQuery(["getRecipientDetails"], () => getRecipientDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetRecipientDetailsById = (id) => {
  return useQuery(
    ["getRecipientDetailsById"],
    () => getRecipientDetailsById(id),
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
export const useAddRecipientDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addRecipientDetails"],
    (formData) => addRecipientDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Recipient added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRecipientDetails");
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
export const useEditRecipientDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editRecipientDetails"],
    (formData) => {
      editRecipientDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("Recipient updated successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getRecipientDetails");
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
export const useDeleteRecipientDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteRecipientDetails"],
    (id) => deleteRecipientDetails(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Recipient deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRecipientDetails");
      },
    }
  );
};
