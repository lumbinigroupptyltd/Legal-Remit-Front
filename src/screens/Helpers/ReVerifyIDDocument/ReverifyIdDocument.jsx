import React, { useContext, useEffect, useState } from "react";
import "./ReverifyIdDocument.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import uploadVector from '../../../assets/images/dropzoneVector.svg'
import closeVector from '../../../assets/images/close.svg'
import previewVector from '../../../assets/images/preview.svg'
import { Business } from "@mui/icons-material";
import userContext from "../../Auth/Signup/Signupdata/Usecontext";



const UploadFiles = ({ RunningStep, ImagessArray, imageData }) => {
  const [selectedImagesFront, setSelectedImagesFront] = useState([]);
  const [selectedImagesBack, setSelectedImagesBack] = useState([]);


  const [step5value, setstep5value] = useState();
  const [stepBackImagevalue, setstepBackImagevalue] = useState();


//   // // console.log(step5value,"hh")
//   const { setDataImage } = useContext(userContext);
//   const { setDataImageBack } = useContext(userContext);

  useEffect(() => {
    setstep5value(selectedImagesFront)
    setstepBackImagevalue(selectedImagesBack)
    // setDataImage(step5value)
    // setDataImageBack(stepBackImagevalue)
    // console.log("selectedImagesFront")
    // console.log(selectedImagesFront)
    // console.log("selectedImagesBack")
    // console.log(selectedImagesBack)
    // imageData(selectedImagesFront, selectedImagesBack)
  }, [ selectedImagesFront, selectedImagesBack])


  const onSelectFileFront = (event) => {
    // // console.log(RunningStep, "Uploading tab Running")
    // console.log(event.target.files, "HHHHHH")
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });



    setSelectedImagesFront((previousImages) => previousImages.concat(imagesArray));

    // imageData(selectedImagesFront)
  };

  const onSelectFileBack = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    // console.log(selectedImagesBack, "image Array")

    setSelectedImagesBack((previousImages) => previousImages.concat(imagesArray));

    // imageData(selectedImagesBack)
    // FOR BUG IN CHROME
    // event.target.value = "";
  };

  function deleteHandlerFront(image) {
    setSelectedImagesFront(selectedImagesFront.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  function deleteHandlerBack(image) {
    setSelectedImagesBack(selectedImagesBack.filter((e) => e !== image));
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
                <div id="dropzone">
                  <div className="text-black drp11 ">
                    <div className="d-flex flex-column  justify-content-center align-items-center">
                      <img src={uploadVector} className="mb-3 uploaderDrop" alt=""/>
                      <div className="dragrableSmall responsiveFontLarge">Drag & Drop files here or Browse</div>
                    </div>
                  </div>
                  <input type="file" className="required" name="images" onChange={onSelectFileFront} multiple accept="image/png , image/jpeg, image/webp, application/pdf, text/plain" />
                </div>
              </Col>

            </Row>

            <section>

              {selectedImagesFront.length > 0 &&
                (selectedImagesFront.length > 10 ? (
                  <p className="error">
                    You can't upload more than 10 images! <br />
                    <span>
                      please delete <b> {selectedImagesFront.length - 10} </b> of them{" "}
                    </span>
                  </p>
                ) : (
                  ''
                ))}

              <div className="images">
                {selectedImagesFront &&
                  selectedImagesFront.map((image, index) => {
                    return (
                      <div key={image} className="image position relative">
                        <div className="img-box effect-image-1">
                          <img src={image} height="100" width="200" className="hoverView uploadedImage roundedCorner" alt="upload" />
                          <div class="overlay simple-overlay roundedCorner">
                            <div className="mainBtnClose" onClick={() => deleteHandlerFront(image)}>
                              <img src={closeVector} className="img-fluid" alt=""/>
                            </div>
                            <div className="cta">

                              <img src={previewVector} className="preview img-fluid" alt=""/>

                            </div>
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

        <Col>
          <div id="File_Uploading">
            <Row className="d-flex">
              <div className="bolder ms-2 text-black">ID back view</div>
              <Col className=" col-lg-12 p-3">
                <div id="dropzone">
                  <div className="text-black drp11 ">
                    <div className="d-flex flex-column  justify-content-center align-items-center">
                      <img src={uploadVector} className="mb-3 uploaderDrop" alt=""/>
                      <small className="dragrableSmall   responsiveFontLarge">Drag & Drop files here or Browse</small>
                    </div>
                  </div>
                  <input type="file" id="image" className="required" name="images" onChange={onSelectFileBack} multiple accept="image/png , image/jpeg, image/webp, application/pdf, text/plain" />
                </div>
              </Col>

            </Row>

            <section>

              {selectedImagesBack.length > 0 &&
                (selectedImagesBack.length > 10 ? (
                  <p className="error">
                    You can't upload more than 10 images! <br />
                    <span>
                      please delete <b> {selectedImagesBack.length - 10} </b> of them{" "}
                    </span>
                  </p>
                ) : (
                  ''
                ))}

              <div className="images">
                {selectedImagesBack &&
                  selectedImagesBack.map((image, index) => {
                    return (
                      <div key={image} className="image position relative">
                        <div className="img-box effect-image-1">
                          <img src={image} height="100" width="200" className="hoverView uploadedImage roundedCorner" alt="upload" />
                          <div class="overlay simple-overlay roundedCorner">
                            <div className="mainBtnClose" onClick={() => deleteHandlerBack(image)}>
                              <img src={closeVector} className="img-fluid" alt=""/>
                            </div>
                            <div className="cta">

                              <img src={previewVector} className="preview img-fluid" alt=""/>

                            </div>
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

    </>
  );
};

export default UploadFiles;