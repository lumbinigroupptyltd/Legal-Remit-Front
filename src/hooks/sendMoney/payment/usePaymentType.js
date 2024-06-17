import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addPaymentTypeDetails,
  deletePaymentTypeDetails,
  editPaymentTypeDetails,
  getPaymentTypeDetails,
  getPaymentTypeDetailsById,
} from "../../../api/sendmoney/payment/payment-type-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetPaymentTypeDetails = () => {
  return useQuery(["getPaymentTypeDetails"], () => getPaymentTypeDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetPaymentTypeDetailsById = (id) => {
  return useQuery(
    ["getPaymentTypeDetailsById"],
    () => getPaymentTypeDetailsById(id),
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
export const useAddPaymentTypeDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addPaymentTypeDetails"],
    (formData) => addPaymentTypeDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Payment Type added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getPaymentTypeDetails");
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
export const useEditPaymentTypeDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editPaymentTypeDetails"],
    (formData) => {
      editPaymentTypeDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("Payment Type updated successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getPaymentTypeDetails");
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
export const useDeletePaymentTypeDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deletePaymentTypeDetails"],
    (id) => deletePaymentTypeDetails(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Payment Type deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getPaymentTypeDetails");
      },
    }
  );
};
