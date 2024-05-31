import { getErrorMessage } from "../../utils/getErrorMessage";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAllCountries,
  getAllOccupations,
  getIdIssuingAuthority,
  getUserAllStates,
  getUserInfo,
  getUserNationality,
  getUserStates,
} from "../../api/api-start-info-api.js/get-all-start";

{
  /*________________________GET_____________________________________*/
}
export const useGetAllCountries = () => {
  return useQuery(["getCountries"], () => getAllCountries(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetUserInfo = () => {
  return useQuery(["getUserInfo"], () => getUserInfo(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
{
  /*________________________GET_____________________________________*/
}
export const useGetUserNationality = () => {
  return useQuery(["getUserNationality"], () => getUserNationality(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
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
  /*________________________GET_____________________________________*/
}
export const useGetAllOccupations = () => {
  return useQuery(["getAllOccupations"], () => getAllOccupations(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
{
  /*________________________GET_____________________________________*/
}
export const useGetIdIssuingAuthority = () => {
  return useQuery(["getAllOccupations"], () => getIdIssuingAuthority(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetUserStates = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addsignup"], (formData) => getUserStates(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};