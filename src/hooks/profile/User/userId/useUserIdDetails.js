import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {getUserIdDetailsByUserId, addUserIdDetails, editUserIdDetails, getUserIdDetailsById } from "../../../../api/profile/user/user-Id-api";
{
  /*________________________GET_____________________________________*/
}
export const useGetUserIdDetailsByUserId = (userId) => {
  return useQuery(["getUserIdDetailsByUserId"], () => getUserIdDetailsByUserId(userId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetUserIdDetailsById = (id) => {
  return useQuery(["getUserIdDetailsById"], () => getUserIdDetailsById(id), {
    enabled: !!id,
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddUserIdDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addUserIdDetails"],
    (formData) => addUserIdDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Succesfully added");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getUserIdDetailsByUserId");
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
export const useEditUserIdDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editUserIdDetails"],
    (formData) => {
      editUserIdDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("User edited successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getUserIdDetailsByUserId");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};
