import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addDirectorDetails, editDirectorDetails } from "../../../../api/profile/business/business-director-api";

{
    /*________________________POST_____________________________________*/
  }
  export const useAddShareHolderDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addShareHolderDetails"],
      (formData) => addDirectorDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("share holder details added successfully");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getBusinessDetailsByUserId");
          queryClient.invalidateQueries("getDirectorDetailsByBussId");
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
      (formData) => editDirectorDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getBusinessDetailsByUserId");
          queryClient.invalidateQueries("getDirectorDetailsByBussId");
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };