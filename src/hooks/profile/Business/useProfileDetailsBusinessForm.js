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

export const usePersonalBusinessProfileExtraForm = ({ data, userId }) => {
  const { mutate: addMutate } = usePersonalBusinessExtraProfile({});
  const { mutate: editMutate } = useEditPersonalBusinessExtraProfile({});
  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      userId: userId || "",
      companyTypeId: "",
      noOfEmployee: "",
      industryTypeId: "",
      targetBusiness: "",
      expectedRemittance: "",
      noOfTransaction: "",
      website: "",
      noOfDirectors: "",
      noOfShareHolder: "",
    },
    validationSchema: personalBusinessExtraSchema,
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
      directive:
        data?.directive?.length > 0
          ? data?.directive
          : [
              {
                name: "",
                email: "",
                phoneCode: "",
                streetName: "",
                suburb: "",
                zipCode: "",
              },
            ],
    },
    enableReinitialize: true,
    // validationSchema: initialValuesSchema,
    onSubmit: async (values) => {
      console.log(values, "values");
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
      onSuccess: async () => {
        setDirectiveModal(false);
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
      isShareholder: data?.isShareholder || false,
      shareHolder:
        data?.shareHolder?.length > 0
          ? data?.shareHolder
          : [
              {
                name: "",
                email: "",
                phoneCode: "",
                streetName: "",
                suburb: "",
                zipCode: "",
              },
            ],
    },
    enableReinitialize: true,
    // validationSchema: initialValuesSchema,
    onSubmit: async (values) => {
      console.log(values, "values");
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
      onSuccess: async () => {
        setShareModal(false);
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
  console.log({ docTypeData, values }); // Log the inputs for debugging
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

    console.log(filteredDocData, "filteredDocData");
    // console.log(values?.front?.name, "values")
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
