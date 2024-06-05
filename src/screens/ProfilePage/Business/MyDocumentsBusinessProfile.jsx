import React, { useMemo } from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { nanoid } from "nanoid";
import { Grid, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { useMyDocumentsBusinessForm } from "../../../hooks/profile/Business/useProfileDetailsBusinessForm";
import { Additional_FIELD, License_FIELD, Passport_FIELD, userKycBussDocField, userKycDocField } from "../User/docField";
import { useGetDocTypeDetails, useGetUserIdDetails } from "../../../hooks/profile/User/useProfileDetails";
import CustomTable from "../../../components/CustomTable/CustomTable";

const DOCUMENT_OPTIONS = [
  { id: nanoid(), label: "Lisence", value: "lisence" },
  { id: nanoid(), label: "Passport", value: "passport" },
  { id: nanoid(), label: "Additional", value: "additional" },
];

const MyDocumentsBusinessProfile = ({ userId }) => {
  const theme = useTheme();
  const { data: docTypeData } = useGetDocTypeDetails();
  const getDocData = docTypeData && docTypeData?.data;
  
  const { data: userIdDetails } = useGetUserIdDetails(userId);
  const doTypeId = userIdDetails && userIdDetails?.data?.[0]?.id;

  const newDocData = getDocData
  ?.filter((item) => item?.documentTypes?.length > 0) // Filter items with non-empty documentTypes
  ?.flatMap(
    ( item ) =>
      item.documentTypes.map((docType) => ({
        idDetailsId: doTypeId,
        documentTypeId: docType?.id,
        docTypeName: docType?.name,
      }))
    );
    
    const { formik } = useMyDocumentsBusinessForm({ newDocData });
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const data = [
    {
      id: 1,
      value: "hello"
    },
    {
      id: 2,
      value: "hello"
    }
  ]
  const columns = useMemo(
    () => [
      {
        id: 1,
        accessorKey: 'data',
        header: 'New Data',
        size: 100,
        sortable: false,
      },
      {
        id: 2,
        accessorKey: 'value',
        header: 'Value',
        size: 100,
        sortable: false,
      },
    ],
    []
  );

  return (
    <Grid container mt={2}>
      {formik.values.documentType === "" && (
        <RenderInput inputField={userKycBussDocField} formik={formik} />
      )}

      {formik.values.documentType === "Passport" && (
        <RenderInput inputField={Passport_FIELD} formik={formik} />
      )}

      {formik.values.documentType === "Driving License" && (
        <RenderInput inputField={License_FIELD} formik={formik} />
      )}
       {formik.values.documentType === "additional" && (
        <RenderInput inputField={Additional_FIELD} formik={formik} />
      )}
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
          buttonName={"ADD"}
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

      <Grid>
      <CustomTable
      title='Documents'
      columns={columns}
      data={data}
      exportAsCSV
      exportAsPdf
      enablePagination={false}
      enableEditing={false}
      enableColumnResizing={false}
      enableColumnActions={false}
      enableColumnFilters={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      headerBackgroundColor='#401686'
      headerColor={theme.palette.text.alt}
      enableRowNumbers={true}
    />
      </Grid>
    </Grid>
  );
};

export default MyDocumentsBusinessProfile;
