import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addDeliveryTypeDetails,
  deleteDeliveryTypeDetails,
  editDeliveryTypeDetails,
  getDeliveryTypeDetails,
  getDeliveryTypeDetailsById,
} from "../../../api/sendmoney/delivery/delivery-type-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetDeliveryTypeDetails = () => {
  return useQuery(["getDeliveryTypeDetails"], () => getDeliveryTypeDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetDeliveryTypeDetailsById = (id) => {
  return useQuery(
    ["getDeliveryTypeDetailsById"],
    () => getDeliveryTypeDetailsById(id),
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
export const useAddDeliveryTypeDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addDeliveryTypeDetails"],
    (formData) => addDeliveryTypeDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Delivery Type added successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDeliveryTypeDetails");
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
export const useEditDeliveryTypeDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editDeliveryTypeDetails"],
    (formData) => {
      editDeliveryTypeDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("Delivery Type updated successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getDeliveryTypeDetails");
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
export const useDeleteDeliveryTypeDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteDeliveryTypeDetails"],
    (id) => deleteDeliveryTypeDetails(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Delivery Type deleted successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDeliveryTypeDetails");
      },
    }
  );
};
