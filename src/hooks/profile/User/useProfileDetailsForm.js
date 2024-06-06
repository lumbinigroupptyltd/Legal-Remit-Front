import { useFormik } from "formik";
import {
  IdDetailsProfileSchema,
  documentsProfileSchema,
  kycDetailsProfileSchema,
  personalDetailsSchema,
} from "../validation/userProfileValidationSchema";
import { useEditIdDetailsProfile, useEditKycDetailsProfile, useEditPersonalDetailsProfile, useIdDetailsProfile, useKycDetailsProfile, useMyDocumentsProfile, usePersonalDetailsProfile } from "../User/useProfileDetails";

export const usePersonalDetailsProfileForm = ({ data, userId }) => {
 
  const {mutate: addMutate } = usePersonalDetailsProfile({});
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
      signupCompleted: data?.signupCompleted || false,
      countryName: data?.countryName || "Australia",
    },
    validationSchema: personalDetailsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values, "values")
      if (values?.email) {
        console.log(values)
        handledEditRequest(values);
      } else {
        handledAddRequest(values);
      }
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };   
    addMutate(values, {
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

export const useKycDetailsProfileForm = ({data, userId, countryId}) => {
  const {mutate: addMutate } = useKycDetailsProfile({});
  const {mutate: editMutate } = useEditKycDetailsProfile({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      userId: userId || "",
      countryId: countryId || "",
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


const filterDocTypeData = (docTypeData, values) => {
  const relevantDocNames = ['Front', 'Back', 'Driving License', 'Passport'];
  return docTypeData.filter(doc => 
    relevantDocNames.includes(doc.docTypeName) && values[doc.docTypeName]
  );
};
export const useMyDocumentsProfileForm = ({newDocData}) => {
  const {mutate: addDocument } = useMyDocumentsProfile({});

  const formik = useFormik({
    initialValues: {
      documentType: "",
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
      await addDocument({ ...values, getDocData: filteredDocData });
      // await addDocument({...values, getDocData: getDocData});
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  return {
    formik,
  };
};

export const useIdDetailsProfileForm = ({userData, userId}) => {
  const {mutate: addMutate } = useIdDetailsProfile({});
  const {mutate: editMutate } = useEditIdDetailsProfile({});

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
