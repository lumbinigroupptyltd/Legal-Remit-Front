import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Grid, Typography, useTheme } from "@mui/material";
import Picture from "../../../assets/images/doc/Picture.png";
import { useEditUserDocumentDetails } from "../../../hooks/profile/User/userDocument/useUserDocumentDetails";
import { CButton } from "../../../components/MaterialUI/CButton";

const UpdateDocument = ({ data }) => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const { mutate } = useEditUserDocumentDetails({
    onSuccess: () => {
      setFile(null);
    },
  });

  useEffect(() => {
    if (data?.fileName) {
      setFile(data.fileName);
    }
  }, [data]);

  const handleUpload = (acceptedFiles) => {
    const image = acceptedFiles[0];
    setFile(image);
  };

  const handleDelete = () => {
    setFile(null);
  };

  const handleUpdate = () => {
    if (file) {
      mutate({ Front: file, getDocData: data });
    } else {
      // Handle case when no file is selected
      console.log("No file selected for update");
    }
  };

  return (
    <div style={{ width: "350px" }}>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "9px",
        }}
      >
        {data?.name}
      </Typography>

      {file ? (
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
              onClick={handleDelete}
            >
              <Typography variant="outlined" sx={{ color: "#ffffff" }}>
                Remove
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
          buttonName={"UPDATE"}
          OnClick={handleUpdate}
          variant={"contained"}
          Width={"fit-content"}
          TextColor={"#000"}
          TextColorHover={"#fff"}
          Border={`1px solid ${theme.palette.button.primary}`}
          BGColor={`${theme.palette.background.default}`}
          BGHover={`${theme.palette.hover.primary}`}
        />
      </Grid>
    </div>
  );
};

export default UpdateDocument;
