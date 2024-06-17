import { useMutation, useQuery, useQueryClient } from "react-query";
import { addPaymentMethodDetails, deletePaymentMethodDetails, editPaymentMethodDetails, getPaymentMethodDetails, getPaymentMethodDetailsById } from "../../../api/sendmoney/payment/payment-method-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetPaymentMethodDetails = () => {
  return useQuery(
    ["getPaymentMethodDetails"],
    () => getPaymentMethodDetails(),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

{
  /*________________________GET_____________________________________*/
}
export const useGetPaymentMethodDetailsById = (id) => {
  return useQuery(
    ["getPaymentMethodDetailsById"],
    () => getPaymentMethodDetailsById(id),
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
export const useAddPaymentMethodDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addPaymentMethodDetails"],
    (formData) => addPaymentMethodDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Payment Method added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getPaymentMethodDetails");
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
export const useEditPaymentMethodDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editPaymentMethodDetails"],
    (formData) => {
      editPaymentMethodDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("Payment Method updated successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getPaymentMethodDetails");
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
export const useDeletePaymentMethodDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deletePaymentMethodDetails"],
    (id) => deletePaymentMethodDetails(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Payment Method deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getPaymentMethodDetails");
      },
    }
  );
};
