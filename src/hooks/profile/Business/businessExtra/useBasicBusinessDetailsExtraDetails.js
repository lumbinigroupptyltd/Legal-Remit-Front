import { useMutation, useQueryClient } from "react-query";

{
    /*________________________POST_____________________________________*/
  }
  export const useAddBusinessExtraDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addBusinessExtraDetails"],
      (formData) => addBusinessExtraDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("Business details added successfully");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getBusinessDetails");
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
  export const useEditBusinessExtraDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ['editBusinessExtraDetails'],
      (formData) => {
        editBusinessExtraDetails(formData);
    },
      {
        onSuccess: (data, variable, context) => {
          toast.success('User edited successfully');
          onSuccess && onSuccess(data, variable, context);
          queryClient.invalidateQueries('getPersonalDetails');
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };