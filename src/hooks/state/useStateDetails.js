import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getUserAllStates, getUserStatesByCountry } from "../../api/state/state-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetUserAllStates = () => {
    return useQuery(["getUserAllStates"], () => getUserAllStates(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };


  {
    /*________________________POST_____________________________________*/
  }
  export const useGetUserStates = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(["getUserStatesByCountry"], (formData) => getUserStatesByCountry(formData), {
      onSuccess: (data, variables, context) => {
        toast.success("State fetched successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    });
  };