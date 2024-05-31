import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Dropzone from "react-dropzone";
import Picture from "../../assets/images/doc/Picture.png";
import { useDeleteDocField } from "../../hooks/profile/User/useProfileDetails";
import { checkImageURL, fileResize } from "../../utils/image";
import { toast } from "react-toastify";

const DOC_URL = "https://doc-url";

const NewDropZone = ({ element, formik }) => {
  const { deleteKycDocMutation, isSuccess: isDeleteSuccess } =
    useDeleteDocField({});
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [req, setReq] = useState(true);

  const title = element?.title;

  useEffect(() => {
    checkImageURL(file).then((isImageValid) => {
      if (isImageValid) {
        setReq(false);
      } else {
        setReq(true);
      }
    });
  }, [file]);

  useEffect(() => {
    const fileKeys = Object.keys(formik.values).filter((key) =>
      key.startsWith("files-")
    );
    const filePaths = fileKeys.map((key) => formik.values[key]).filter(Boolean);

    if (filePaths.length === 0) {
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
        setFile(DOC_URL + element.imagePath);
      }
    }
  }, [formik.values, element.name, element.imagePath]);

  const handleUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      try {
        setFile(file);
          formik.setFieldValue(`${element.name}`, file);
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const handleDelete = (fileName) => {
    if (file) {
      if (!file.path) {
        deleteKycDocMutation({row: fileName});
      }
      if (formik.values.pathArray) {
        let newArray = formik.values.pathArray.map((item) => {
          if (item.type === fileName) {
            return { ...item, path: undefined };
          } else {
            return item;
          }
        });
        formik.setFieldValue("pathArray", newArray);
      }
      const fileKeys = Object.keys(formik.values).filter((key) =>
        key.startsWith("files-")
      );
      if (fileKeys) {
        fileKeys.forEach((key) => {
          formik.setFieldValue(key, "");
        });
        formik.setFieldValue(`${fileKeys}`, "");
      }
      setFile(null);
    }
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setFile(null);
    }
  }, [isDeleteSuccess]);

  return (
    <div style={{ width: isSm || isMd ? "300px" : "360px" }}>
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
            padding: "16px 0 16px 8px",
            position: "relative",
            cursor: "pointer",
            height: isSm || isMd ? "220px" : "360px",
          }}
          onMouseOver={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          <img
            src={
              typeof file === "string"
                ? `${file}?t=${new Date()}`
                : URL.createObjectURL(file)
            }
            alt="Uploaded file"
            style={{ width: "100%", height: "100%" }}
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
              <Typography variant="body1" sx={{ color: "#ffffff" }}>
                Remove
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <Dropzone
          onDrop={handleUpload}
          accept={element.accept}
          // maxSize={200 * 1024}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <div
                {...getRootProps()}
                style={{
                  padding: "16px 0 16px 8px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "90%",
                    height: "200px",
                    border: req ? "2px solid red" : "1px dashed #b1bfd0",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <input {...getInputProps()} accept={element.accept} />
                  <img
                    src={Picture}
                    alt="Image Here"
                    style={{ marginBottom: "8px" }}
                  />
                  <Typography variant="h5" sx={{ marginBottom: "8px" }}>
                    Drag your image here or
                    <span style={{ fontWeight: "bold", color: "#1F4690" }}>
                      Browse
                    </span>
                  </Typography>
                </div>
              </div>
            );
          }}
        </Dropzone>
      )}
    </div>
  );
};

export default NewDropZone;
