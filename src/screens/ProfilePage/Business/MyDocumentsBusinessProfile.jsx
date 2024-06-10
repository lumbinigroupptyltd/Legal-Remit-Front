import React, { useMemo } from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { Grid, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { DOC_URL } from "../../../utils/getBaseUrl";
import AttachmentIcon from "@mui/icons-material/Attachment";
import {
  BUSS_Additional_FIELD,
  BUSS_CITIZENSHIP_FIELD,
  BUSS_LICENSE_FIELD,
  BUSS_PASSPORT_FIELD,
} from "../User/docField";
import { useBusinessDocumentDetailsForm } from "../../../forms/profile/business/businessBasicDetailsForm";
import { useGetBusinessIdDetailsByUserId } from "../../../hooks/profile/Business/businessId/useBusinessIdDetails";
import { useGetBusinessDocTypeByDocId, useGetBusinessDocTypeDetails } from "../../../hooks/profile/Business/businessDocument/useBusinessDocumentDetails";

const BUSS_DOC_FIELD = [
  {
    name: "documentType",
    label: "Select Document Type",
    md: 12,
    sm: 12,
    xs: 12,
    required: true,
    type: "dropDown",
    iconStart: <AttachmentIcon />,
    options: [
      { id: 1, value: "Passport", label: "Passport" },
      { id: 2, value: "Driving License", label: "Driving License" },
      { id: 3, value: "Citizenship", label: "Citizenship" },
      { id: 4, value: "Additional", label: "Additional" },
    ],
  },
];

const MyDocumentsBusinessProfile = ({ userId }) => {
  const theme = useTheme();
  const { data: docTypeData } = useGetBusinessDocTypeDetails();
  const getDocData = docTypeData && docTypeData?.data;

  const { data: userIdDetails } = useGetBusinessIdDetailsByUserId(userId);
  const doTypeId = userIdDetails && userIdDetails?.data?.[0];
  const docTypeId = doTypeId && doTypeId?.documentTypeId;

  const { data: getDocTypeIdData } = useGetBusinessDocTypeByDocId(docTypeId);
  const getDocTypeIdName = getDocTypeIdData && getDocTypeIdData?.data;
  const newDocData = getDocData
    ?.filter((item) => item?.documentTypes?.length > 0)
    ?.flatMap((item) =>
      item.documentTypes.map((docType) => ({
        idDetailId: doTypeId?.id,
        documentTypeId: docType?.id,
        docTypeName: docType?.name,
      }))
    );

  const { formik } = useBusinessDocumentDetailsForm({
    newDocData,
    getDocTypeIdName,
  });
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const data = [
    {
      id: 1,
      value: "hello",
    },
    {
      id: 2,
      value: "hello",
    },
  ];

  const columns = useMemo(
    () => [
      {
        id: 1,
        header: "S.N.",
        Cell: (cell) => {
          return cell?.row?.index + 1;
        },
        size: 100,
        sortable: false,
      },
      {
        id: 1,
        accessorKey: "data",
        header: "New Data",
        size: 250,
        sortable: false,
      },
      {
        id: 2,
        accessorKey: "value",
        header: "Value",
        size: 250,
        sortable: false,
      },
      {
        id: 3,
        header: "File",
        size: 250,
        Cell: (cell) => {
          const image =
            (cell?.row?.original?.path &&
              `${DOC_URL}${cell?.row?.original?.path}?t=${new Date()}`) ||
            "";
          const renderImage = (src) => {
            if (src) {
              return (
                <img
                  onClick={() => handleImageRow(cell.row.original, src)}
                  width={100}
                  src={`${src}?t=${new Date()}`}
                  alt=""
                />
              );
            }
            return null;
          };
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              {renderImage(image)}
            </div>
          );
        },
        sortable: false,
      },
    ],
    []
  );

  return (
    <>
      <Grid container mt={2}>
        {formik.values.documentType === "" && (
          <RenderInput inputField={BUSS_DOC_FIELD} formik={formik} />
        )}

        {formik.values.documentType === "Passport" && (
          <RenderInput inputField={BUSS_PASSPORT_FIELD} formik={formik} />
        )}

        {formik.values.documentType === "Driving License" && (
          <RenderInput inputField={BUSS_LICENSE_FIELD} formik={formik} />
        )}
        {formik.values.documentType === "Citizenship" && (
          <RenderInput inputField={BUSS_CITIZENSHIP_FIELD} formik={formik} />
        )}
        {formik.values.documentType === "Additional" && (
          <RenderInput inputField={BUSS_Additional_FIELD} formik={formik} />
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

        <Grid item xs={12} md={12} lg={12}>
          <CustomTable
            title={"Documents"}
            columns={columns}
            data={data}
            headerBackgroundColor={theme.palette.background.main}
            overFlow={"scroll"}
            width={"100%"}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MyDocumentsBusinessProfile;
