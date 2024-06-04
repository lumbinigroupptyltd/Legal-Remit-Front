import { useFormik } from "formik";
import { useSignUp } from "./useSignUp";
import { signupSchema } from "./validation/signupSchema";
import { useState } from "react";
import { useOtpVerNum } from "./OTP/useOtpVerification";

const useSignUpForm = ({ setOpenModal }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: addSignUpPage } = useSignUp({});

  const formik = useFormik({
    initialValues: {
          countryId: "7b1667c4-1f1a-11ef-8765-06acd635b761",
          countryName: "Australia",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          phoneCode: "61",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          roleId: "4b0fa25e-6dd9-480f-bdd7-59247705c132",
          fullName: "",
          businessName: "",
          registrationNumber: "",
          address: "",
    },
    validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setLoading(true);
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addSignUpPage(values, {
      onSuccess: () => {
        setOpenModal(true);
        setLoading(false);
        handleOtpVerification(values);
      },
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { mutate: verifyOtp } = useOtpVerNum({
    onSuccess: (variables) => {
      // console.log(variables, "var")
      // toast.success("OTP verified successfully");
    },
  });

  const handleOtpVerification = (formData) => {
    verifyOtp({ formData });
  };

  return {
    loading,
    formik,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
  };
};

export default useSignUpForm;
