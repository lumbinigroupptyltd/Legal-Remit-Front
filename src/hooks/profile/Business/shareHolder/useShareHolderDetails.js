import { useMutation, useQuery, useQueryClient } from "react-query";
import { addShareDetails, getShareDetails } from "../../../../api/profile/business/business-share-holder-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetShareDetails = () => {
  return useQuery(["getShareDetails"], () => getShareDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
    /*________________________POST_____________________________________*/
  }
  export const useAddShareHolderDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addShareHolderDetails"],
      (formData) => addShareDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("share holder details added successfully");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getShareDetails");
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
          queryClient.invalidateQueries("getShareDetails");
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };