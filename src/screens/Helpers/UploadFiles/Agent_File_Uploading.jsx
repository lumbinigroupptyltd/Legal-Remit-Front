import React, { useContext,useEffect, useState } from "react";
import "./UploadFiles.css";
import  Row  from "react-bootstrap/Row";
import  Col  from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import uploadVector from '../../../assets/images/dropzoneVector.svg'
import closeVector from '../../../assets/images/close.svg'
import previewVector from '../../../assets/images/preview.svg'
import { Business } from "@mui/icons-material";
import userContext from "../../Auth/Signup/Signupdata/Usecontext";
import ModalComponent from "../../Dashbord/ModalComponent";
import { CommonConstants } from "../../../Constants/common.constants";
import PdfLogo from "../../../assets/images/pdf.png";
import axios from "axios";
const Agent_File_Uploading = ({imageData,IdType,CountryId,AdditionalDocument,Update_Step,UploadDocument}) => {
  const [selectedImagesFront, setSelectedImagesFront] = useState([]);
  const [selectedImagesBack, setSelectedImagesBack] = useState([]);
  const [selectedAdditionalImages, setSelectedAdditionalImages] = useState([]);
  
  const { setAgentDataImageFront } = useContext(userContext);
  const { setAgentDataImageBack } = useContext(userContext);

  const [selectedFileImagesFront, setSelectedFileImagesFront] = useState([]);//----------
  const [selectedFileAdditionalImages, setSelectedFileAdditionalImages] = useState([]);//----------
  const [selectedFileImagesBack, setSelectedFileImagesBack] = useState([]);//----------
  const [ImagetypeValidation, setImagetypeValidation] = useState(false);
  const [ImagesizeValidation, setImagesizeValidation] = useState(false);
  const [AdditionalIdTypePopup, setAdditionalIdTypePopup] = useState(false);
  const [AdditionalOtherTypePopup, setAdditionalOtherTypePopup] = useState(false);

  const [IdDocumentId, setIdDocumentId] = useState('')
  const [OtherIdDocumentId, setOtherIdDocumentId] = useState('')
  const [Idtypes, setIdtypes] = useState([])
  const [ImageArray, setImageArray] = useState()

  const onSelectFileFront = (event) => {
    const file = event.target.files[0]; // Get the selected file
    // Check if a file is selected
    if (file) {
      const fileName = file.name?.toLowerCase(); 
      const fileSize = file.size; 
  
      // Check file type
      const allowedExtensions = IdType == 'Passport' ? ['.png', '.jpg', '.jpeg', '.pdf']:['.png', '.jpg', '.jpeg'];
      const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
  
      if (allowedExtensions.includes(fileExtension)) {
        // const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
        // if (fileSize > maxSizeInBytes) {
        //   // alert('File size exceeds the maximum limit of 2 MB.');
        //   setImagesizeValidation(true)
        // }else{
          const selectedFiles = event.target.files;
          const selectedFilesArray = Array.from(selectedFiles);
      
          const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
          });
          const imagesFileArray = selectedFilesArray.map((file) => {
            return file;
          });

          setSelectedImagesFront(imagesArray);
          setSelectedFileImagesFront(imagesFileArray)
        // }
      }else{
        setImagetypeValidation(true)
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
        const allowedExtensions = IdType == 'Passport' ? ['.png', '.jpg', '.jpeg', '.pdf']:['.png', '.jpg', '.jpeg'];
        const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
    
        if (allowedExtensions.includes(fileExtension)) {
          const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
          // if (fileSize > maxSizeInBytes) {
          //   setImagesizeValidation(true);
          // }else{
            const selectedFiles = event.target.files;
            const selectedFilesArray = Array.from(selectedFiles);

            const imagesArray = selectedFilesArray.map((file) => {
              return URL.createObjectURL(file);
            });

            const imagesFileArray = selectedFilesArray.map((file) => {
              return file;
            });
            // console.log(selectedImagesBack, "image Array")

            setSelectedImagesBack(imagesArray);
            setSelectedFileImagesBack(imagesFileArray);
            // }
          }else{
            setImagetypeValidation(true);
          }
         }
        };

    const onSelectAdditionalFile = (event) => {
      if(IdDocumentId != ''){
        if(OtherIdDocumentId == "" && IdDocumentId == 7966){
          setAdditionalOtherTypePopup(true)
        }else{
        // const file = event.target.files[0]; // Get the selected file
        // // Check if a file is selected
        // if (file) {
        //   const fileName = file.name?.toLowerCase(); 
        //   const fileSize = file.size; 
      
        //   // Check file type
        //   const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
        //   const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
      
        //   if (allowedExtensions.includes(fileExtension)) {
        //           const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
        //           if (fileSize > maxSizeInBytes) {
        //             // alert('File size exceeds the maximum limit of 2 MB.');
        //             setImagesizeValidation(true)
        //           }else{
        //             const selectedFiles = event.target.files;
        //             const selectedFilesArray = Array.from(selectedFiles);
                
        //             const imagesArray = selectedFilesArray.map((file) => {
        //               return URL.createObjectURL(file);
        //             });
                
        //             const imagesFileArray = selectedFilesArray.map((file) => {
        //               return file;
        //             });
        //             setSelectedAdditionalImages((previousImages) => previousImages.concat(imagesArray));
        //             setSelectedFileAdditionalImages((previousImages) => previousImages.concat(imagesFileArray))
        //             // ImageArray.filter((item)=> item.id == IdDocumentId)
        //             // // ImageArray &&
        //             //   ImageArray.map((item, index) => {
        //             //     if(item.id == IdDocumentId){
        //             //       item.ImageArray.concat(imagesArray)
        //             //     }
        //             //   }
        //             //  )
                    

        //              setImageArray(prevDocuments => {
        //               // Find the document with the matching ID
        //               const updatedDocuments = prevDocuments.map(document => {
        //                 if (document.id == IdDocumentId) {
        //                   // Append the new images to the existing ImageArray
        //                   const updatedImages = [...document.ImageArray, ...imagesArray];
        //                   const updatedFile = [...document.ImageFileArray, ...imagesFileArray];
        //                   return { ...document, ImageArray: updatedImages,ImageFileArray:updatedFile };
        //                 }
        //                 return document;
        //               });
                  
        //               return updatedDocuments;
        //             });
        //           }
        //   }else{
        //     setImagetypeValidation(true)
        //   }
      
      
        // }
        const file = event.target.files[0]; // Get the selected file

        // Check if a file is selected
        if (file) {
          const fileName = file.name?.toLowerCase();
          const fileSize = file.size;
        
          // Check file type
          const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
          const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
        
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
        
              var imgfileObject = {
                ImagesArray: imagesArray,
                ImageType: event.target.files[0].name?.split('.').pop().toLowerCase(),
              };
        
        
              setSelectedAdditionalImages((previousImages) => previousImages.concat(imagesArray));
              setSelectedFileAdditionalImages((previousImages) => previousImages.concat(imagesFileArray));
        
              setImageArray((prevDocuments) => {
                const updatedDocuments = prevDocuments.map((document) => {
                  if (document.id == IdDocumentId) {
                    // Push imgfileObject as a single object, not using spread operator
                    document.ImageArray.push(imgfileObject);
                    document.ImageFileArray.push(...imagesFileArray);
                    return { ...document };
                  }
                  return document;
                });
        
                return updatedDocuments;
              });
            // }
          } else {
            setImagetypeValidation(true);
          }
        }
        
      }
        
      }else{
        // alert("Please Select Document First")
        setAdditionalIdTypePopup(true)
      }
    };

    const handleOtherDocumentName =(O_value)=>{
      setOtherIdDocumentId(O_value);
      setImageArray(prevDocuments => {
        const updatedDocuments = prevDocuments.map((document) => {
          if (document.id == IdDocumentId) {
            return {...document,OtherDocumnetName: O_value};
          }
          return document;
        });
    
        return updatedDocuments;
      });
    }

  useEffect(()=>{
    if(Update_Step=='SkipAsixthStep'){
      imageData([])
      setAgentDataImageFront()
      setAgentDataImageBack()
    }else{
      setAgentDataImageFront(selectedImagesFront)
      setAgentDataImageBack(selectedImagesBack)
      imageData(selectedFileImagesFront, selectedFileImagesBack)
    }
  },[selectedImagesFront,selectedImagesBack])

  useEffect(()=>{
    if(Update_Step=='SkipAsixthStep'){
        AdditionalDocument([])
    }if(Update_Step=='AsixthStep' && UploadDocument == true){
        AdditionalDocument([])
        setImageArray()
    }if(Update_Step=='AsixthStep'){
        AdditionalDocument(ImageArray)
    }else{
      AdditionalDocument(ImageArray)
    }
  },[ImageArray,UploadDocument,Update_Step])

  useEffect(()=>{
    if(CountryId){
      GetIdTypeByCountryId();
    }
  },[CountryId])

  const { Countrydata} = useContext(userContext);


  // console.log(ImageArray)

  const GetIdTypeByCountryId = async (values) => {
    try {
      const IdData = {
        countryId: CountryId
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactivedocuementtypebycountryid",
        IdData
      );
      if (response.data.status === true) {
        // console.log("hello")
        setIdtypes(response.data.data);
        const ImageDaetailsArray=[];
        response.data.data.map((Idtype,index)=>{
          const ImageDetails={
            id:Idtype.id,
            typeName:Idtype.name,
            OtherDocumnetName:"",
            ImageArray:[],
            ImageFileArray:[]
          }
          ImageDaetailsArray.push(ImageDetails)
        })
        // console.log(ImageDaetailsArray,"ImageDaetailsArray")
        setImageArray(ImageDaetailsArray)
      }
    } catch (err) {
      console.log(err)
    }
  };

  function deleteHandlerFront(image,index) {
    setSelectedImagesFront(selectedImagesFront.filter((e) => e !== image));
    // console.log(index,"Deleteindex")
    selectedFileImagesFront.splice(index, 1)
    URL.revokeObjectURL(image);
  }

  function deleteHandlerBack(image,index) {
    setSelectedImagesBack(selectedImagesBack.filter((e) => e !== image));
    selectedFileImagesBack.splice(index, 1)
    URL.revokeObjectURL(image);
  }

  function deleteHandlerAddtional(image,index,DocumentId) {
    URL.revokeObjectURL(image);

    setImageArray(prevDocuments => {
      const updatedDocuments = prevDocuments.map(document => {
        if (document.id == DocumentId) {
          return { ...document, ImageArray: document.ImageArray.filter((e) => e !== image)};
        }
        return document;
      });
      return updatedDocuments;
    });

    setImageArray(prevDocuments => {
      const updatedDocuments = prevDocuments.map(document => {
        if (document.id == DocumentId) {
          const IndexFile = document.ImageArray.findIndex((e) => e === image)
          document.ImageFileArray.splice(IndexFile, 1);
        }
        return document;
      });
      return updatedDocuments;
    });
  }

  return (
<>
<div className="text-center">
  <label className="text-center text-black mb-4">
    Upload Document ({IdType})
  </label>
</div>
<Row className="d-flex respoChildFooter">
  <Col>
  <div id="File_Uploading">
    <Row>
    <div className="bolder ms-2 text-black">ID front view</div>
        <Col className="col-lg-12 p-3">
        <div id={IdType == 'Passport' ? 'dropzone1':"dropzone"}>
            <div className={`text-black ${IdType == 'Passport' ? "drp22" :"drp11" }`}>
                <div className="d-flex flex-column  justify-content-center align-items-center">
                <img src={uploadVector} className="mb-3 uploaderDrop"/>
                <small className="dragrableSmall  responsiveFontLarge">Drag & Drop files here or Browse</small>
                </div>
            </div>
            <input type="file" className="required" id="imagesFront" name="images" onChange={onSelectFileFront} accept="image/png , image/jpeg, image/jpg, application/pdf" />
            </div>
        </Col>

    </Row>
    
    <section>

      <div className="images">
        {selectedImagesFront &&
          selectedImagesFront.map((image, index) => {
            return (
              <div key={image} className="image position relative">
                <div className="img-box effect-image-1">
                <img src={image} height="100" width="200" className="hoverView uploadedImage roundedCorner" alt="upload" />
                <div class="overlay simple-overlay roundedCorner">
                <div className="mainBtnClose">
                  <img src={closeVector} className="img-fluid" alt="" onClick={() => deleteHandlerFront(image,index)}/>
                </div>
                {/* <div className="cta">
          
                    <img src={previewVector} className="preview img-fluid"/>
         
                </div>  */}
                </div>
                </div>
                
              </div>
            );
          })}
      </div>
    </section>
    </div>
  </Col>

  <Col className={IdType == 'Passport' ? 'd-none' : 'd-block'}>
  <div id="File_Uploading">
    <Row className="d-flex">
    <div className="bolder ms-2 text-black">ID back view</div>
        <Col className=" col-lg-12 p-3">
        <div id="dropzone">
            <div className="text-black drp11 ">
                <div className="d-flex flex-column  justify-content-center align-items-center">
                <img src={uploadVector} className="mb-3 uploaderDrop" alt=""/>
                <small className="dragrableSmall  responsiveFontLarge">Drag & Drop files here or Browse</small>
                </div>
            </div>
            <input type="file" id="imagesBack" className="required" name="images" onChange={onSelectFileBack} accept="image/png , image/jpeg, image/jpg, application/pdf" />
            </div>
        </Col>

    </Row>
    
    <section>

      <div className="images">
        {selectedImagesBack &&
          selectedImagesBack.map((image, index) => {
            return (
              <div key={image} className="image position relative">
                {/* {".pdf".includes(image.filePath?.toLowerCase().substring(image.filePath?.toLowerCase().lastIndexOf("."))) ? (
                  <div className="pdf-logo">
                    <img
                      src={PdfLogo}
                      className="hoverView uploadedImage roundedCorner"
                      alt="pdf"
                    />
                  </div>
                ) : ( */}
                  <div className="img-box effect-image-1">
                  <img src={image} height="100" width="200" className="hoverView uploadedImage roundedCorner" alt="upload" />
                  <div class="overlay simple-overlay roundedCorner">
                  <div className="mainBtnClose">
                    <img src={closeVector} className="img-fluid" alt="" onClick={() => deleteHandlerBack(image,index)}/>
                  </div>
                  {/* <div className="cta">
            
                      <img src={previewVector} className="preview img-fluid"/>
          
                  </div>  */}
                  </div>
                  </div>
                {/* )} */}
                
              </div>
            );
          })}
      </div>
    </section>
    </div>
  </Col>
</Row>

<div className="text-center">
  <label className="text-center text-black mt-4 mb-4">
    Upload Additional Documents
  </label>
</div>

<Row className="mb-3 m-auto">
  <Form.Group
    as={Col}
    className="left-inner-addon input-container "
  >
    <Form.Select className="mainStep6Select "  onChange={(e)=>{setIdDocumentId(e.target.value)}}>
    <option value="">Select Any Documents</option>
    {
      Idtypes && Idtypes.map((ID)=>{
        return(<option value={ID.id}>{ID.name}</option>)
      })
    }
    </Form.Select>
  </Form.Group>
</Row>
<Row className={`mb-3 m-auto ${IdDocumentId == 7966 ? 'd-block' : 'd-none'}`}>
    <Form.Group
      as={Col}
      className="left-inner-addon input-container "
    >
      <i className="maroonText mainStep4 fa fa-id-card "></i>
      <Form.Control
        name="OtherDocument"
        onChange={(e)=>{
          let value = e.target.value;
          const newValue = value.replace(/[^A-Za-z]/g, '');
          handleOtherDocumentName(newValue)
        }}
        type="text"
        placeholder="Other Document Name"
        className="maroonFormStep6 required form-input"
      />
      <label htmlFor="name" className="form-label1">Other Document Name</label>
      <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
        Please Enter Other Document Name
      </small>
    </Form.Group>
  </Row>
<Row className="d-flex respoChildFooter">
  <Col>
  <div id="File_Uploading">
    <Row>
    {/* <div className="bolder ms-2 text-black">ID front view</div> */}
        <Col className="col-lg-12 p-3">
        <div id="dropzone1">
            <div className="text-black drp22 ">
                <div className="d-flex flex-column  justify-content-center align-items-center">
                <img src={uploadVector} className="mb-3 uploaderDrop" alt=""/>
                <small className="dragrableSmall  responsiveFontLarge">Drag & Drop files here or Browse</small>
                </div>
            </div>
            <input type="file" className="required" id="imagesFront" name="images" onChange={(e)=>{onSelectAdditionalFile(e)}} accept="image/png , image/jpeg, image/jpg, application/pdf" />
            </div>
        </Col>
    </Row>
    
    <section>
   
      {/* {selectedAdditionalImages.length > 0 &&
        (selectedAdditionalImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedAdditionalImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
            ''
        ))
      } */}

      <div className="d-flex flex-wrap">
      {ImageArray &&
          ImageArray.map((images, index) => {
            return (
              <>
              {images.ImageArray.length > 0 ?
              <>
              <div><b><div>{images.typeName}{images.id == 7966 ? IdDocumentId == 7966 ? '('+OtherIdDocumentId+')' : '' : ''}</div></b></div>

              <div className="images2 imageblock border rounded-2 py-2 my-2">
                {images.ImageArray &&
                  images.ImageArray.map((image, index) => {
                    return (
                      <div key={image.ImagesArray} className="image position relative">
                        {".pdf".includes(image.ImageType) ? (
                          <div className="pdf-logo effect-image-1">
                            <img
                              src={PdfLogo}
                              className="hoverView uploadedImage roundedCorner"
                              alt="pdf"
                            />
                            <div class="overlay simple-overlay roundedCorner">
                              <div className="mainBtnClose" >
                                <img src={closeVector} className="img-fluid" alt="" onClick={() => deleteHandlerAddtional(image,index,images.id)}/>
                              </div>
                            </div>
                          </div>
                        ) : ( 
                          <div className="img-box effect-image-1">
                          <img src={image.ImagesArray} height="100" width="200" className="hoverView uploadedImage roundedCorner" alt="upload" />
                          <div class="overlay simple-overlay roundedCorner">
                          <div className="mainBtnClose" >
                            <img src={closeVector} className="img-fluid" alt="" onClick={() => deleteHandlerAddtional(image,index,images.id)}/>
                          </div>
                          {/* <div className="cta">
                              <img src={previewVector} className="preview img-fluid"/>
                          </div>  */}
                          </div>
                          </div>
                         )}
                      </div>
                    );
                  })
                
                }
              </div>
              
              <hr/>
              </>
              :
             ''
              }
              </>
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
  title11={"Invalid file type , Only PNG, JPG, PDF and JPEG files are allowed."}
  onHide={() => setImagetypeValidation(false)}
/>
<ModalComponent
  show={ImagesizeValidation}
  title11={"File size exceeds the maximum limit of 2 MB."}
  onHide={() => setImagesizeValidation(false)}
/>

<ModalComponent
  show={AdditionalIdTypePopup}
  title11={"Select Document First and Upload your Documnet"}
  onHide={() => setAdditionalIdTypePopup(false)}
/>
<ModalComponent
    show={AdditionalOtherTypePopup}
    title11={"Please enter your other Document name"}
    onHide={() => setAdditionalOtherTypePopup(false)}
  />
</>
  );

};

export default Agent_File_Uploading;