// import React, { useState } from "react";
// import "../../../assets/assets/scss/pages/Clients.scss";
// import Container from "react-bootstrap/Container";
// import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";
// import Row from "react-bootstrap/Row";
// import Card from "react-bootstrap/Card";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import Button from "react-bootstrap/Button";
// import quat from "../../../assets/images/quatation.svg";
// import user from "../../../assets/images/user.svg";
// import Button1 from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Avatar from "@mui/material/Avatar";
// import TextField from "@mui/material/TextField";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import { Form } from "react-bootstrap";
//  import StarRatings from "react-star-ratings";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "30%",
//   maxWidth: "50%",
//   maxHeight: "99%",
//   overflow: "auto",
//   bgcolor: "#FFFFFF",
//   border: "0",
//   boxShadow: 24,

// };

// export default function Clients({ children }) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [image, setImage] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [review, setReview] = useState("");

//   const handleFullNameChange = (event) => {
//     setFullName(event.target.value);
//   };

//   const handleReviewChange = (event) => {
//     setReview(event.target.value);
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setImage(file);
//   };

//   const handleSubmit = () => {

//   };

//   const options = {
//     loop: true,
//     margin: 10,
//     items: 1,
//     autoplay: true,
//   };

//   const lgBreakpoint = 992;
//   const mdBreakpoint = 768;

//   const windowWidth = window.innerWidth;

//   return (
//     <>
//       <section className="clients-main  purpleLIghtShade py-5">
//         <Container className=" responsiveMainForMobile">
//           <Row className="text-center">
//           </Row>

//           <OwlCarousel className="owl-theme mt-4 pb-4 " {...options}>
//             <Row className="d-flex justify-content-evenly pb-4">
//               <Col className="col-lg-5 py-3 cardTestinomial position-relative responsiveMainForMobile">
//                   <Image src={quat} alt="dd" className="quatation" />
//                   <div className="innerAboutSecond mt-4">
//                     <div className="mainImage d-flex">
//                       <Image
//                         src={user}
//                         alt="dghd"
//                         className="w-25 img-fluid usr"
//                       />
//                       <div className="d-flex flex-column justify-content-center ms-4">
//                         <span className="pb-2 purpleText medium fs-6">
//                         John doe
//                         </span>
//                         <StarRatings
//                   className="d-flex m-auto justify-content-center my-3"
//                              rating={3}
//                              starRatedColor="#E8EC28"
//                              numberOfStars={5}
//                              name="rating"
//                              starDimension="35px"
//                              starSpacing="2px"
//                            />
//                       </div>
//                     </div>
//                     <div className="text-justify ms-3 mt-3">
//                       <small className="responsiveFontLarge  blackShade medium pt-3 mt-3">
//                         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                         Vestibulum quis ipsum ac dui sagittis
//                       </small>
//                     </div>
//                   </div>

//               </Col>
//               {windowWidth >= mdBreakpoint && (
//                 <Col className="col-lg-5 cardTestinomial py-3 position-relative responsiveMainForMobile">
//                     <Image src={quat} alt="dd" className="quatation" />
//                     <div className="innerAboutSecond mt-4">
//                       <div className="mainImage d-flex">
//                         <Image
//                           src={user}
//                           alt="dghd"
//                           className="w-25 img-fluid usr"
//                         />
//                         <div className="d-flex flex-column justify-content-center ms-4">
//                           <span className="pb-2 purpleText medium fs-6">
//                             John doe
//                           </span>
//                           <StarRatings
//                   className="d-flex m-auto justify-content-center my-3"
//                              rating={3}
//                              starRatedColor="#E8EC28"
//                              numberOfStars={5}
//                              name="rating"
//                              starDimension="35px"
//                              starSpacing="2px"
//                            />
//                         </div>
//                       </div>
//                       <div className="text-justify ms-3 mt-3">
//                         <small className="responsiveFontLarge  blackShade medium pt-3 mt-3">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit. Vestibulum quis ipsum ac dui sagittis{" "}
//                         </small>
//                       </div>
//                     </div>

//                 </Col>
//               )}
//             </Row>
//           </OwlCarousel>
//         </Container>
//           <Row className="d-flex m-auto justify-content-center ">
//             <Button
//               className="w-auto px-3 purpleBackground border-0 "
//               onClick={handleOpen}
//             >
//               <i className="fa fa-star" /> Add Review
//             </Button>
//           </Row>
//         <Modal
//           className="pt-0"
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={modalStyle} className="py-3 px-3 overflow-auto">
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               <div className="innerModalbody">
//                 <div className="left-arrow pointer" onClick={handleClose}>
//                   <i className="fa fa-close fa-1x text-black text-end ms-auto d-block" />
//                 </div>
//                 <div className="bg-transparent innerBoxChild d-flex align-items-start">
//                   <div className="personal-image d-block m-auto">
//                     <label className="label">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                       />
//                       <figure
//                         className="personal-figure p-0 m-0"
//                         height="130"
//                         width="130"
//                       >
//                         <div>
//                           <img
//                             className="personal-avatar"
//                             height="130"
//                             width="130"
//                             src={
//                               image
//                                 ? URL.createObjectURL(image)
//                                 : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/avatar-bg.png"
//                             }
//                           />
//                         </div>

//                         {/* <img
//                         src="https://avatars1.githubusercontent.com/u/11435231?s=460&v=4"
//                         className="personal-avatar"
//                         height="130"
//                         width="130"
//                         alt="avatar"
//                       /> */}
//                         <div className="BackgroundInfo translate-middle-y  rounded-circle avatar-edit m-2">
//                           <i className="fa fa-pencil "></i>
//                         </div>
//                       </figure>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </Typography>

//             <div className="innerBodyModal px-4">
//             <StarRatings
//                   className="d-flex m-auto justify-content-center my-3"
//                              rating={3}
//                              starRatedColor="#E8EC28"
//                              numberOfStars={5}
//                              name="rating"
//                              starDimension="35px"
//                              starSpacing="2px"
//                            />

//               <Form className="mt-3">

//                 <Row className="mt-4">
//                   <div className="d-flex">
//                     <div className="w-100">
//                       <TextField
//                         multiline
//                         rows={4}
//                         cols={50}
//                         className="mb-4 w-100"
//                         label={<span className="purpleText">Write Your Feedback</span>}
//                         id="outlined-basic" variant="outlined"
//                         color="info"
//                         // value={review}
//                         // onChange={handleReviewChange}
//                       />
//                     </div>
//                   </div>
//                 </Row>

//                   <div className="d-flex align-items-center justify-content-between">
//                     <Button
//                       className="d-block m-auto w-auto px-3 purpleBackground border-0 medium"
//                       onClick={handleOpen}
//                     >
//                       <i className="fa fa-check" /> Submit Review
//                     </Button>
//                   </div>

//               </Form>
//             </div>
//           </Box>
//         </Modal>
//       </section>
//     </>
//   );
// }

// {Dynamic code}

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../assets/assets/scss/pages/Clients.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import "../../../assets/assets/scss/pages/Clients.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import quat from "../../../assets/images/quatation.svg";
import StarRatings from "react-star-ratings";
import { Form } from "react-bootstrap";
import default_avatar from "../../../assets/images/defaultAvatar.png";
import { CommonConstants } from "../../../Constants/common.constants";
import { Bounce } from "react-awesome-reveal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "60%", md: "40%", lg: "30%" },
  maxWidth: "100%",
  maxHeight: "99%",
  overflow: "auto",
  bgcolor: "#FFFFFF",
  border: "0",
  boxShadow: 24,
};

export default function Clients({ children, index }) {
  const [contentHeight, setContentHeight] = useState("auto");
  const [open, setOpen] = React.useState(false);
  const [reviews, setReviews] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com";
  const apiKey = "AIzaSyCNJRR1zkMpq2RLpT6bM2BLAO2kEDZ8qtA";
  const [showFullMessage, setShowFullMessage] = useState(
    new Array(reviews.length).fill(false)
  );

  const toggleMessage = (index) => {
    const updatedShowFullMessage = [...showFullMessage];
    updatedShowFullMessage[index] = !updatedShowFullMessage[index];
    setShowFullMessage(updatedShowFullMessage);
  };

  const userId = localStorage.getItem("Id");
  const userName = localStorage.getItem("Uname");
  const [reviewData, setReviewData] = useState({
    name: userName,
    source: "Web",
    star: 0,
    message: "",
    createdBy: userId, // Assuming this will be set based on the logged-in user
    updatedBy: userId, // Assuming this will be set based on the logged-in user
  });

  const options = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    style: {
      margin: "0 10px",
    },
  };

  //   const handleFullNameChange = (event) => {
  //   setFullName(event.target.value);
  // };

  // const handleReviewChange = (event) => {
  //   setReview(event.target.value);
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const handleStarRatingChange = (newRating) => {
    setReviewData({ ...reviewData, star: newRating });
  };

  const submitReview = async () => {
    try {
      if (!reviewData.message || !reviewData.star) {
        setError(true);
      } else {
        const formData = new FormData();
        formData.append("data", JSON.stringify(reviewData));
        formData.append("image", image);
        // Make the POST request
        const response = await axios.post(
          CommonConstants.BASE_URL + "/savereview",
          formData
        );
        if (response.data.status === true) {
          handleClose();
          setImage(null);
          fetchReviews();
        } else {
        }
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      // alert("An error occurred while submitting the review.");
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallreview",
        {
          pageindex: 1,
          pagesize: 50,
          searchdata: "",
          sortparam: "created_at",
          sortorder: "DESC",
        }
      );

      if (response.data.status === true) {
        setReviews(response.data.data);
      } else {
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    if (!showFullMessage) {
      // Calculate the height of the content
      const contentElement = document.getElementById(`review-content-${index}`);
      if (contentElement) {
        const contentHeight = contentElement.offsetHeight;
        if (contentHeight > 150) {
          setContentHeight("150px");
        }
      }
    } else {
      setContentHeight("auto");
    }
  }, [showFullMessage, index]);

  const lgBreakpoint = 992;
  const mdBreakpoint = 768;

  const windowWidth = window.innerWidth;

  return (
    <>
      <section className="clients-main  purpleLIghtShade py-5">
        <Container className=" responsiveMainForMobile">
          <Row className="text-center">
            <Bounce duration={2000}>
              <h2 className="responsiveFontLargeHeading abtBefore purpleText bolder pb-2">
                Clients words
              </h2>
              <h1 className="responsiveFontLargeMedium text-center d-inline-block justify-content-center m-auto">
                What our clients say1
              </h1>
            </Bounce>
          </Row>

          <Slider className="owl-theme mt-4 pb-4 " {...options}>
            {reviews.map((review, index) => (
              <div key={index} className=" pb-4">
                <Col className="col-lg-10 cardTestinomial py-3 position-relative responsiveMainForMobile">
                  <div className='shake-element' duration={2000}>
                    <Image src={quat} alt="dd" className="quatation" />
                    <div className="innerAboutSecond mt-4">
                      <div className="mainImage d-flex">
                        {review.image ? (
                          <Image
                            src={review.image}
                            className="rounded-circle"
                            height={80}
                            width={80}
                          />
                        ) : (
                          <img
                            src={default_avatar}
                            alt="Default Avatar"
                            className="rounded-circle"
                            height={80}
                            width={80}
                          />
                        )}
                        <div className="d-flex flex-column justify-content-center ms-4">
                          <span className="pb-2 purpleText medium">
                            {review?.name}
                          </span>
                          <StarRatings
                            rating={review?.star}
                            starRatedColor="#f39c12"
                            numberOfStars={5}
                            name="rating"
                            starDimension="20px"
                            starSpacing="2px"
                            onChange={(newRating) =>
                              setReviewData({ ...reviewData, star: newRating })
                            }
                          />
                        </div>
                      </div>
                      <div className="text-justify ms-2 mt-3">
                        <small
                          className="responsiveFontLarge  blackShade medium pt-3 mt-3"
                          id={`review-content-${index}`}
                        >
                          {showFullMessage[index]
                            ? review?.message
                            : `${review?.message.slice(0, 30)}...`}
                        </small>
                        {review?.message.length > 30 && (
                          <span
                            className="purpleText cursor-pointer"
                            onClick={() => toggleMessage(index)}
                          >
                            {showFullMessage[index] ? "Read Less" : "Read More"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
            ))}
          </Slider>
        </Container>
        {userId && (
          <Row className="d-flex m-auto justify-content-center ">
            <Button
              className="w-auto px-3 purpleBackground border-0 "
              onClick={handleOpen}
            >
              <i className="fa fa-star" /> Add Review
            </Button>
          </Row>
        )}

        <Modal
          className="pt-0"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle} className="py-3 px-3 overflow-auto">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="innerModalbody">
                <div className="left-arrow pointer" onClick={handleClose}>
                  <i className="fa fa-close fa-1x text-black text-end ms-auto d-block" />
                </div>
                <div className="bg-transparent innerBoxChild d-flex align-items-start">
                  <div className="personal-image d-block m-auto">
                    <label className="label">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <figure
                        className="personal-figure p-0 m-0"
                        height="130"
                        width="130"
                      >
                        <div>
                          <img
                            className="personal-avatar"
                            height="130"
                            width="130"
                            src={
                              image
                                ? URL.createObjectURL(image)
                                : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/avatar-bg.png"
                            }
                          />
                        </div>

                        {/* <img
                        src="https://avatars1.githubusercontent.com/u/11435231?s=460&v=4"
                        className="personal-avatar"
                        height="130"
                        width="130"
                        alt="avatar"
                      /> */}
                        <div className="BackgroundInfo translate-middle-y  rounded-circle avatar-edit m-2">
                          <i className="fa fa-pencil "></i>
                        </div>
                      </figure>
                    </label>
                  </div>
                </div>
              </div>
            </Typography>

            <div className="innerBodyModal px-4">
              <StarRatings
                className="d-flex m-auto justify-content-center my-3"
                rating={reviewData.star}
                starRatedColor="#f39c12"
                starHoverColor="#f39c12"
                numberOfStars={5}
                name="rating"
                starDimension="35px"
                starSpacing="2px"
                changeRating={handleStarRatingChange} // Handle star rating change
              />
              {error && !reviewData.star && (
                <small className="text-danger error_message ms-2">
                  {" "}
                  Please Select Star
                </small>
              )}

              <Form className="mt-3">
                <Row className="mt-4">
                  <div className="d-flex">
                    <div className="w-100">
                      <TextField
                        multiline
                        rows={4}
                        cols={50}
                        className="mb-4 w-100"
                        label={
                          <span className="purpleText">
                            Write Your Feedback
                          </span>
                        }
                        id="outlined-basic"
                        variant="outlined"
                        color="info"
                        value={reviewData.message}
                        onChange={(e) =>
                          setReviewData({
                            ...reviewData,
                            message: e.target.value,
                          })
                        }
                      />
                      {error && !reviewData.message && (
                        <small className="text-danger error_message ms-2">
                          {" "}
                          Please Enter Feedback
                        </small>
                      )}
                    </div>
                  </div>
                </Row>

                <div className="d-flex align-items-center justify-content-between">
                  <Button
                    className="d-block m-auto w-auto px-3 purpleBackground border-0 medium"
                    onClick={submitReview}
                  >
                    <i className="fa fa-check" /> Submit Review
                  </Button>
                </div>
              </Form>
            </div>
          </Box>
        </Modal>
      </section>
    </>
  );
}
