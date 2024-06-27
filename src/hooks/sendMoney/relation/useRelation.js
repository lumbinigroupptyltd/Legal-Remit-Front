import { useMutation, useQuery, useQueryClient } from "react-query";
import { addRelation, deleteRelation, editRelation, getRelation, getRelationById } from "../../../api/sendmoney/relation/relation-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetRelation = () => {
  return useQuery(["getRelation"], () => getRelation(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetRelationById = (id) => {
  return useQuery(
    ["getRelationById"],
    () => getRelationById(id),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

{
  /*________________________POST_____________________________________*/
}
export const useAddRelation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addRelation"],
    (formData) => addRelation(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Recipient added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRelation");
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
export const useEditRelation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editRelation"],
    (formData) => {
      editRelation(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("Recipient updated successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getRelation");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

{
  /*________________________DELETE_____________________________________*/
}
export const useDeleteRelation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteRelation"],
    (id) => deleteRelation(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Recipient deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRecipientDetails");
      },
    }
  );
};
