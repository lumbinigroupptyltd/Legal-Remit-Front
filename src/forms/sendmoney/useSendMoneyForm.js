import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { recipientCountry } from "../../redux/actions/SendMoney";

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

export const useSendMoneyStep2Form = (handleNext, values) => {
  // const { mutate: addSignUpPage } = useSignUp({});

  const formik = useFormik({
    initialValues: {
      sendMoney: "0",
      resMoney: "0",
      deliveryMethod: "",
      paymentMoethod: "",
      currency: "NPR",
      countryId: values?.countryId || "",
      countryName: values?.countryName || "",
      phoneCode: values?.phoneCode || "",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleNext(values);
     localStorage.setItem("sendMoneyCalculate", JSON.stringify(values));
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

export const useSendMoneyStep3Form = (handleNext, values) => {
  // const { mutate: addSignUpPage } = useSignUp({});

  const formik = useFormik({
    initialValues: {
      search: "",
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

export const useSendMoneyStep4Form = (handleNext, values) => {
  // const { mutate: addSignUpPage } = useSignUp({});

  const formik = useFormik({
    initialValues: {
      sendMoney: "0",
      resMoney: "0",
      deliveryMethod: "",
      paymentMoethod: "",
      countryId: values?.countryId || "",
      countryName: values?.countryName || "",
      phoneCode: values?.phoneCode || "",
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

export const useSendMoneyStep5Form = (handleNext, values) => {
  // const { mutate: addSignUpPage } = useSignUp({});

  const formik = useFormik({
    initialValues: {
      paymentType: "payID",
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

export const useSendMoneyStep6Form = (handleNext, values) => {
  // const { mutate: addSignUpPage } = useSignUp({});

  const formik = useFormik({
    initialValues: {
      paymentType: "payID",
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