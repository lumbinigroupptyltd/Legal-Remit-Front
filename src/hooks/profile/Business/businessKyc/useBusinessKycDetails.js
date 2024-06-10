import { useMutation, useQueryClient } from "react-query";
import { addKycBusinessDetails, editKycBusinessDetails, getBusinessKycDetailsByUserId } from "../../../../api/profile/business/business-kyc-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetBusinessKycDetailsByUserId = (userId) => {
  return useQuery(["getBusinessKycDetailsBBusiness"], () => getBusinessKycDetailsByUserId(userId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
    /*________________________POST_____________________________________*/
  }
  export const useAddKycBusinessDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addKycBusinessDetails"],
      (formData) => addKycBusinessDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("OTP send successfully");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getBusinessKycDetailsBBusiness");
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
  export const useEditKycBusinessDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["editKycBusinessDetails"],
      (formData) => editKycBusinessDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("OTP send successfully");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getBusinessKycDetailsBBusiness");
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };