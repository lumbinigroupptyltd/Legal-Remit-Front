import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addRecipientBank, addRecipientContact } from "../../../redux/actions";
import { useAddRecipientDetails, useEditRecipientDetails } from "../../../hooks/sendMoney/recipient/useRecipient";

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
    // validationSchema: signupSchema,
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

export const recipientBankDetailsForm = (onFormValidate, data) => {
  const dispatch = useDispatch();
  // const { mutate: addMutate } = useAddRecipientBankDetails({});

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      middleName: data?.middleName || "",
      lastName: data?.lastName || "",
      bankName: data?.bankName || "",
      code: data?.code || "",
      ifsccode: data?.ifsccode || "",
      state: data?.state || "",
      district: data?.district || "",
      branch: data?.branch || "",
      bankAccNo: data?.bankAccNo || "",
      address: data?.address || "",
      city: data?.city || "",
      state: data?.state || "",
      postalCode: data?.postalCode || "",
      phone: data?.phone || "",
      relation: data?.relation || "",
      walletName: data?.walletName || "",
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

export const recipientContactDetailsForm = (onFormValidate, data) => {
  const dispatch = useDispatch();
  // const { mutate: addMutate } = useAddRecipientContactDetails({});
console.log(data, "kjfdhvikgvbshk")
  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      middleName: data?.middleName || "",
      lastName: data?.lastName || "",
      bankName: data?.bankName || "",
      code: data?.code || "",
      ifsccode: data?.ifsccode || "",
      state: data?.state || "",
      district: data?.district || "",
      branch: data?.branch || "",
      bankAccNo: data?.bankAccNo || "",
      address: data?.recipientContact?.address || "",
      city: data?.recipientContact?.city || "",
      state: data?.recipientContact?.state || "",
      postalCode: data?.recipientContact?.postalCode || "",
      phone: data?.recipientContact?.phone || "",
      relation: data?.recipientContact?.relation || "",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    dispatch(addRecipientContact(values));
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

export const recipientSummaryForm = (onClose, data) => {
  const { mutate: addMutate } = useAddRecipientDetails({});
  const { mutate: editMutate } = useEditRecipientDetails({});

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      middleName: data?.middleName || "",
      lastName: data?.lastName || "",
      bankName: data?.bankName || "",
      code: data?.code || "",
      ifsccode: data?.ifsccode || "",
      state: data?.state || "",
      district: data?.district || "",
      branch: data?.branch || "",
      bankAccNo: data?.bankAccNo || "",
      address: data?.recipientContact?.address || "",
      city: data?.recipientContact?.city || "",
      state: data?.recipientContact?.state || "",
      postalCode: data?.recipientContact?.postalCode || "",
      phone: data?.recipientContact?.phone || "",
      relation: data?.recipientContact?.relation || "",
    },
    // validationSchema: signupSchema, // Add your validation schema here
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values?.id) {
        handleEditRequest(values);
      } else {
        handleAddRequest(values);
      }
    },
  });

  const handleAddRequest = (values) => {
    addMutate(values, {
      onSuccess: () => {
        // onClose();
        onFormValidate(true);
      },
    });
  };

  const handleEditRequest = (values) => {
    editMutate(values, {
      onSuccess: () => {
        // onClose();
        onFormValidate(true);
      },
    });
  };

  return {
    formik
  }
};
