import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  addRecipientBank,
  addRecipientContact,
  addRecipientType,
  resetRecipientState,
} from "../../../redux/actions";
import {
  useAddRecipientDetails,
  useEditRecipientDetails,
} from "../../../hooks/sendMoney/recipient/useRecipient";
import {
  sendMoneyRecipientBankSchema,
  sendMoneyRecipientContactSchema,
} from "../validation/sendMoneySchema";

export const recipientTypeForm = (onFormValidate, selectedRecipient) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      recipientId: selectedRecipient || "",
      sendingCountryId: "7b1667c4-1f1a-11ef-8765-06acd635b761",
      receivingCountryId: "d6e8f618-7046-4682-a2d6-cd99df745d12",
    },
    // validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleAddRequest(values);
    },
  });

  const handleAddRequest = (values) => {
    dispatch(addRecipientType(values));
    onFormValidate(true);
  };

  return {
    formik,
  };
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
      stateId: data?.stateId || "",
      district: data?.district || "",
      branch: data?.branch || "",
      bankAccNo: data?.bankAccNo || "",
      address: data?.address || "",
      city: data?.city || "",
      postalCode: data?.postalCode || "",
      phone: data?.phone || "",
      relation: data?.relation || "",
      walletName: data?.walletName || "",
    },
    validationSchema: sendMoneyRecipientBankSchema,
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
  const { mutate: addMutate } = useAddRecipientDetails({});

  console.log(data, "data");
  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      middleName: data?.middleName || "",
      lastName: data?.lastName || "",
      bankName: data?.bankName || "",
      code: data?.code || "",
      ifsccode: data?.ifsccode || "",
      district: data?.district || "",
      branch: data?.branch || "",
      bankAccNo: data?.bankAccNo || "",
      address: data?.address || "",
      city: data?.city || "",
      stateId: data?.stateId || "",
      postalCode: data?.postalCode || "",
      phone: data?.phone || "",
      relationId: data?.relationId || "",
    },
    validationSchema: sendMoneyRecipientContactSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
      onFormValidate(true);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    dispatch(addRecipientContact(values));
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

export const recipientSummaryForm = (onClose, data) => {
  const dispatch = useDispatch();
  const { mutate: editMutate } = useEditRecipientDetails({});

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      middleName: data?.middleName || "",
      lastName: data?.lastName || "",
      bankName: data?.bankName || "",
      code: data?.code || "",
      ifsccode: data?.ifsccode || "",
      district: data?.district || "",
      branch: data?.branch || "",
      bankAccNo: data?.bankAccNo || "",
      address: data?.address || "",
      city: data?.city || "",
      stateId: data?.stateId || "",
      postalCode: data?.postalCode || "",
      phone: data?.phone || "",
      relationId: data?.relationId || "",
    },
    // validationSchema: signupSchema, // Add your validation schema here
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(resetRecipientState());
      console.log(values, "values das")
      // if (values?.id) {
      //   handleEditRequest(values);
      // }
    },
  });

  // const handleEditRequest = (values) => {
  //   editMutate(values, {
  //     onSuccess: () => {
  //       // onClose();
  //       onFormValidate(true);
  //     },
  //   });
  // };

  return {
    formik,
  };
};
