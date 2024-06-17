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
import { useAddDirectorDetails, useEditDirectorDetails } from "../../../hooks/profile/Business/director/useDirectorDetails";
import { directorBusinessSchema, personalBusinessExtraSchema, personalBusinessSchema, shareholderBusinessSchema } from "../validation/businessValidationSchema";

export const useBasicBusinessDetailsForm = ({ data, userId }) => {
  const { mutate: addMutate } = useAddBasicBusinessDetails({});
  const { mutate: editMutate } = useEditBasicBusinessDetails({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
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
console.log(data, "data")
  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      userId: userId || "",
      companyTypeId: data?.companyTypeId || "",
      businessTypeId: data?.businessType?.id || "",
      noOfEmployee: data?.noOfEmployee || "",
      industryTypeId: data?.industryTypeId || "",
      targetBusiness: data?.targetBusiness || "",
      businessAddress: data?.businessAddress || "",
      expectedRemittance: data?.expectedRemittance || "",
      noOfTransaction: data?.noOfTransaction || "",
      website: data?.website || "",
      noOfDirectors: totalDirector || "0",
      noOfShareHolder: totalshareholder || "0",
    },
    validationSchema: personalBusinessExtraSchema,
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

export const useDirectorDetailsForm = ({ bussId, data, userId, setDirectiveModal }) => {
  const { mutate: addMutate } = useAddDirectorDetails({});
  const { mutate: editMutate } = useEditDirectorDetails({});

  const formikD = useFormik({
    initialValues: {
      id: data?.id || "",
      businessDetailId: bussId || "",
      isDirective: data?.isDirective || false,
      userId: userId,
      name: "",
      email: "",
      phoneCode: "61",
      phone: "",
      streetName: "",
      isShareHolder: false,
      suburb: "",
      zipCode: "",
      idNumber: "",
      cardNumber: "",
      dob: "",
      documentValidity: "",
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

export const useShareHolderDetailsForm = ({bussId,  data, userId, setShareModal }) => {
  const { mutate: addMutate } = useAddShareHolderDetails({});
  const { mutate: editMutate } = useEditShareHolderDetails({});

  const formikS = useFormik({
    initialValues: {
      id: data?.id || "",
      businessDetailId: bussId || "",
      isShare: data?.isShare || false,
      userId: userId,
      name: "",
      email: "",
      phoneCode: "61",
      phone: "",
      streetName: "",
      isShareHolder: true,
      suburb: "",
      zipCode: "",
      idNumber: "",
      cardNumber: "",
      dob: "",
      documentValidity: "",
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
        // formikS.setFieldValue("isShareholder", false);
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
