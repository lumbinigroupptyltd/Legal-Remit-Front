import { useMutation, useQueryClient } from "react-query";

{
    /*________________________PUT_____________________________________*/
  }
  export const useAddShareHolderDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addShareHolderDetails"],
      (formData) => addShareHolderDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("");
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
  export const useEditShareHolderDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["editShareHolderDetails"],
      (formData) => editShareHolderDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("");
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };