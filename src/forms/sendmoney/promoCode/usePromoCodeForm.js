import { useFormik } from "formik";
import { useAddPromoCode } from "../../../hooks/sendMoney/promoCode/usePromoCode";

export const usePromoCodeForm = (onClose) => {
    const { mutate: addMutate } = useAddPromoCode({});
 
    const formik = useFormik({
      initialValues: {
        promoCode: "",
      },
      enableReinitialize: true,
      onSubmit: (values) => {         
        handledAddRequest(values);
      },
    });
  
    const handledAddRequest = (values) => {
      values = { ...values };
      addMutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
    };
  
    return {
      formik,
    };
  };
  