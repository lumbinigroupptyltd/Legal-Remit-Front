import { useMutation, useQuery, useQueryClient } from "react-query";
import { addDirectorDetails, editDirectorDetails, getBusinessDirectorDetails } from "../../../../api/profile/business/business-director-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetDirectorDetails = () => {
    return useQuery(["getDirectorDetails"], () => getBusinessDirectorDetails(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };

{
    /*________________________POST_____________________________________*/
  }
  export const useAddDirectorDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addDirectorDetails"],
      (formData) => addDirectorDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("Directors added successfully");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getDirectorDetails");
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
  export const useEditDirectorDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["editDirectorDetails"],
      (formData) => editDirectorDetails(formData),
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