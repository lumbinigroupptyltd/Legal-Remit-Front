import React, { useState } from "react";
import { nanoid } from "nanoid";
import RenderInput from "../../../components/RenderInput/RenderInput";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import {
  Grid,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import FormModal from "../../../components/formModal/FormModal";
import { FormikProvider } from "formik";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { useGetBusinessTypeDetails } from "../../../hooks/profile/Business/businessType/useBusinessTypeDetails";
import { useGetCompanyTypeDetails } from "../../../hooks/companyType/useCompanyTypeDetails";
import {
  useGetBusinessDetails,
  useGetBusinessDetailsByUserId,
} from "../../../hooks/profile/Business/business/useBasicBusinessDetails";
import { useGetUserNationality } from "../../../hooks/nationality/useNationalityDetails";
import { useGetUserAllStates } from "../../../hooks/state/useStateDetails";
import { useGetAllOccupations } from "../../../hooks/occupation/useOccupationDetails";
import { useGetIndustryTypeDetails } from "../../../hooks/industryType/useIndustryTypeDetails";
import {
  useBusinessExtraDetailsForm,
  useDirectorDetailsForm,
  useShareHolderDetailsForm,
} from "../../../forms/profile/business/businessBasicDetailsForm";
import {
  useGetDirectorDetailsByBussId,
} from "../../../hooks/profile/Business/director/useDirectorDetails";
import { useGetAllCountries } from "../../../hooks/country/useCountryDetails";

const directiveCloumns = [
  {
    id: 1,
    header: "S.N.",
    Cell: (cell) => {
      return cell?.row?.index + 1;
    },
    size: 50,
    sortable: false,
  },
  {
    id: 2,
    accessorKey: "name",
    header: "Full Name",
    size: 100,
    sortable: false,
  },
  {
    id: 3,
    accessorKey: "email",
    header: "Email",
    size: 100,
    sortable: false,
  },
  {
    id: 4,
    accessorKey: "phone",
    header: "Mobile Number",
    size: 100,
    sortable: false,
  },
  {
    id: 5,
    accessorKey: "streetName",
    header: "Street Name",
    size: 100,
    sortable: false,
  },
  {
    id: 6,
    accessorKey: "suburb",
    header: "City",
    size: 100,
    sortable: false,
  },
  {
    id: 7,
    accessorKey: "zipCode",
    header: "Zip Code",
    size: 100,
    sortable: false,
  },
  {
    id: 8,
    accessorKey: "idNumber",
    header: "ID Number",
    size: 100,
    sortable: false,
  },
  {
    id: 9,
    accessorKey: "cardNumber",
    header: "Card Number",
    size: 100,
    sortable: false,
  },
  {
    id: 10,
    accessorKey: "dob",
    header: "Date of Birth",
    size: 100,
    sortable: false,
  },
  {
    id: 11,
    accessorKey: "documentValidity",
    header: "Document Validity",
    size: 100,
    sortable: false,
  },
  {
    id: 12,
    accessorKey: "businessDetailId",
    header: "Business",
    size: 100,
    sortable: false,
  },
  {
    id: 13,
    accessorKey: "occupationId",
    header: "occupation",
    size: 100,
    sortable: false,
  },
  {
    id: 14,
    accessorKey: "Nationality",
    header: "Nationality",
    size: 100,
    sortable: false,
  },
];

const BusinessDetailsExtraProfile = ({ userId }) => {
  const theme = useTheme();
  const [directiveModal, setDirectiveModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const { data: countryData } = useGetAllCountries();
  const data = countryData && countryData?.data;
  const { data: businessTypeData } = useGetBusinessTypeDetails();
  const { data: businessDetailData } = useGetBusinessDetailsByUserId(userId);
  const { data: companyTypeData } = useGetCompanyTypeDetails();
  const { data: nationalityData } = useGetUserNationality();
  const { data: allStatesData } = useGetUserAllStates();
  const { data: allOccupationsData } = useGetAllOccupations();
  const { data: industryTypeData } = useGetIndustryTypeDetails();

  const bussId = businessDetailData && businessDetailData?.data?.[0]?.id;

  const { formikD } = useDirectorDetailsForm({
    userId,
    setDirectiveModal,
    bussId,
  });
  const { formikS } = useShareHolderDetailsForm({
    userId,
    setShareModal,
    bussId,
  });

  const { data: directorBussData } = useGetDirectorDetailsByBussId(bussId);

  const handleFormDirectiveSubmit = () => {
    formikD.handleSubmit();
  };
  const handleFormShareSubmit = () => {
    formikS.handleSubmit();
  };
  const handleRemove = (remove, index, id) => {
    remove(index);
  };

  const BUSINESS_TYPE =
    businessTypeData &&
    businessTypeData?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  const COMPANY_TYPE =
    companyTypeData &&
    companyTypeData?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  const INDUSTRY_TYPE =
    industryTypeData &&
    industryTypeData?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  const GET_NATIONALITY =
    nationalityData &&
    nationalityData?.data?.map((item) => ({
      value: item.id,
      label: item.nationality,
    }));
  const GET_ALL_STATES =
    allStatesData &&
    allStatesData?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  const GET_ALL_OCCUPATIONS =
    allOccupationsData &&
    allOccupationsData?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));

  const DIRECTOR_DATA =
    directorBussData &&
    directorBussData?.data?.filter((f) => f?.isShareHolder === false);
  const SHAREHOLDER_DATA =
    directorBussData &&
    directorBussData?.data?.filter((f) => f?.isShareHolder === true);

  const totalDirector =
    DIRECTOR_DATA && DIRECTOR_DATA.length ? DIRECTOR_DATA.length : 0;
  const totalshareholder =
    SHAREHOLDER_DATA && SHAREHOLDER_DATA.length ? SHAREHOLDER_DATA.length : 0;

  const basicInputData = [
    {
      name: "companyTypeId",
      label: "Company Type",
      required: true,
      type: "dropDown",
      options: COMPANY_TYPE,
      iconStart: <PersonIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "businessTypeId",
      label: "Business Type",
      required: true,
      type: "dropDown",
      options: BUSINESS_TYPE,
      iconStart: <PersonIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "noOfEmployee",
      label: "No. Of Employees",
      required: true,
      type: "onlyNumber",
      iconStart: <PersonIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },

    {
      name: "industryTypeId",
      label: "Industry Type",
      required: true,
      type: "dropDown",
      options: INDUSTRY_TYPE,
      iconStart: <EmailIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "targetBusiness",
      label: "Target Market",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "businessAddress",
      label: "Address",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "expectedRemittance",
      label: "Expected remittance volume (AUD)/sending currency per year",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "onlyNumber",
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "noOfTransaction",
      label: "Expected No of transaction per year",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "onlyNumber",
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "noOfDirectors",
      label: "No. of Directors",
      required: true,
      isDisabled: true,
      type: "text",
      defaultValue: DIRECTOR_DATA ? DIRECTOR_DATA.length : 0,
      iconStart: <PersonIcon />,
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "noOfShareHolder",
      label: "No. Of Shareholder",
      required: true,
      type: "text",
      defaultValue: SHAREHOLDER_DATA ? SHAREHOLDER_DATA.length : 0,
      iconStart: <PersonIcon />,
      id: nanoid(),
      isDisabled: true,
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "website",
      label: "Website",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",

      id: nanoid(),
      md: 6,
      sm: 12,
    },
  ];

  const businessDetailsData = businessDetailData && businessDetailData?.data;
  const { formik } = useBusinessExtraDetailsForm({
    userId,
    totalDirector,
    totalshareholder,
    businessDetailsData,
  });
  const iconCode = data && data?.find((d) => d?.id === formik.values.countryId);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const directiveField = [
    {
      name: "countryId",
      name1: "countryName",
      name2: "phoneCode",
      label: "Select Country",
      type: "asyncDropDown",
      path: "/country/getall",
      // options: COUNTRY_SELECTED,
      iconStart: <FlagIcon />,
      id: nanoid(),
      isFLag: true,
      hasDoubleValue: true,
      required: true,
      responseLabel: "name",
      responseId: "id",
      responseCode: "phoneCode",
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "name",
      label: "Full Name",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "email",
      label: "Email",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "phone",
      label: "Mobile Number",
      required: true,
      iconStart: <SmartphoneIcon />,
      iconCode: iconCode?.phoneCode,
      type: "numWithCode",

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "percentageOfShareHolding",
      label: "Percentage Of ShareHolding",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",
      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "streetName",
      label: "Street Name",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "suburb",
      label: "City/State",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",
      options: GET_ALL_STATES,

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "zipCode",
      label: "zip code",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "idNumber",
      label: "ID Number",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "cardNumber",
      label: "Card Number",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "text",

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "dob",
      label: "Date of Birth",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "datePicker",

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "documentValidity",
      label: "Document Validity Date",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "datePicker",

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    // {
    //   name: "businessDetailId",
    //   label: "Business Detail",
    //   required: true,
    //   iconStart: <SmartphoneIcon />,
    //   type: "dropDown",
    //   options: GET_ALL_BUSINESS,

    //   id: nanoid(),
    //   md: 6,
    //   sm: 6,
    //   xs: 12,
    // },
    {
      name: "occupationId",
      label: "Occupation",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "dropDown",
      options: GET_ALL_OCCUPATIONS,

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
    {
      name: "nationalityId",
      label: "Nationality",
      required: true,
      iconStart: <SmartphoneIcon />,
      type: "dropDown",
      options: GET_NATIONALITY,

      id: nanoid(),
      md: 6,
      sm: 6,
      xs: 12,
    },
  ];

  return (
    <>
      <Grid container mt={2}>
        <RenderInput inputField={basicInputData} formik={formik} />

        <Grid container mt={2} sx={{ display: "flex" }}>
          <FormikProvider value={formikD} {...formikD}>
            <>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                display={"flex"}
                alignItems={"center"}
                style={{ paddingLeft: "0px" }}
              >
                <Typography>Add Directive Detail</Typography>
                <Switch
                  checked={formikD.values?.isDirective}
                  onChange={(e) => {
                    formikD.setFieldValue("isDirective", e.target.checked);
                    setDirectiveModal(e.target.checked);
                  }}
                />
              </Grid>
              {directiveModal && (
                <>
                  <FormModal
                    open={directiveModal}
                    onClose={() => {
                      setDirectiveModal(false);
                      formikD.setFieldValue("isDirective", false);
                    }}
                    width={"90%"}
                    height={"90dvh"}
                    header={"Add Directors"}
                    formComponent={
                      <>
                        <RenderInput
                          inputField={directiveField}
                          formik={formikD}
                        />
                        <Grid
                          item
                          mt={2}
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "end",
                            gap: "1rem",
                          }}
                        >
                          <CButton
                            buttonName={"ADD"}
                            OnClick={handleFormDirectiveSubmit}
                            variant={"contained"}
                            Width={"fit-content"}
                            TextColor={"#000"}
                            TextColorHover={"#fff"}
                            Border={`1px solid ${theme.palette.button.primary}`}
                            BGColor={`${theme.palette.background.default}`}
                            BGHover={`${theme.palette.hover.primary}`}
                          />
                        </Grid>
                        <CustomTable
                          title={"Directive Details"}
                          data={DIRECTOR_DATA}
                          columns={directiveCloumns}
                          headerBackgroundColor={theme.palette.background.main}
                          overFlow={"scroll"}
                          // handleEditRow={handleEditRow}
                        />
                      </>
                    }
                  />
                </>
              )}
            </>
          </FormikProvider>

          <FormikProvider value={formikS} {...formikS}>
            <>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                display={"flex"}
                alignItems={"center"}
                style={{ paddingLeft: "0px" }}
              >
                <Typography>Add Share Holder Detail</Typography>

                <Switch
                  checked={formikS.values?.isShare}
                  onChange={(e) => {
                    formikS.setFieldValue("isShare", e.target.checked);
                    setShareModal(e.target.checked);
                  }}
                />
              </Grid>
              {shareModal && (
                <FormModal
                  open={shareModal}
                  onClose={() => {
                    setShareModal(false);
                    formikS.setFieldValue("isShare", false);
                  }}
                  width={"85%"}
                  height={"85dvh"}
                  header={"Add Share Holder"}
                  formComponent={
                    <>
                      <RenderInput
                        inputField={directiveField}
                        formik={formikS}
                      />
                      <Grid
                        item
                        mt={2}
                        sx={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "end",
                          gap: "1rem",
                        }}
                      >
                        <CButton
                          buttonName={"ADD"}
                          OnClick={handleFormShareSubmit}
                          variant={"contained"}
                          Width={"fit-content"}
                          TextColor={"#000"}
                          TextColorHover={"#fff"}
                          Border={`1px solid ${theme.palette.button.primary}`}
                          BGColor={`${theme.palette.background.default}`}
                          BGHover={`${theme.palette.hover.primary}`}
                        />
                      </Grid>

                      <CustomTable
                        title={"Directive Details"}
                        data={SHAREHOLDER_DATA}
                        columns={directiveCloumns}
                        headerBackgroundColor={theme.palette.background.main}
                        overFlow={"scroll"}
                        // handleEditRow={handleEditRow}
                      />
                    </>
                  }
                />
              )}
            </>
          </FormikProvider>
        </Grid>

        <Grid
          item
          mt={2}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
            gap: "1rem",
          }}
        >
          <CButton
            buttonName={"Cancel"}
            // OnClick={handleCancel}
            variant={"error"}
            Width={"fit-content"}
            TextColor={`${theme.palette.text.error}`}
            TextColorHover={"#fff"}
            Border={`1px solid ${theme.palette.button.error}`}
            BGColor={`${theme.palette.background.default}`}
            BGHover={`${theme.palette.hover.error}`}
          />
          <CButton
            buttonName={businessDetailsData ? "Update" : "ADD"}
            OnClick={handleFormSubmit}
            variant={"contained"}
            Width={"fit-content"}
            TextColor={"#000"}
            TextColorHover={"#fff"}
            Border={`1px solid ${theme.palette.button.primary}`}
            BGColor={`${theme.palette.background.default}`}
            BGHover={`${theme.palette.hover.primary}`}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BusinessDetailsExtraProfile;
