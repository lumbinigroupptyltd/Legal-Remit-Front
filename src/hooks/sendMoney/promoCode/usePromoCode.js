import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addPromoCode } from "../../../api/sendmoney/promoCode/promo-code-api";
import { getErrorMessage } from "../../../utils/getErrorMessage";

{
  /*________________________POST_____________________________________*/
}
export const useAddPromoCode = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addPromoCode"], (formData) => addPromoCode(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("PromoCode applied successfully");
      onSuccess && onSuccess(data, variables, context);
      //   queryClient.invalidateQueries("getUserInfoByUserId");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};
