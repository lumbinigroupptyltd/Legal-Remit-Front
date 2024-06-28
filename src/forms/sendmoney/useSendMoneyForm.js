import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  addPurposeOfTransfer,
  recipientCountry,
  recipientUser,
  sendMoneyAllData,
} from "../../redux/actions/SendMoney";
import {
  sendMoneyCalculateSchema,
  sendMoneyPurposeOfTranferSchema,
} from "./validation/sendMoneySchema";
import { useAddTransation } from "../../hooks/transaction/transaction/useTransaction";

export const useSendMoneyStep1Form = (handleNext) => {
  const dispatch = useDispatch();
  // const { mutate: addSignUpPage } = useSignUp({});
  const formik = useFormik({
    initialValues: {
      countryId: "1",
      countryName: "Nepal",
      phoneCode: "977",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(recipientCountry(values));
      handleNext(values);

      // handledAddRequest(values);
    },
  });

  // const handledAddRequest = (values) => {
  //   values = { ...values };
  //   addSignUpPage(values, {
  //     onSuccess: () => {
  //       setOpenModal(true);
  //       setLoading(false);
  //       handleOtpVerification(values);
  //     },
  //   });
  // };

  return {
    formik,
  };
};

export const useSendMoneyStep2Form = (
  handleNext,
  sendMoneyDeliveryMethod,
  sendMoneyPaymentMethod
) => {
  const { mutate: addmutate } = useAddTransation({});

  const formik = useFormik({
    initialValues: {
      fromCountryId: "7b167666-1f1a-11ef-8765-06acd635b761",
      toCountryId: "d6e8f618-7046-4682-a2d6-cd99df745d12",
      amount: "100",
      resMoney: "0",
      deliveryMethod: sendMoneyDeliveryMethod?.deliveryType?.name || "",
      paymentMethod: sendMoneyPaymentMethod?.paymentType?.name || "",
      currency: "NPR",
    },
    validationSchema: sendMoneyCalculateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleNext(values);
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addmutate(values, {
      onSuccess: () => {
        setOpenModal(true);
        setLoading(false);
        handleOtpVerification(values);
      },
    });
  };

  return {
    formik,
  };
};

export const useSendMoneyStep3Form = (handleNext, selectedItem) => {
  const dispatch = useDispatch();

  // const { mutate: addSignUpPage } = useSignUp({});

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, "val", selectedItem, "sel");
      if (selectedItem) {
        dispatch(recipientUser(selectedItem));
        handleNext(values);
      }

      // handledAddRequest(values);
    },
  });

  // const handledAddRequest = (values) => {
  //   values = { ...values };
  //   addSignUpPage(values, {
  //     onSuccess: () => {
  //       setOpenModal(true);
  //       setLoading(false);
  //       handleOtpVerification(values);
  //     },
  //   });
  // };

  return {
    formik,
  };
};

export const useSendMoneyStep4Form = (handleNext, values) => {
  const dispatch = useDispatch();
  // const { mutate: addSignUpPage } = useSignUp({});

  const formik = useFormik({
    initialValues: {
      transferPurposeId: "",
      receiverMsg: "",
    },
    validationSchema: sendMoneyPurposeOfTranferSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values) {
        dispatch(addPurposeOfTransfer(values));
        handleNext(values);
      }

      // handledAddRequest(values);
    },
  });

  // const handledAddRequest = (values) => {
  //   values = { ...values };
  //   addSignUpPage(values, {
  //     onSuccess: () => {
  //       setOpenModal(true);
  //       setLoading(false);
  //       handleOtpVerification(values);
  //     },
  //   });
  // };

  return {
    formik,
  };
};

export const useSendMoneyStep5Form = (handleNext, sendMoney, resMoney) => {
  // const { mutate: addSignUpPage } = useSignUp({});
console.log(sendMoney, "erdgfhh")
  const formik = useFormik({
    initialValues: {
      amount: sendMoney || "100",
      resMoney: resMoney || "0",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleNext(values);

      // handledAddRequest(values);
    },
  });

  // const handledAddRequest = (values) => {
  //   values = { ...values };
  //   addSignUpPage(values, {
  //     onSuccess: () => {
  //       setOpenModal(true);
  //       setLoading(false);
  //       handleOtpVerification(values);
  //     },
  //   });
  // };

  return {
    formik,
  };
};

export const useSendMoneyStep6Form = (handleNext, sendMoneyPaymentMethod) => {
  // const { mutate: addSignUpPage } = useSignUp({});

  const formik = useFormik({
    initialValues: {
      paymentType: sendMoneyPaymentMethod?.paymentType?.name || "payID",
      payIdNum: "",
      BSB: "",
      accountNumber: "",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleNext(values);

      // handledAddRequest(values);
    },
  });

  // const handledAddRequest = (values) => {
  //   values = { ...values };
  //   addSignUpPage(values, {
  //     onSuccess: () => {
  //       setOpenModal(true);
  //       setLoading(false);
  //       handleOtpVerification(values);
  //     },
  //   });
  // };

  return {
    formik,
  };
};
