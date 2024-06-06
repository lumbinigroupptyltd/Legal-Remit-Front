import { useFormik } from "formik";
import {
  IdBusinessSchema,
  documentsBusinessSchema,
  kycBusinessSchema,
  personalBusinessExtraSchema,
  personalBusinessSchema,
} from "../validation/businessProfileValidation";
import {
  useBusinessDirective,
  useBusinessShare,
  useEditBusinessDirective,
  useEditBusinessShare,
  useEditPersonalBusinessExtraProfile,
  useEditPersonalBusinessProfile,
  usePersonalBusinessExtraProfile,
  usePersonalBusinessProfile,
} from "./useProfileBusinessDetails";
import { useMyDocumentsProfile } from "../User/useProfileDetails";

export const usePersonalBusinessProfileForm = ({ data, userId }) => {
  const { mutate: addMutate } = usePersonalBusinessProfile({});
  const { mutate: editMutate } = useEditPersonalBusinessProfile({});

  const formik = useFormik({
    initialValues: {
      userId: userId || "",
      firstName: data?.firstName || "",
      businessName: data?.businessName || "",
      businessAddress: data?.businessAddress || "",
      email: data?.email || "",
      phoneNumber: data?.phoneNumber || "",
      phoneCode: data?.phoneCode || "",
      regNo: data?.regNo || "",
    },
    validationSchema: personalBusinessSchema,
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
      onSuccess: () => {},
    });
  };

  return {
    formik,
  };
};

export const usePersonalBusinessProfileExtraForm = ({ businessDetailsData, userId, totalDirector, totalshareholder }) => {
  const { mutate: addMutate } = usePersonalBusinessExtraProfile({});
  const { mutate: editMutate } = useEditPersonalBusinessExtraProfile({});
  const data = businessDetailsData && businessDetailsData?.[0];
 console.log(data?.companyTypeId, "data")
  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      userId: userId || "",
      companyTypeId: data?.companyTypeId || "",
      businessTypeId: data?.businessTypeId || "",
      noOfEmployee: data?.noOfEmployee || "",
      industryTypeId: data?.industryTypeId || "",
      targetBusiness: data?.targetBusiness || "",
      businessAddress: data?.businessAddress || "",
      expectedRemittance: data?.expectedRemittance || "",
      // percentageOfShareHolding: data?.percentageOfShareHolding || "",
      noOfTransaction: data?.noOfTransaction || "",
      website: data?.website || "",
      noOfDirectors: totalDirector || "",
      noOfShareHolder: totalshareholder || "",
    },
    // validationSchema: personalBusinessExtraSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!values?.id) {
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

export const useBusinessDirectiveForm = ({
  data,
  userId,
  setDirectiveModal,
}) => {
  const { mutate: addMutate } = useBusinessDirective({});
  const { mutate: editMutate } = useEditBusinessDirective({});

  const formikD = useFormik({
    initialValues: {
      id: data?.id || "",
      isDirective: data?.isDirective || false,
      userId: userId,
      name: "",
      email: "",
      phoneCode: "61",
      phone: "",
      streetName: "",
      isShareholder: false,
      suburb: "",
      zipCode: "",
      idNumber: "",
      cardNumber: "",
      dob: "",
      documentValidity: "",
      businessDetailId: "",
      occupationId: "",
      nationalityId: "",
    },
    enableReinitialize: true,
    // validationSchema: initialValuesSchema,
    onSubmit: async (values) => {
      if (values?.id) {
        handledEditRequest(values);
      } else {
        handledAddRequest(values);
      }
    },
  });

  const handledAddRequest = async (values) => {
    values = [{...values}];
    addMutate(values, {
      onSuccess: async () => {
        formikD.resetForm();
        setDirectiveModal(false);
        formikD.setFieldValue("isDirector", false);
      },
    });
  };
  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, {
      onSuccess: () => {},
    });
  };
  return { formikD };
};

export const useBusinessShareForm = ({ data, userId, setShareModal }) => {
  const { mutate: addMutate } = useBusinessShare({});
  const { mutate: editMutate } = useEditBusinessShare({});

  const formikS = useFormik({
    initialValues: {
      id: data?.id || "",
      isShare: data?.isShare || false,
      userId: userId,
      name: "",
      email: "",
      phoneCode: "61",
      phone: "",
      streetName: "",
      isShareholder: true,
      suburb: "",
      zipCode: "",
      idNumber: "",
      cardNumber: "",
      dob: "",
      documentValidity: "",
      businessDetailId: "",
      occupationId: "",
      nationalityId: "",
    },
    enableReinitialize: true,
    // validationSchema: initialValuesSchema,
    onSubmit: async (values) => {
      if (values?.id) {
        handledEditRequest(values);
      } else {
        handledAddRequest(values);
      }
    },
  });

  const handledAddRequest = async (values) => {
    values = [{ ...values }];
    addMutate(values, {
      onSuccess: async () => {
        formikS.resetForm();
        setShareModal(false);
        formikS.setFieldValue("isShareholder", false);
      },
    });
  };
  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, {
      onSuccess: () => {},
    });
  };
  return { formikS };
};

export const useKycBusinessProfileForm = () => {
  // const {mutate: kycDetailsProfile } = useKycDetailsProfile();

  const formik = useFormik({
    initialValues: {
      nationality: "",
      houseNo: "",
      city: "",
      postal: "",
      state: "",
      occupation: "",
    },
    validationSchema: kycBusinessSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };

    // kycDetailsProfile(values, {
    //   onSuccess: async() => {
    //   }
    // });
  };

  return {
    formik,
  };
};

const filterDocTypeData = (docTypeData, values) => {
  const relevantDocNames = [
    "Front",
    "Back",
    "Driving License",
    "Passport",
    "Additional",
  ];
  return docTypeData.filter(
    (doc) =>
      relevantDocNames.includes(doc.docTypeName) && values[doc.docTypeName]
  );
};

export const useMyDocumentsBusinessForm = ({ newDocData }) => {
  const { mutate: addDocument } = useMyDocumentsProfile({});

  const formik = useFormik({
    initialValues: {
      documentType: "",
      Front: "",
      Back: "",
      Additional: "",
    },
    validationSchema: documentsBusinessSchema,
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

export const useIdBusinessProfileForm = () => {
  // const {mutate: idDetailsProfile } = useIdDetailsProfile();

  const formik = useFormik({
    initialValues: {
      authority: "",
      idType: "",
      cardNumber: "",
      idNumber: "",
      dob: "",
      dateOfExpoiry: "",
    },
    validationSchema: IdBusinessSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handledAddRequest(values);
    },
  });

  const handledAddRequest = async (values) => {
    values = { ...values };

    // idDetailsProfile(values, {
    //   onSuccess: async() => {
    //   }
    // });
  };

  return {
    formik,
  };
};
