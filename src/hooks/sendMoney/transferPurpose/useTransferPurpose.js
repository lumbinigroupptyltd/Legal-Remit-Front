import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addPurposeOfTransfer,
  deletePurposeOfTransfer,
  editPurposeOfTransfer,
  getPurposeOfTransfer,
  getPurposeOfTransferById,
} from "../../../api/sendmoney/tranfer-purpose/purpose-of-transfer-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetPurposeOfTransfer = () => {
  return useQuery(["getPurposeOfTransfer"], () => getPurposeOfTransfer(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetPurposeOfTransferById = (id) => {
  return useQuery(
    ["getPurposeOfTransferById"],
    () => getPurposeOfTransferById(id),
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
export const useAddPurposeOfTransfer = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addPurposeOfTransfer"],
    (formData) => addPurposeOfTransfer(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getPurposeOfTransfer");
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
export const useEditPurposeOfTransfer = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editPurposeOfTransfer"],
    (formData) => {
      editPurposeOfTransfer(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("Updated successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getPurposeOfTransfer");
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
export const useDeletePurposeOfTransfer = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const deleteData = useMutation(
    ["deletePurposeOfTransfer"],
    async (id) => await deletePurposeOfTransfer(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getPurposeOfTransfer");
      },
    }
  );
  return {
    isSuccess: deleteData?.isSuccess,
    deletePurposeOfTransfer: deleteData?.mutate,
  };
};
