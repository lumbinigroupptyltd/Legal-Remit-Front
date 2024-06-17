import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useChangeOtpNumber, useGetOtpVerify, useOtpVerNum, useResendOtpVerNum } from "../../../hooks/auth/OTP/useOtpVerification";
import { ausMobileNumber } from "../../../Constants/RegExp";

export const otpSchema = Yup.object().shape({
  phone: Yup.string()
  .required("Mobile Number is required")
  .matches(
    ausMobileNumber,
    "Mobile Number must start with 0 or 4 & must have 10 or 9 digits respectively"
  )
  .max(10, "Mobile Number must be at most 10 digits"),
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
      // onClose();
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
  const { userIdData } = useSelector((state) => state.auth);

  const { mutate: addSignUpPage } = useChangeOtpNumber({});

  const formik = useFormik({
    initialValues: {
      phone: "",
      phoneCode: "61",
      userIdData: userIdData || "",
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
        handleOtpSend(values);
        onClose();
      },
    });
  };

  const { mutate: sendOtp } = useOtpVerNum({
    onSuccess: (variables) => {
      // toast.success("OTP verified successfully");
    },
  });

  const handleOtpSend = (formData) => {
    const updatedFormData = {
      ...formData,
      phoneNumber: formData.phone
    };
    sendOtp({ formData: updatedFormData });
  };

  return { formik };
};
