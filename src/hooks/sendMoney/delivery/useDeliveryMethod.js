import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addDeliveryMethodDetails,
  deleteDeliveryMethodDetails,
  editDeliveryMethodDetails,
  getDeliveryMethodDetails,
  getDeliveryMethodDetailsById,
} from "../../../api/sendmoney/delivery/delivery-method-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetDeliveryMethodDetails = () => {
  return useQuery(
    ["getDeliveryMethodDetails"],
    () => getDeliveryMethodDetails(),
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
export const useGetDeliveryMethodDetailsById = (id) => {
  return useQuery(
    ["getDeliveryMethodDetailsById"],
    () => getDeliveryMethodDetailsById(id),
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
export const useAddDeliveryMethodDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addDeliveryMethodDetails"],
    (formData) => addDeliveryMethodDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Delivery Method added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDeliveryMethodDetails");
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
export const useEditDeliveryMethodDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editDeliveryMethodDetails"],
    (formData) => {
      editDeliveryMethodDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("Delivery Method updated successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getDeliveryMethodDetails");
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
export const useDeleteDeliveryMethodDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteDeliveryMethodDetails"],
    (id) => deleteDeliveryMethodDetails(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Delivery Method deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDeliveryMethodDetails");
      },
    }
  );
};
