import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Dropzone from "react-dropzone";
import Picture from "../../assets/images/doc/Picture.png";
import { fileResize } from "../../utils/image";
import { useAddDocument, useDeleteDocField } from "../../hooks/profile/User/useProfileDetails";

const DOC_URL = "https://doc-url";

const DropZoneUploadFile = ({ element, formik }) => {
  const { deleteKycBankMutation, isSuccess: isDeleteSuccess } =
    useDeleteDocField({});
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const title = element?.title;
  const documentName = element?.name;
  const { mutate } = useAddDocument({});

  useEffect(() => {
    if (formik.values?.pathArray?.length > 0) {
      const newPathObj = formik.values.pathArray.find(
        (item) => item.type === element.name
      );
      if (newPathObj) {
        setFileName(newPathObj?.type);
        if (newPathObj.path) {
          const newPath = DOC_URL + newPathObj.path;
          setFile(newPath);
        }
      }
    } else if (formik.values.path) {
      setFileName(formik.values?.documentType);
      setFile(DOC_URL + formik.values.path);
    } else if (element.imagePath) {
      setFileName(element.name);
      setFile(DOC_URL + element.imagePath);
    }
  }, [formik.values, element.name, element.imagePath]);

  const handleImage = async (acceptedFiles) => {
    const fileSize = acceptedFiles[0].size / 1024 / 1024;
    return fileSize <= 0.2
      ? acceptedFiles[0]
      : await fileResize(acceptedFiles[0]);
  };

  const handleUpload = async (acceptedFiles) => {
    const image = await handleImage(acceptedFiles);
    setFile(image);
    // formik.setFieldValue(element.name, image);
    mutate(
      { finalImage: image, file: documentName },
      {
        onSuccess: (data) => {
          // formik.resetForm();
        },
      }
    );
  };

  const handleDelete = (fileName) => {
    deleteKycBankMutation(fileName);
    setFile(null);
    formik.setFieldValue(element.name, null);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setFile(null);
      formik.setFieldValue(element.name, null);
    }
  }, [isDeleteSuccess]);

  return (
    <div style={{ width: "350px" }}>
      {title && (
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "9px",
          }}
        >
          {title}
        </Typography>
      )}
      {file !== null ? (
        <div
          style={{
            padding: "16px",
            position: "relative",
            cursor: "pointer",
          }}
          onMouseOver={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          <img
            src={typeof file === "string" ? file : URL.createObjectURL(file)}
            alt="Uploaded file"
            style={{ width: "100%", height: "auto" }}
          />
          {showDelete && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                width: "100%",
                textAlign: "end",
                padding: "10px",
                boxSizing: "border-box",
              }}
              onClick={() => handleDelete(fileName)}
            >
              <Typography variant="outlined" sx={{ color: "#ffffff" }}>
                Delete
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <Dropzone onDrop={handleUpload} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{
                padding: "16px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  border: "1px dashed #b1bfd0",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                }}
              >
                <input {...getInputProps()} />
                <img
                  src={Picture}
                  alt="Image Here"
                  style={{ marginBottom: "8px" }}
                />
                <Typography variant="h5" sx={{ marginBottom: "8px" }}>
                  Drag your image here or{" "}
                  <span style={{ fontWeight: "bold", color: "#1F4690" }}>
                    Browse
                  </span>
                </Typography>
                <Typography color="textSecondary">
                  Supports: PNG/JPG up to 1MB accepted
                </Typography>
              </div>
            </div>
          )}
        </Dropzone>
      )}
    </div>
  );
};

export default DropZoneUploadFile;
