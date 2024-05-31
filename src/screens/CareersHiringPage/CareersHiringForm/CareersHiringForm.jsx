import React, { useCallback, useState } from "react";
import "./CareersHiringForm.scss";
import NavBar from "../../Home/Navbar/Navbar";
import Footer from "../../Home/Footer/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { CommonConstants } from "../../../Constants/common.constants";
import PdfLogo from '../../../assets/images/pdf.png'

export default function CareersHiringForm(props) {
  const [error, setError] = useState(false);
  const [applicationId, setApplicationId] = useState(props.location.state);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    file: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      const alphabeticValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((formData) => ({
        ...formData,
        [name]: alphabeticValue,
      }));
      return;
    }
    if (name == "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((formData) => ({
        ...formData,
        [name]: numericValue,
      }));
      return;
    }
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    // Validation logic
    const errors = {};
    // First Name and Last Name validation
    const nameRegex = /^[A-Za-z]+$/;
    if (!formData.firstName) {
      errors.firstName = "Please enter valid First Name";
    }
    if (!filePreview) {
      setError(true);
    }
    if (!formData.lastName) {
      errors.lastName = "Please enter valid Last Name";
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      errors.email = "Please enter valid email address ";
    }
    const regex = /^[0-9]+$/;
    // Phone Number validation
    if (!formData.phoneNumber || formData.phoneNumber.length <= 5) {
      setError(true);
      errors.phoneNumber = "Please enter valid phone number "
    }
    setErrors(errors);
    // If there are errors, set them in the state
    if (Object.keys(errors).length === 0 && filePreview && formData.phoneNumber) {
      const gropData = new FormData();
      gropData.append("data", JSON.stringify({
        "careerId": applicationId,
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "email": formData.email,
        "phone": formData.phoneNumber
      })

      );
      gropData.append("resume", selectedFile);
      const applySendData = await axios.post(CommonConstants.BASE_URL + "/savecareersapplicants", gropData);
      if (applySendData.data.status == true) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        });
        setFilePreview(null);
      }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Handle dropped files and set the selected file
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);

      // If you want to set a preview, you can keep your existing code here
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf, image/*", // Accept PDF and image files
  });

  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage">
            <h2 className="bolder purpleText text-center">Easy Apply</h2>
            <div>
              <p className="responsiveFontLarge text-justify first text-black fs-6 my-3">
                If you find yourself suitable for the position, please apply for
                the job. Please provide all supportive documents to us at this
                stage.
              </p>

              <div className="">
                <Form.Group controlId="formFileLg" className="mb-3 respoChildFooter pbSt">
                  <div
                    {...getRootProps()}
                    className="dropzone py-5"
                    style={{
                      border: "2px dashed #ccc",
                      borderRadius: "4px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input {...getInputProps()} />
                    <p className="mb-0 px-3">
                      Drag and drop a file here, or click to select a file
                    </p>
                    {filePreview &&
                      (
                        <img
                          src={filePreview.startsWith("data:image/") ? filePreview : PdfLogo}
                          alt="Preview"
                          style={{ maxWidth: "100%", maxHeight: "65px" }}
                        />
                      )
                    }
                  </div>
                  {error && !filePreview && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Upload your CV Or Resume </small>}
                </Form.Group>
              </div>
              {/* <div className="d-flex justify-content-end">
                <Button
                  className="btn btn-default purpleBackground text-white w-auto px-3 d-flex ms-auto mt-2"
                // type="submit"
                >
                  Upload
                </Button>
              </div> */}
            </div>
            <div className=" mt-3">
              <div className="border p-2 rounded-3">
                <div className="headerCareer px-2">
                  <div className="d-flex justify-content-between medium headerTableCareer my-2  pb-3">
                    <div className="fs-5 jobTitle purpleText">
                      Personal Information
                    </div>
                  </div>
                  <Form >
                    <Row className="mb-3 respoChildFooter pbSt">
                      <Form.Group as={Col} controlId="formGridEmail" className="pbSt">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          onChange={handleChange}
                          value={formData.firstName}
                          isInvalid={!!errors.firstName}
                        />
                        {!formData.firstName && <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>}
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          onChange={handleChange}
                          value={formData.lastName}
                          isInvalid={!!errors.lastName}
                        />
                        {!formData.lastName && <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>}
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter pbSt">
                      <Form.Group as={Col} controlId="formGridPassword" className="pbSt">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          value={formData.email}
                          isInvalid={!!errors.email}
                          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          onChange={handleChange}
                          value={formData.phoneNumber}
                          isInvalid={!!errors.phoneNumber}
                        />
                        {error &&
                          (!formData.phoneNumber ||
                            formData.phoneNumber.length < 6 ||
                            !/^\d+$/.test(formData.phoneNumber)) && (
                            <Form.Control.Feedback type="invalid">
                              {errors.phoneNumber}
                            </Form.Control.Feedback>
                          )}
                      </Form.Group>
                    </Row>

                    <Button
                      className="btn btn-default purpleBackground text-white w-auto px-3 d-flex ms-auto mt-2"
                      onClick={() => handleSubmit()}
                    >
                      Apply
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
