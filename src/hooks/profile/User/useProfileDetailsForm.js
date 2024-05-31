import { useFormik } from "formik";
import {
  IdDetailsProfileSchema,
  documentsProfileSchema,
  kycDetailsProfileSchema,
  personalDetailsSchema,
} from "../validation/userProfileValidationSchema";
import { useIdDetailsProfile, useKycDetailsProfile, useMyDocumentsProfile, usePersonalDetailsProfile } from "../User/useProfileDetails";

export const usePersonalDetailsProfileForm = ({ data }) => {
  // console.log(data, "data")
  // const {mutate: personalDetailsProfile } = usePersonalDetailsProfile();

  const formik = useFormik({
    initialValues: {
      firstName: data?.fName || "",
      middleName: data?.mName || "",
      lastName: data?.lName || "",
      email: data?.email || "",
      phone: data?.phone || "",
      phoneCode: data?.phoneCode || "+61",
      countryId: "14",
      countryName: data?.country || "Australia",
    },
    validationSchema: personalDetailsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };
   
    // personalDetailsProfile(values, {
    //   onSuccess: async() => {
    //   }
    // });
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
  // const {mutate: documentsProfileForm } = useMyDocumentsProfile();

  const formik = useFormik({
    initialValues: {
      kycfront: "",
      kycback: "",
    },
    validationSchema: documentsProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };
   
    // documentsProfileForm(values, {
    //   onSuccess: async() => {
    //   }
    // });
  };

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
