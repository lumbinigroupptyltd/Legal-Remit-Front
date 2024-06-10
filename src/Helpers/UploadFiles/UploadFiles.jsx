import React, { useState, useEffect } from "react";
import "./UploadFiles.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import uploadVector from "../../assets/images/dropzoneVector.svg";
import closeVector from "../../assets/images/close.svg";
import previewVector from "../../assets/images/preview.svg";
import ModalComponent from "../../screens/Dashbord/ModalComponent";
import PdfLogo from "../../assets/images/pdf.png";

const UploadFiles = ({ RefimageData }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFileImagesFront, setSelectedFileImagesFront] = useState([]); //----------
  const [ImageType, setImageType] = useState("");
  const [ImagetypeValidation, setImagetypeValidation] = useState(false);
  const [ImagesizeValidation, setImagesizeValidation] = useState(false);
  // const onSelectFile = (event) => {
  //   const selectedFiles = event.target.files;
  //   const selectedFilesArray = Array.from(selectedFiles);

  //   const imagesArray = selectedFilesArray.map((file) => {
  //     return URL.createObjectURL(file);
  //   });

  //   setSelectedImages((previousImages) => previousImages.concat(imagesArray));

  //   // FOR BUG IN CHROME
  //   event.target.value = "";
  // };

  function deleteHandler(image, index) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    selectedFileImagesFront.splice(index, 1);
    URL.revokeObjectURL(image);
  }

  const onSelectFile = (event) => {
    const file = event.target.files[0]; // Get the selected file
    // Check if a file is selected
    if (file) {
      const fileName = file.name.toLowerCase();
      const fileSize = file.size;
      // Check file type
      const allowedExtensions = [".png", ".jpg", ".jpeg", ".pdf"];
      const fileExtension = fileName.substring(fileName.lastIndexOf("."));
      if (allowedExtensions.includes(fileExtension)) {
        const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
        if (fileSize > maxSizeInBytes) {
          setImagesizeValidation(true);
        } else {
          const selectedFiles = event.target.files;
          const selectedFilesArray = Array.from(selectedFiles);

          setImageType(
            event.target.files[0].name?.split(".").pop().toLowerCase()
          );

          const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
          });

          const imagesFileArray = selectedFilesArray.map((file) => {
            return file;
          });

          setSelectedImages(imagesArray);
          setSelectedFileImagesFront(imagesFileArray);
        }
      } else {
        setImagetypeValidation(true);
      }
    }
  };

  useEffect(() => {
    RefimageData(selectedFileImagesFront);
  }, [selectedFileImagesFront]);

  return (
    <>
      <Row>
        <Col className="col-lg-12 p-3">
          <div id="dropzone">
            <div className="text-black drp11 ">
              <div className="d-flex flex-column  justify-content-center align-items-center">
                <img src={uploadVector} className="mb-3 uploaderDrop" alt="" />
                <small className="dragrableSmall">
                  Drag & Drop files here or Browse
                </small>
              </div>
            </div>
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              // multiple
              accept="image/png , image/jpeg, image/webp, application/pdf, text/plain"
            />
          </div>
        </Col>
      </Row>

      <section>
        {/* {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
            ''
        ))} */}

        <div className="images">
          {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                <div key={image} className="image position relative">
                  {".pdf".includes(ImageType) ? (
                    <div className="pdf-logo effect-image-1">
                      <img
                        src={PdfLogo}
                        className="hoverView uploadedImage roundedCorner"
                        alt="pdf"
                      />
                      <div class="overlay simple-overlay roundedCorner">
                        <div className="mainBtnClose">
                          <img
                            src={closeVector}
                            className="img-fluid"
                            alt=""
                            onClick={() => deleteHandler(image, index)}
                          />
                        </div>
                        {/* <div className="cta">
                              <img src={previewVector} className="preview img-fluid"/>
                          </div>  */}
                      </div>
                    </div>
                  ) : (
                    <div className="img-box effect-image-1">
                      <img
                        src={image}
                        height="100"
                        width="200"
                        className="hoverView uploadedImage roundedCorner"
                        alt="upload"
                      />
                      <div class="overlay simple-overlay roundedCorner">
                        <div
                          className="mainBtnClose"
                          onClick={() => deleteHandler(image, index)}
                        >
                          <img src={closeVector} className="img-fluid" alt="" />
                        </div>
                        <div className="cta">
                          <img
                            src={previewVector}
                            className="preview img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                      {/* <div className="cta">
                  <div className="">
                    <img src={previewVector} className="previewimg-fluid"/>
                  </div>
                </div> */}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </section>
      <ModalComponent
        show={ImagetypeValidation}
        title11={
          "Invalid file type , Only PNG, JPG, PDF and JPEG files are allowed."
        }
        onHide={() => setImagetypeValidation(false)}
      />
      <ModalComponent
        show={ImagesizeValidation}
        title11={"File size exceeds the maximum limit of 2 MB."}
        onHide={() => setImagesizeValidation(false)}
      />
    </>
  );
};

export default UploadFiles;
