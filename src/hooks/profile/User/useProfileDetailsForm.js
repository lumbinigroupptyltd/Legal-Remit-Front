import { useFormik } from "formik";
import {
  IdDetailsProfileSchema,
  documentsProfileSchema,
  kycDetailsProfileSchema,
  personalDetailsSchema,
} from "../validation/userProfileValidationSchema";
import { useEditPersonalDetailsProfile, useIdDetailsProfile, useKycDetailsProfile, useMyDocumentsProfile, usePersonalDetailsProfile } from "../User/useProfileDetails";

export const usePersonalDetailsProfileForm = ({ data, userId }) => {
  // console.log(data, "data")
  const {mutate: addmutate } = usePersonalDetailsProfile({});
  const {mutate: editMutate } = useEditPersonalDetailsProfile({});

  const formik = useFormik({
    initialValues: {
      userId: userId || "",
      firstName: data?.firstName || "",
      middleName: data?.mmiddleName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      phoneNumber: data?.phoneNumber || "",
      phoneCode: data?.phoneCode || "+61",
      countryId: data?.countryID || "14",
      countryName: data?.countryName || "Australia",
    },
    validationSchema: personalDetailsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values, "values")
      if (values?.email) {
        handledEditRequest(values);
      } else {
        handledAddRequest(values);
      }
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };   
    addmutate(values, {
      onSuccess: async() => {
      }
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

export const useKycDetailsProfileForm = ({data}) => {
  const {mutate: kycDetailsProfile } = useKycDetailsProfile({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      userId: "32966",
      countryId: data?.countryId || "14",
      stateId: data?.stateId || "",
      nationalityId: data?.nationalityId || "",
      occupationId: data?.occupationId || "",
      kycStatus: data?.kycStatus || true,
      streetName: data?.streetName || "",
      suburb: data?.suburb || "",
      postalCode: data?.postalCode || "",
      occupationName: data?.occupationName || "",
      // verifiedBy: data?.verifiedBy || "",
      // kycCase: data?.kycCase || "",
      isResidence: data?.isResidence || "",
    },
    validationSchema: kycDetailsProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };
   
    kycDetailsProfile(values, {
      onSuccess: async() => {
      }
    });
  };

  return {
    formik,
  };
};

export const useMyDocumentsProfileForm = () => {
  const {mutate: addDocument } = useMyDocumentsProfile({});

  const formik = useFormik({
    initialValues: {
      documentType: "KYC",
      kycfront: "",
      kycback: "",
    },
    validationSchema: documentsProfileSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

   
  async function handleSubmit(values) {
    try {
      await addDocument(values);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  return {
    formik,
  };
};

export const useIdDetailsProfileForm = ({userData}) => {
  const {mutate: idDetailsProfile } = useIdDetailsProfile({});

  const formik = useFormik({
    initialValues: {
      id: userData?.id || "",
      issuingAuthority: userData?.issuingAuthority || "",
      typeId: userData?.typeId || "",
      documentNumber: userData?.documentNumber || "",
      cardNumber: userData?.cardNumber || "",
      dob: userData?.dob || "",
      documentValidity: userData?.documentValidity || "",
    },
    validationSchema: IdDetailsProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };
  
    idDetailsProfile(values, {
      onSuccess: async() => {
      }
    });
  };

  return {
    formik,
  };
};
