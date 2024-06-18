import { useFormik } from "formik";
import {
  useAddUserKycDetails,
  useEditUserKycDetails,
} from "../../../hooks/profile/User/userKyc/useUserKycDetails";
import {
  useAddUserDocumentsDetails,
  useDeleteUserDocumentsDetails,
} from "../../../hooks/profile/User/userDocument/useUserDocumentDetails";
import {
  useAddUserIdDetails,
  useEditUserIdDetails,
} from "../../../hooks/profile/User/userId/useUserIdDetails";
import {
  useAddUserBasicUserDetails,
  useEditUserBasicUserDetails,
} from "../../../hooks/profile/User/user/useBasicUserDetails";
import {
  IdDetailsProfileSchema,
  documentsProfileSchema,
  kycDetailsProfileSchema,
  personalDetailsSchema,
} from "../validation/userValidationSchema";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { useOtpVerNum } from "../../../hooks/auth/OTP/useOtpVerification";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/logout";

export const useBasicUserDetailsDetailsForm = ({ data, userId }) => {
  const navigate = useNavigate();
  const { mutate: addMutate } = useAddUserBasicUserDetails({});
  const { mutate: editMutate } = useEditUserBasicUserDetails({});

  const [phoneChanged, setPhoneChanged] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      userId: userId || "",
      firstName: data?.firstName || "",
      middleName: data?.mmiddleName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      phoneNumber: data?.phoneNumber || "",
      phoneCode: data?.phoneCode || "+61",
      countryId: data?.countryID || "14",
      signupCompleted: data?.signupCompleted || false,

      countryName: data?.countryName || "Australia",
    },
    validationSchema: personalDetailsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (values?.email) {
        handledEditRequest(values);
      } else {
        handledAddRequest(values);
      }
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: async () => {},
    });
  };
  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, {
      onSuccess: () => {
        handlePhoneChange(values);
        handleEmailChange(values);
      },
    });
  };

  const handleEmailChange = async (values) => {
    const emailChanged = values?.email !== data?.email;
    if (emailChanged) {
      toast.success("Check your email & verify");
      navigate("/login");
      logout();
    }
  };

  const handlePhoneChange = (values) => {
    const phoneChanged = values?.phoneNumber !== data?.phoneNumber;
    if (phoneChanged) {
      handleOtpVerification(values);
      setPhoneChanged(phoneChanged);
    }
  };
  const { mutate: verifyOtp } = useOtpVerNum({
    onSuccess: (variables) => {
      // toast.success("OTP verified successfully");
    },
  });
  const handleOtpVerification = (formData) => {
    verifyOtp({ formData });
  };

  return {
    formik,
    phoneChanged,
    setPhoneChanged,
  };
};

export const useUserKycDetailsForm = ({ data, userId, countryId }) => {
  const { mutate: addMutate } = useAddUserKycDetails({});
  const { mutate: editMutate } = useEditUserKycDetails({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      userId: userId || "",
      countryId: countryId || "",
      stateId: data?.stateId || "",
      nationalityId: data?.nationalityId || "",
      occupationId: data?.occupationId || "",
      kycStatus: data?.kycStatus || "REJECTED",
      streetName: data?.streetName || "",
      suburb: data?.suburb || "",
      postalCode: data?.postalCode || "",
    },
    validationSchema: kycDetailsProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (values?.id) {
        handledEditRequest(values);
      } else {
        handledAddRequest(values);
      }
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: async () => {},
    });
  };
  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, {
      onSuccess: () => {},
    });
  };
  return {
    formik,
  };
};

const filterDocTypeData = (docTypeData, values) => {
  const relevantDocNames = ["Front", "Back", "Driving License", "Passport"];
  return docTypeData.filter(
    (doc) =>
      relevantDocNames.includes(doc.docTypeName) && values[doc.docTypeName]
  );
};
export const useUserDocumentsDetailsForm = ({ newDocData, documentTypeId }) => {
  const { mutate: addMutate } = useAddUserDocumentsDetails({});

  const formik = useFormik({
    initialValues: {
      documentType: documentTypeId?.data?.name,
      Front: "",
      Back: "",
    },
    validationSchema: documentsProfileSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    const filteredDocData = filterDocTypeData(newDocData, values);
    try {
      await addMutate({ ...values, getDocData: filteredDocData });
      // await addDocument({...values, getDocData: getDocData});
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  return {
    formik,
  };
};

export const useUserIdDetailsForm = ({ userData, userId }) => {
  const { mutate: addMutate } = useAddUserIdDetails({});
  const { mutate: editMutate } = useEditUserIdDetails({});

  const formik = useFormik({
    initialValues: {
      userId: userId || "",
      id: userData?.id || "",
      issueAuthorityId: userData?.issueAuthorityId || "",
      documentNumber: userData?.documentNumber || "",
      cardNumber: userData?.cardNumber || "",
      dob: userData?.dob || "",
      documentValidity: userData?.documentValidity || "",
      documentTypeId: userData?.documentTypeId || "",
    },
    validationSchema: IdDetailsProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (values?.id) {
        handledEditRequest(values);
      } else {
        handledAddRequest(values);
      }
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: async () => {},
    });
  };
  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, {
      onSuccess: () => {},
    });
  };

  return {
    formik,
  };
};
