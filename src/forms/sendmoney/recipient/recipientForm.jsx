import { useFormik } from "formik";
import {
  useAddRecipientBankDetails,
  useAddRecipientContactDetails,
} from "../../../hooks/sendMoney/useRecipient";
import { useDispatch } from "react-redux";
import { addRecipientBank } from "../../../redux/actions";

export const recipientBankDetailsForm = (onFormValidate) => {
  const dispatch = useDispatch();
  const { mutate: addMutate } = useAddRecipientBankDetails({});

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      bankName: "",
      code: "",
      ifsccode: "",
      state: "",
      district: "",
      branch: "",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    dispatch(addRecipientBank(values));
    addMutate(values, {
      onSuccess: () => {
        onFormValidate(true);
      },
    });
  };

  return {
    formik,
  };
};

export const recipientContactDetailsForm = (onFormValidate) => {
  const { mutate: addMutate } = useAddRecipientContactDetails({});
 
  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      relation: "",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: () => {
        onFormValidate(true);
      },
    });
  };

  return {
    formik,
  };
};

export const recipientMessageDetailsForm = (onFormValidate, onClose) => {
    const { mutate: addMutate } = useAddRecipientContactDetails({});

    const formik = useFormik({
      initialValues: {
        address: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        relation: "",
      },
      //   validationSchema: signupSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        handledAddRequest(values);
      },
    });
  
    const handledAddRequest = (values) => {
      values = { ...values };
      addMutate(values, {
        onSuccess: () => {
          onFormValidate(true);
          onClose();
        },
      });
    };
  
    return {
      formik,
    };
  };