import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import uploadVector from "../../assets/images/dropzoneVector.svg";
import {Col, Row} from "react-bootstrap";
import "./UploadFiles.css";
import closeVector from "../../assets/images/close.svg";

const FileUpload = ({allowedExtensions, onFilesSelected, type}) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImagesBack, setSelectedImagesBack] = useState([]);

    const onDrop = useCallback((acceptedFiles, isBack = false) => {
        const selectedFilesArray = Array.from(acceptedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        if (isBack) {
            setSelectedImagesBack(imagesArray);
        } else {
            setSelectedImages(imagesArray);
        }

        onFilesSelected(selectedFilesArray, isBack);
    }, [onFilesSelected]);

    const deleteHandler = (image, isBack = false) => {
        if (isBack) {
            setSelectedImagesBack(selectedImagesBack.filter((e) => e !== image));
        } else {
            setSelectedImages(selectedImages.filter((e) => e !== image));
        }
        URL.revokeObjectURL(image);
    };

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (files) => onDrop(files, false),
        accept: allowedExtensions.join(",")
    });
    const {
        getRootProps: getRootPropsBack,
        getInputProps: getInputPropsBack
    } = useDropzone({onDrop: (files) => onDrop(files, true), accept: allowedExtensions.join(",")});

    return (
        <Row className="d-flex respoChildFooter">
            <Col>
                <Row>
                    <div className="bolder ms-2 text-black">ID front view</div>
                    <Col className="col-lg-12 p-3">

                        <div id="dropzone"  {...getRootProps()}
                             className={type === 'passport' ? 'dropzone1 drp22' : 'dropzone drp11'}>
                            <input {...getInputProps()} />
                            <div className="d-flex flex-column  justify-content-center align-items-center">
                                <img src={uploadVector} className="mb-3 uploaderDrop" alt=""/>
                                <small className="dragrableSmall  responsiveFontLarge">Drag & Drop files here or
                                    Browse</small>
                            </div>
                        </div>

                        <div className="images">
                            {selectedImages.map((image) => (
                                <div key={image} className="image position relative">
                                    <div className="img-box effect-image-1">
                                        <img src={image} height="100" width="200"
                                             className="hoverView uploadedImage roundedCorner" alt="upload"/>
                                        <div className="overlay simple-overlay roundedCorner">
                                            <div className="mainBtnClose">
                                                <img src={closeVector} className="img-fluid" alt=""
                                                     onClick={() => deleteHandler(image, false)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Col>
            {type === 'passport' && (
                <Col>
                    <Row>
                        <div className="bolder ms-2 text-black">ID back view</div>
                        <Col className="col-lg-12 p-3">

                            <div id="dropzone"  {...getRootProps()}
                                 className={type === 'passport' ? 'dropzone1 drp22' : 'dropzone drp11'}>
                                <input {...getInputProps()} />
                                <div className="d-flex flex-column  justify-content-center align-items-center">
                                    <img src={uploadVector} className="mb-3 uploaderDrop" alt=""/>
                                    <small className="dragrableSmall  responsiveFontLarge">Drag & Drop files here or
                                        Browse</small>
                                </div>
                            </div>

                            <div className="images">
                                {selectedImages.map((image) => (
                                    <div key={image} className="image position relative">
                                        <div className="img-box effect-image-1">
                                            <img src={image} height="100" width="200"
                                                 className="hoverView uploadedImage roundedCorner" alt="upload"/>
                                            <div className="overlay simple-overlay roundedCorner">
                                                <div className="mainBtnClose">
                                                    <img src={closeVector} className="img-fluid" alt=""
                                                         onClick={() => deleteHandler(image, true)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Col>
            )}
        </Row>
    );
};

export default FileUpload;
