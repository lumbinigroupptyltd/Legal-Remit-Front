import React, { useEffect, useMemo, useState } from "react";
import RenderInput from "../../../components/RenderInput/RenderInput";
import { Grid, IconButton, useTheme } from "@mui/material";
import { CButton } from "../../../components/UIElements/CButton";
import {
  USER_CITIZENSHIP_FIELD,
  USER_DOC_FIELD,
  USER_LICENSE_FIELD,
  USER_PASSPORT_FIELD,
} from "./docField";
import { useDeleteUserDocumentsDetails, useGetUserAllDocuments, useGetUserDocumentsTypeDetails } from "../../../hooks/profile/User/userDocument/useUserDocumentDetails";
import {
  useGetUserIdDetailsById,
  useGetUserIdDetailsByUserId,
} from "../../../hooks/profile/User/userId/useUserIdDetails";
import { useUserDocumentsDetailsForm } from "../../../forms/profile/user/userBasicDetailsForm";
import CustomTable from "../../../components/CustomTable/CustomTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from '@mui/icons-material/Delete';
import FormModal from "../../../components/formModal/FormModal";
import UpdateDocument from "./UpdateDocument";
import { useGetDocTypeById } from "../../../hooks/documenType/useDocumentTypeDetails";

const MyDocumentsProfile = ({ userId }) => {
  const [file, setFile] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { deleteKycBankMutation, isSuccess: isDeleteSuccess } =
  useDeleteUserDocumentsDetails({});
  const theme = useTheme();
  const { data: docTypeData } = useGetUserDocumentsTypeDetails();
  const getDocData = docTypeData && docTypeData?.data;
  const { data: userIdDetails } = useGetUserIdDetailsByUserId(userId);
  const doTypeId = userIdDetails && userIdDetails?.data?.[0]?.id;
  const { data: userIdData } = useGetUserIdDetailsById(doTypeId);
  const documentData = userIdData && userIdData?.data?.document;
  const { data: documentTypeId } = useGetDocTypeById(userIdData?.data?.documentTypeId);
console.log(documentTypeId, "doc data")
  const newDocData = getDocData
    ?.filter((item) => item?.documentTypes?.length > 0) // Filter items with non-empty documentTypes
    ?.flatMap((item) =>
      item.documentTypes.map((docType) => ({
        idDetailId: doTypeId,
        documentTypeId: docType?.id,
        docTypeName: docType?.name,
      }))
    );

  const { formik } = useUserDocumentsDetailsForm({ newDocData, documentTypeId });
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };


  const handleEditRow = (fileName) => {
    setOpenModal(true);
    setFile(fileName);
    // if (fileName) {
    //     deleteKycBankMutation({
    //       row: fileName,
    //     });
    // }
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setFile(null);
    }
  }, [isDeleteSuccess]);

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
        id: 2,
        accessorKey: "docTypeName",
        header: "New Data",
        size: 250,
        sortable: false,
      },
      {
        id: 3,
        header: "File",
        size: 250,
        Cell: (cell) => {
          const fileName = cell?.row?.original?.fileName;
          const image = fileName ? fileName : "";

          const renderImage = (src) => {
            if (src) {
              return (
                <img
                  onClick={() => handleImageRow(fileName, src)}
                  width={150}
                  src={src}
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
      {
        id: 4,
        accessorKey: "action",
        header: "Action",
        size: 100,
        sortable: false,
        Cell: (cell) => (
          <>
            <IconButton
              color="primary"
              onClick={() => handleEditRow(cell.row.original)}
            >
              <VisibilityIcon />
            </IconButton>
          </>
        ),
      },
    ],
    []
  );

  return (
    <Grid container mt={2}>
      {formik.values.documentType === "Select Document" && (
        <RenderInput inputField={USER_DOC_FIELD} formik={formik} />
      )}

      {formik.values.documentType === "Passport" && (
        <RenderInput inputField={USER_PASSPORT_FIELD} formik={formik} />
      )}

      {formik.values.documentType === "Driving License" && (
        <RenderInput inputField={USER_LICENSE_FIELD} formik={formik} />
      )}

      {formik.values.documentType === "Citizenship" && (
        <RenderInput inputField={USER_CITIZENSHIP_FIELD} formik={formik} />
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
          data={documentData}
          headerBackgroundColor={theme.palette.background.main}
          overFlow={"scroll"}
          width={"100%"}
          handleEditRow={handleEditRow}
        />
      </Grid>

      {openModal && (
        <>
        <FormModal
         open={openModal}
         onClose={() => setOpenModal(false)}
         width={700}
         height={"auto"}
         maxHeight={"80vh"}
         header={"Document Update"}
         formComponent={
             <UpdateDocument
               open={openModal}
               onClose={() => setOpenModal(false)}
               data={file}
             />
         }
       />
       </>
      )}
    </Grid>
  );
};

export default MyDocumentsProfile;
