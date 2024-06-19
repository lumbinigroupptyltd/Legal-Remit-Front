import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addRecipientBank } from "../../../redux/actions";

export const recipientTypeForm = (onFormValidate) => {
  const dispatch = useDispatch();

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
    // validationSchema: signupSchema, // Add your validation schema here
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    dispatch(addRecipientBank(values));
    onFormValidate(true);
  };

  return formik;
};


export const recipientBankDetailsForm = (onFormValidate) => {
  const dispatch = useDispatch();
  // const { mutate: addMutate } = useAddRecipientBankDetails({});

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
    onFormValidate(true);
    // addMutate(values, {
    //   onSuccess: () => {
    //     onFormValidate(true);
    //   },
    // });
  };

  return {
    formik,
  };
};

export const recipientContactDetailsForm = (onFormValidate) => {
  // const { mutate: addMutate } = useAddRecipientContactDetails({});
 
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
    // addMutate(values, {
    //   onSuccess: () => {
        onFormValidate(true);
    //   },
    // });
  };

  return {
    formik,
  };
};


export const recipientSummaryForm = (onClose) => {
  
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
    // validationSchema: signupSchema, // Add your validation schema here
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    onClose();
  };

  return formik;
};