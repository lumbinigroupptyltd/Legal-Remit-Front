import { useFormik } from "formik";
import {
  useAddBasicBusinessDetails,
  useEditBasicBusinessDetails,
} from "../../../hooks/profile/Business/business/useBasicBusinessDetails";
import {
  useAddBusinessExtraDetails,
  useEditBusinessExtraDetails,
} from "../../../hooks/profile/Business/businessExtra/useBasicBusinessDetailsExtraDetails";
import {
  useAddShareHolderDetails,
  useEditShareHolderDetails,
} from "../../../hooks/profile/Business/shareHolder/useShareHolderDetails";
import {
  useAddKycBusinessDetails,
  useEditKycBusinessDetails,
} from "../../../hooks/profile/Business/businessKyc/useBusinessKycDetails";
import {
  useAddBusinessDocDetails,
  useEditBusinessDocDetails,
} from "../../../hooks/profile/Business/businessDocument/useBusinessDocumentDetails";
import {
  useAddBusinessIdDetails,
  useEditBusinessIdDetails,
} from "../../../hooks/profile/Business/businessId/useBusinessIdDetails";
import { useAddDirectorDetails, useEditDirectorDetails } from "../../../hooks/profile/Business/director/useDirectorDetails";
import { IdBusinessSchema, directorBusinessSchema, documentsBusinessSchema, kycBusinessSchema, personalBusinessExtraSchema, personalBusinessSchema, shareholderBusinessSchema } from "../validation/businessValidationSchema";

export const useBasicBusinessDetailsForm = ({ data, userId }) => {
  const { mutate: addMutate } = useAddBasicBusinessDetails({});
  const { mutate: editMutate } = useEditBasicBusinessDetails({});

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

export const useBusinessExtraDetailsForm = ({
  businessDetailsData,
  userId,
  totalDirector,
  totalshareholder,
}) => {
  const { mutate: addMutate } = useAddBusinessExtraDetails({});
  const { mutate: editMutate } = useEditBusinessExtraDetails({});
  const data = businessDetailsData && businessDetailsData?.[0];

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
      noOfTransaction: data?.noOfTransaction || "",
      website: data?.website || "",
      noOfDirectors: totalDirector || "",
      noOfShareHolder: totalshareholder || "",
    },
    validationSchema: personalBusinessExtraSchema,
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

export const useDirectorDetailsForm = ({ data, userId, setDirectiveModal }) => {
  const { mutate: addMutate } = useAddDirectorDetails({});
  const { mutate: editMutate } = useEditDirectorDetails({});

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
    validationSchema: directorBusinessSchema,
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

export const useShareHolderDetailsForm = ({ data, userId, setShareModal }) => {
  const { mutate: addMutate } = useAddShareHolderDetails({});
  const { mutate: editMutate } = useEditShareHolderDetails({});

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
    validationSchema: shareholderBusinessSchema,
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

export const useKycBusinessDetailsForm = ({data, userId, countryId}) => {
  const { mutate: addMutate } = useAddKycBusinessDetails({});
  const { mutate: editMutate } = useEditKycBusinessDetails({});

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
    validationSchema: kycBusinessSchema,
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
    values = [{ ...values }];
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
  const relevantDocNames = [
    "Front",
    "Back",
    "Driving License",
    "Passport",
    "Additional",
    "Citizenship",
  ];
  return docTypeData.filter(
    (doc) =>
      relevantDocNames.includes(doc.docTypeName) && values[doc.docTypeName]
  );
};

export const useBusinessDocumentDetailsForm = ({
  newDocData,
  getDocTypeIdName,
}) => {
  const { mutate: addMutate } = useAddBusinessDocDetails({});
  const { mutate: editMutate } = useEditBusinessDocDetails({});

  const formik = useFormik({
    initialValues: {
      documentType: getDocTypeIdName?.name || "",
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
      // await addDocument({ ...values, getDocData: filteredDocData });
      addMutate(
        { ...values, getDocData: filteredDocData },
        {
          onSuccess: async () => {},
        }
      );
      // await addDocument({...values, getDocData: getDocData});
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }
  return {
    formik,
  };
};

export const useBusinessIdDetailsForm = () => {
  const { mutate: addMutate } = useAddBusinessIdDetails({});
  const { mutate: editMutate } = useEditBusinessIdDetails({});

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
