import { useFormik } from "formik";
import { IdBusinessSchema, documentsBusinessSchema, kycBusinessSchema, personalBusinessExtraSchema, personalBusinessSchema } from "../validation/businessProfileValidation";

export const usePersonalBusinessProfileForm = () => {
  // const {mutate: personalDetailsProfile } = usePersonalDetailsProfile();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      firstName: "",
      email: "",
      phone: "",
      phoneCode: "",
    },
    validationSchema: personalBusinessSchema,
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

export const usePersonalBusinessProfileExtraForm = () => {
  // const {mutate: personalDetailsProfile } = usePersonalDetailsProfile();

  const formik = useFormik({
    initialValues: {
      companyType: "",
      employees: "",
      directors: "",
      shareholder: "",
      market: "",
      remittance: "",
      trans: "",
      website: "",
    },
    validationSchema: personalBusinessExtraSchema,
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

export const useMyDocumentsBusinessForm = () => {
  // const {mutate: documentsProfileForm } = useMyDocumentsProfile();

  const formik = useFormik({
    initialValues: {
      kyc: "citizenship",
      kycback: "",
    },
    validationSchema: documentsBusinessSchema,
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
