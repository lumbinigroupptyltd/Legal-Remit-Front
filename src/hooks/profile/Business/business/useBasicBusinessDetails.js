import { useMutation, useQuery, useQueryClient } from "react-query";
import { addBasicBusinessDetails, editBasicBusinessDetails, getBasicBusinessDetails, getBusinessDetailsByUserId } from "../../../../api/profile/business/business-basic-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetBusinessDetails = () => {
    return useQuery(["getBusinessDetails"], () => getBasicBusinessDetails(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };

  {
    /*________________________GET_____________________________________*/
  }
  export const useGetBusinessDetailsByUserId = (userId) => {
    return useQuery(["getBusinessDetailsByUserId"], () => getBusinessDetailsByUserId(userId), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };

  {
    /*________________________POST_____________________________________*/
  }
  export const useAddBasicBusinessDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addBasicBusinessDetails"],
      (formData) => addBasicBusinessDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getBasicBusinessDetails");
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
  export const useEditBasicBusinessDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ['editBasicBusinessDetails'],
      (formData) => {
        editBasicBusinessDetails(formData);
    },
      {
        onSuccess: (data, variable, context) => {
          toast.success('User edited successfully');
          onSuccess && onSuccess(data, variable, context);
          queryClient.invalidateQueries('getBasicBusinessDetails');
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };