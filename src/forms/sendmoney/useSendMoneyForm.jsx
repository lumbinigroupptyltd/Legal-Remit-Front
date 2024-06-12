import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { sendMoney1 } from "../../redux/actions/SendMoney";

export const useSendMoneyStep1Form = (handleNext) => {
  // const { mutate: addSignUpPage } = useSignUp({});
const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      countryId: "",
      countryName: "Australia",
      phoneCode: "",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(sendMoney1(values));
      handleNext(values);
      console.log(handleNext, "handle");
      console.log(values, "values");
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
      countryId: values?.countryId || "",
      countryName: values?.countryName || "",
      phoneCode: values?.phoneCode || "",
    },
    //   validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleNext(values);
      console.log(handleNext, "handle");
      console.log(values, "values");
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
