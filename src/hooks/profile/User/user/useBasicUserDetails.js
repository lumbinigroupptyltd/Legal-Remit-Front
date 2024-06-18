import { useMutation, useQueryClient } from "react-query";
import { addUserBasicUserDetails, editUserBasicUserDetails } from "../../../../api/profile/user/user-basic-api";
import { toast } from "react-toastify";

{
    /*________________________POST_____________________________________*/
  }
  export const useAddUserBasicUserDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addUserBasicUserDetails"],
      (formData) => addUserBasicUserDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getUserInfoByUserId");
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
  export const useEditUserBasicUserDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ['editUserBasicUserDetails'],
      (formData) => {
        editUserBasicUserDetails(formData);
    },
      {
        onSuccess: (data, variable, context) => {
          toast.success('User edited successfully');
          onSuccess && onSuccess(data, variable, context);
          queryClient.invalidateQueries('getUserInfoByUserId');
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };