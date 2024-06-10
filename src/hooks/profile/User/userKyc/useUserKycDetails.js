import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addKycUserDetails, editKycUserDetails, getUserKycDetailsByUserId } from "../../../../api/profile/user/user-kyc-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetUserKycDetailsByUserId = (userId) => {
    return useQuery(["getUserKycDetailsByUserId"], () => getUserKycDetailsByUserId(userId), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };

  {
    /*________________________POST_____________________________________*/
  }
  export const useAddUserKycDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addKycUserDetails"],
      (formData) => addKycUserDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("kyc details added successfully");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getUserKycDetailsByUserId");
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
  export const useEditUserKycDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ['editKycUserDetails'],
      (formData) => {
        editKycUserDetails(formData);
      },
      {
        onSuccess: (data, variable, context) => {
          toast.success('Kyc details updated successfully');
          onSuccess && onSuccess(data, variable, context);
          queryClient.invalidateQueries('getUserKycDetailsByUserId');
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };