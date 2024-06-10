import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addBusinessIdDetails, editBusinessIdDetails, getBusinessIdDetailsByUserId } from "../../../../api/profile/business/business-Id-api";


{
  /*________________________GET_____________________________________*/
}
export const useGetBusinessIdDetailsByUserId = (userId) => {
  return useQuery(["getBusinessIdDetailsByUserId"], () => getBusinessIdDetailsByUserId(userId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
    /*________________________POST_____________________________________*/
  }
  export const useAddBusinessIdDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addBusinessIdDetails"],
      (formData) => addBusinessIdDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getBusinessIdDetailsByUserId");
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
  export const useEditBusinessIdDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["editBusinessIdDetails"],
      (formData) => editBusinessIdDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getBusinessIdDetailsByUserId");
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };