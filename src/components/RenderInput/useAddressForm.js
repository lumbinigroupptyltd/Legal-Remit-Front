import { useFormik } from "formik";

export const useAddressForm = (data) => {
    // const { mutate } = useAddAddress({});
    // const { handleSubmit } = useFormSubmit();
  
    const initialResponseValue =
      data?.length > 0 &&
      data?.reduce(
        (acc, d) => {
          if (d.addressType === "P") {
            acc.permanentAddress.push(d);
          }
          if (d.addressType === "T") {
            acc.temporaryAddress.push(d);
          }
          return acc;
        },
        { permanentAddress: [], temporaryAddress: [] }
      );
  
    const formik = useFormik({
      initialValues: {
        addresses:
          data?.length > 0
            ? [
                initialResponseValue?.permanentAddress?.[0],
                ...(initialResponseValue?.temporaryAddress?.length > 0
                  ? [initialResponseValue?.temporaryAddress?.[0]]
                  : []),
              ]
            : [
                {
                  country: "",
                  province: "",
                  district: "",
                  municipality: "",
                  wardNo: "",
                  tole: "",
                  // streetNo: "",
                  mobileNo: "",
                  telephoneNo: "",
                  email: "",
                  website: "",
                  longitude: "",
                  latitude: "",
                  addressType: "P",
                  perAndCurAddressSame: false,
                },
              ],
      },
    //   validationSchema: AddressSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        // if (formik.dirty) {
        const formData = { ...values };
        //   mutate(formData, {
        //     onSuccess: () => {
        //       formik.resetForm();
        //       navigate(nextFormPath());
        //     },
        //   });
        // }
        // if (formik.isValid) {
        //   navigate(nextFormPath());
        // }
        // handleSubmit(formData, formik, mutate);
      },
    });
    return { formik };
  };