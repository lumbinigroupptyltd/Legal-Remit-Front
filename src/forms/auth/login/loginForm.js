import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../../../hooks/auth/login/useLogin";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: addLoginPage } = useLogin({});

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
        setLoading(true);
        handledAddRequest(values);        
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handledAddRequest = async (values) => {
    values = { ...values };
    addLoginPage(values, {
      onSuccess: async() => {
      }
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
