import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
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

export const recipientBankDetailsForm = (onFormValidate, data, method) => {
  const dispatch = useDispatch();
  // const { mutate: addMutate } = useAddRecipientBankDetails({});

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      middleName: data?.middleName || "",
      lastName: data?.lastName || "",
      bankId: data?.bankId || "",
      code: data?.code || "",
      ifsccode: data?.ifsccode || "",
      stateName: data?.stateName || "",
      district: data?.district || "",
      branch: data?.branch || "",
      bankAccNo: data?.bankAccNo || "",
      address: data?.address || "",
      city: data?.city || "",
      postalCode: data?.postalCode || "",
      phone: data?.phone || "",
      relation: data?.relation || "",
      walletName: data?.walletName || "",
      walletNo: data?.walletNo || "",
      method: method?.deliveryType?.name || "",
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

export const recipientContactDetailsForm = (onFormValidate, data, userId) => {
  const dispatch = useDispatch();
  const { sendMoneyDeliveryMethod } = useSelector((state) => state.sendMoney);
  const { mutate: addMutate } = useAddRecipientDetails({});

  const formik = useFormik({
    initialValues: {
      userId: userId || "",
      firstName: data?.recipientBank?.firstName || "",
      middleName: data?.recipientBank?.middleName || "",
      lastName: data?.recipientBank?.lastName || "",
      bankId: data?.recipientBank?.bankId || "",
      code: data?.code || "",
      ifsccode: data?.ifsccode || "",
      district: data?.district || "",
      branch: data?.branch || "",
      bankAccNo: data?.recipientBank?.bankAccNo || "",
      address: data?.address || "",
      city: data?.city || "",
      stateName: data?.stateName || "",
      postalCode: data?.postalCode || "",
      phone: data?.phone || "",
      relationId: data?.relationId || "",
      recipientTypeId: data?.recipientType?.recipientId || "",
      countryId: "d6e8f618-7046-4682-a2d6-cd99df745d12",
      deliveryMethodId: sendMoneyDeliveryMethod?.id ||"",
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
      firstName: data?.recipientBank?.firstName || "",
      middleName: data?.recipientBank?.middleName || "",
      lastName: data?.recipientBank?.lastName || "",
      bankId: data?.recipientBank?.bankId || "",
      code: data?.code || "",
      ifsccode: data?.ifsccode || "",
      district: data?.district || "",
      branch: data?.branch || "",
      bankAccNo: data?.recipientBank?.bankAccNo || "",
      address: data?.address || "",
      city: data?.city || "",
      stateName: data?.stateName || "",
      postalCode: data?.postalCode || "",
      phone: data?.phone || "",
      relationId: data?.relationId || "",
    },
    // validationSchema: signupSchema, // Add your validation schema here
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(resetRecipientState());
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
