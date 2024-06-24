import { useMutation, useQuery, useQueryClient } from "react-query";
import { getScantekDetailsByUserId, getScantekLinkByUserId } from "../../api/scantek/scantek-api";
import { toast } from "react-toastify";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetScantekDetailsByUserId = (userId) => {
    return useQuery(["getScantekDetailsByUserId"], () => getScantekDetailsByUserId(userId), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };


  
  {
    /*________________________POST_____________________________________*/
  }
  export const useGetScantekLinkByUserId = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(["getScantekLinkByUserId"], (userId) => getScantekLinkByUserId(userId), {
      onSuccess: (data, variables, context) => {
        toast.success("Please verify your biometric verification");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    });
  };