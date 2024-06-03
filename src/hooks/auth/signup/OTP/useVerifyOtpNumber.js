import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useChangeOtpNumber, useGetOtpVerify, useOtpVerNum, useResendOtpVerNum } from "./useOtpVerification";
import { useSelector } from "react-redux";

export const otpSchema = Yup.object().shape({
  change_phone_verify_number: Yup.string().required("Number is required"),
});

export const useOtpVerNumForm = (onClose) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useOtpVerNum({});

  // const formik = useFormik({
  //   initialValues: {
  //       phone: "",
  //   },
    // enableReinitialize: true,
  //   onSubmit: (values) => {
  //     handledAddRequest(values);
  //   },
  // });

  const handleVerification = (values) => {
    const {  otp } = values;
    setLoading(true);
    mutate({ otp }, { onSettled: () => {
      setLoading(false)
      onClose();
    } });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return {
    // formik,
    loading,
    handleMouseDownPassword,
    handleVerification,
  };
};

export const useFinalOtpVerNumForm = (onClose) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useGetOtpVerify({});

  // const formik = useFormik({
  //   initialValues: {
  //       phone: "",
  //   },
    // enableReinitialize: true,
  //   onSubmit: (values) => {
  //     handledAddRequest(values);
  //   },
  // });

  const handleVerification = (values) => {
    const {  otp } = values;
    setLoading(true);
    mutate({ otp }, { onSettled: () => {
      setLoading(false)
      onClose();
    } });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return {
    // formik,
    loading,
    handleMouseDownPassword,
    handleVerification,
  };
};

export const useResendOtpVerNumForm = () => {
  const [load, setLoad] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const { otpData } = useSelector((state) => state.auth);

  const { mutate } = useResendOtpVerNum({});

  const handleResendVerification = () => {
    
    mutate(
      { otpData },
      {
        onSuccess: () => {
          setResetTimer(true);
          setTimeout(() => {
            setResetTimer(false);
          }, 5000);
        },
      },
      { onError: () => setResetTimer(false) },
      {
        onSettled: () => setLoad(false),
      }
    );
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return {
    handleResendVerification,
    load,
    resetTimer,
    handleMouseDownPassword,
  };
};

export const useChangeOtpNumberForm = (onClose) => {
  const { mutate: addSignUpPage } = useChangeOtpNumber({});

  const formik = useFormik({
    initialValues: {
      change_phone_verify_number: "",
    },
    validationSchema: otpSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addSignUpPage(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return { formik };
};
