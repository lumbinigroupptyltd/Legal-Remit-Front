import React, { useContext, useEffect, useState } from "react";
import "./UploadFiles.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import uploadVector from "../../../assets/images/dropzoneVector.svg";
import closeVector from "../../../assets/images/close.svg";
import previewVector from "../../../assets/images/preview.svg";
import { Business } from "@mui/icons-material";
import userContext from "../../Auth/Signup/Signupdata/Usecontext";
import ModalComponent from "../../Dashbord/ModalComponent";

const DirectororSharHolderUploadFileDocument = ({
  I_UserIdType,
  imageData,
}) => {
  const [selectedImagesFront, setSelectedImagesFront] = useState([]);
  const [selectedImagesBack, setSelectedImagesBack] = useState([]);

  const [selectedFileImagesFront, setSelectedFileImagesFront] = useState([]); //----------
  const [selectedFileImagesBack, setSelectedFileImagesBack] = useState([]); //----------

  const [step5value, setstep5value] = useState();
  const [stepBackImagevalue, setstepBackImagevalue] = useState();

  const [ImagetypeValidation, setImagetypeValidation] = useState(false);
  const [ImagesizeValidation, setImagesizeValidation] = useState(false);

  // // console.log(step5value,"hh")
  //   const { setDataImage } = useContext(userContext);
  //   const { setDataImageBack } = useContext(userContext);

  useEffect(() => {
    setstep5value(selectedImagesFront);
    setstepBackImagevalue(selectedImagesBack);
    imageData(selectedFileImagesFront, selectedFileImagesBack);
    //   setDataImage(step5value)
    //   setDataImageBack(stepBackImagevalue)
  }, [selectedImagesFront, selectedImagesBack, I_UserIdType]);

  const onSelectFileFront = (event) => {
    const file = event.target.files[0]; // Get the selected file
    // Check if a file is selected
    if (file) {
      const fileName = file.name?.toLowerCase();
      const fileSize = file.size;
      // Check file type
      const allowedExtensions =
        I_UserIdType == "Passport"
          ? [".png", ".jpg", ".jpeg", ".pdf"]
          : [".png", ".jpg", ".jpeg"];
      const fileExtension = fileName.substring(fileName.lastIndexOf("."));
      if (allowedExtensions.includes(fileExtension)) {
        // const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
        // if (fileSize > maxSizeInBytes) {
        //   setImagesizeValidation(true);
        // } else {
          const selectedFiles = event.target.files;
          const selectedFilesArray = Array.from(selectedFiles);

          const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
          });

          const imagesFileArray = selectedFilesArray.map((file) => {
            return file;
          });

          setSelectedImagesFront(imagesArray);
          setSelectedFileImagesFront(imagesFileArray);
        // }
      } else {
        setImagetypeValidation(true);
      }
    }
  };

  const onSelectFileBack = (event) => {
    const file = event.target.files[0]; // Get the selected file
    // Check if a file is selected
    if (file) {
      const fileName = file.name?.toLowerCase();
      const fileSize = file.size;
      // Check file type
      const allowedExtensions =
        I_UserIdType == "Passport"
          ? [".png", ".jpg", ".jpeg", ".pdf"]
          : [".png", ".jpg", ".jpeg"];
      const fileExtension = fileName.substring(fileName.lastIndexOf("."));
      if (allowedExtensions.includes(fileExtension)) {
        // const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
        // if (fileSize > maxSizeInBytes) {
        //   setImagesizeValidation(true);
        // } else {
          const selectedFiles = event.target.files;
          const selectedFilesArray = Array.from(selectedFiles);

          const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
          });

          const imagesFileArray = selectedFilesArray.map((file) => {
            return file;
          });

          setSelectedImagesBack(imagesArray);
          setSelectedFileImagesBack(imagesFileArray);
        // }
      } else {
        setImagetypeValidation(true);
      }
    }
  };

  function deleteHandlerFront(image, index) {
    setSelectedImagesFront(selectedImagesFront.filter((e) => e !== image));
    console.log(index, "Deleteindex");
    selectedFileImagesFront.splice(index, 1);
    URL.revokeObjectURL(image);
  }

  function deleteHandlerBack(image, index) {
    setSelectedImagesBack(selectedImagesBack.filter((e) => e !== image));
    selectedFileImagesBack.splice(index, 1);
    URL.revokeObjectURL(image);
  }

  return (
    <>
      <Row className="d-flex respoChildFooter">
        <Col>
          <div id="File_Uploading">
            <Row>
              <div className="bolder ms-2 text-black">ID front view</div>
              <Col className="col-lg-12 p-3">
                <div id={I_UserIdType == "Passport" ? "dropzone1" : "dropzone"}>
                  <div
                    className={`text-black ${
                      I_UserIdType == "Passport" ? "drp22" : "drp33"
                    }`}
                  >
                    <div className="d-flex flex-column  justify-content-center align-items-center">
                      <img src={uploadVector} className="mb-3 uploaderDrop11" alt=""/>
                      <small className="dragrableSmall  responsiveFontLarge fs-6">
                        Drag & Drop files here or Browse
                      </small>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="required"
                    id="imagesFront"
                    name="images"
                    onChange={onSelectFileFront}
                    
                    accept="image/png , image/jpeg, image/jpg, application/pdf"
                  />
                </div>
              </Col>
            </Row>

            <section>
              {selectedImagesFront.length > 0 &&
                (selectedImagesFront.length > 10 ? (
                  <p className="error">
                    You can't upload more than 10 images! <br />
                    <span>
                      please delete <b> {selectedImagesFront.length - 10} </b>{" "}
                      of them{" "}
                    </span>
                  </p>
                ) : (
                  ""
                ))}

              <div className="images">
                {selectedImagesFront &&
                  selectedImagesFront.map((image, index) => {
                    return (
                      <div key={image} className="image position relative">
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
                              
                            >
                              <img src={closeVector} className="img-fluid" alt="" onClick={() => deleteHandlerFront(image, index)}/>
                            </div>
                            {/* <div className="cta">
                              <img
                                src={previewVector}
                                className="preview img-fluid"
                              />
                            </div> */}
                          </div>
                          {/* <div className="cta">
                  <div className="">
                    <img src={previewVector} className="previewimg-fluid"/>
                  </div>
                </div> */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          </div>
        </Col>

        <Col className={I_UserIdType == "Passport" ? "d-none" : "d-block"}>
          <div id="File_Uploading1">
            <Row className="d-flex">
              <div className="bolder ms-2 text-black">ID back view</div>
              <Col className=" col-lg-12 p-3">
              <div id={I_UserIdType == "Passport" ? "dropzone1" : "dropzone"}>
                  <div
                    className={`text-black ${
                      I_UserIdType == "Passport" ? "drp22" : "drp33"
                    }`}
                  >
                    <div className="d-flex flex-column  justify-content-center align-items-center">
                      <img src={uploadVector} className="mb-3 uploaderDrop11"alt="" />
                      <small className="dragrableSmall  responsiveFontLarge fs-6">
                        Drag & Drop files here or Browse
                      </small>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="required"
                    id="imagesFront"
                    name="images"
                    onChange={onSelectFileBack}
                    
                    accept="image/png , image/jpeg, image/jpg, application/pdf"
                  />
                </div>
              </Col>
            </Row>

            <section>
              {selectedImagesBack.length > 0 &&
                (selectedImagesBack.length > 10 ? (
                  <p className="error">
                    You can't upload more than 10 images! <br />
                    <span>
                      please delete <b> {selectedImagesBack.length - 10} </b> of
                      them{" "}
                    </span>
                  </p>
                ) : (
                  ""
                ))}

              <div className="images">
                {selectedImagesBack &&
                  selectedImagesBack.map((image, index) => {
                    return (
                      <div key={image} className="image position relative">
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
                              
                            >
                              <img src={closeVector} className="img-fluid" alt="" onClick={() => deleteHandlerBack(image, index)} />
                            </div>
                            {/* <div className="cta">
                              <img
                                src={previewVector}
                                className="preview img-fluid"
                              />
                            </div> */}
                          </div>
                          {/* <div className="cta">
                  <div className="">
                    <img src={previewVector} className="previewimg-fluid"/>
                  </div>
                </div> */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          </div>
        </Col>
      </Row>

      {/* ------------------------------------------ */}
      <ModalComponent
        show={ImagetypeValidation}
        title11={
          I_UserIdType == "Passport"
            ? "Invalid file type , Only PNG, JPG, PDF and JPEG files are allowed."
            : "Invalid file type , Only PNG, JPG, and JPEG files are allowed."
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

export default DirectororSharHolderUploadFileDocument;
