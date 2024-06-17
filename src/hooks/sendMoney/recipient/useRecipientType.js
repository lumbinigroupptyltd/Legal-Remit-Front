import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addRecipientTypeDetails,
  deleteRecipientTypeDetails,
  editRecipientTypeDetails,
  getRecipientTypeDetails,
  getRecipientTypeDetailsById,
} from "../../../api/sendmoney/recipient/recipient-type-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetRecipientTypeDetails = () => {
  return useQuery(
    ["getRecipientTypeDetails"],
    () => getRecipientTypeDetails(),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

{
  /*________________________GET_____________________________________*/
}
export const useGetRecipientTypeDetailsById = (id) => {
  return useQuery(
    ["getRecipientTypeDetailsById"],
    () => getRecipientTypeDetailsById(id),
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
export const useAddRecipientTypeDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addRecipientTypeDetails"],
    (formData) => addRecipientTypeDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Recipient Type added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRecipientTypeDetails");
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
export const useEditRecipientTypeDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editRecipientTypeDetails"],
    (formData) => {
      editRecipientTypeDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("Recipient Type updated successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getRecipientTypeDetails");
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
export const useDeleteRecipientTypeDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteRecipientTypeDetails"],
    (id) => deleteRecipientTypeDetails(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Recipient Type deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRecipientTypeDetails");
      },
    }
  );
};
