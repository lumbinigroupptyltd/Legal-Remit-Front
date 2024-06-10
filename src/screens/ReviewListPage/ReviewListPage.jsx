import React, { useState, useEffect } from "react";
import "./ReviewListPage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import StarRatings from "react-star-ratings";
import { Form, Button, Row } from "react-bootstrap";
import { TextField, Box, Typography, Modal } from "@mui/material";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import ProfileLogo from '../../assets/images/defaultAvatar.png'

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%", // Adjust the width as desired
  maxWidth: "50%",
  maxHeight: "99%", // Add a maxHeight to prevent overlap and cutoff
  overflow: "auto", // Enable scrolling if the content exceeds maxHeight
  bgcolor: "#FFFFFF",
  border: "0",
  boxShadow: 24,
};
// Define your testimonial data (you can replace this with actual data)
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    position: "20/12/2023",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ipsum nec urna hendrerit blandit.",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "20/12/2023",
    comment:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    id: 3,
    name: "John Doe",
    position: "20/12/2023",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec ipsum nec urna hendrerit blandit.",
  },
  {
    id: 4,
    name: "Jane Smith",
    position: "20/12/2023",
    comment:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  // Add more testimonials as needed
];

export default function ReviewListPage() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [reviews, setReviews] = useState([]);
  const handleOpen = () => setOpen(true);
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


  const userId = localStorage.getItem('Id');
  const userName = localStorage.getItem("Uname");
  const [reviewData, setReviewData] = useState({
    name: userName,
    source: "Web",
    star: 0,
    message: "",
    createdBy: userId,
    updatedBy: userId,
  });

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
          setReviewData({
            name: "",
            source: "",
            star: 0,
            message: "",
            createdBy: 0,
            updatedBy: 0,
          });

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
  }, []);



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="abtPage">
        <NavBar />
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage py-4">
            {userId && <Button
              className="w-auto px-3 purpleBackground border-0 d-flex ms-auto m-0"
              onClick={handleOpen}
            >
              <i className="fa fa-star" /> Add Review
            </Button>}
            <div className="">
              <h2 className="bolder purpleText text-center">Reviews</h2>
              <p className="text-black text-center responsiveFontLarge first fs-6  pt-2">
                A few words from our amazing customers
              </p>
            </div>

            <Slider {...settings}>
              {reviews.map((review, index) => (
                <div class="testimonial_box-inner">
                  <div
                    key={review.id}
                    className="testimonial_box-top mt-4"
                  >
                    <div className="testimonial_box-icon">
                      <StarRatings
                        rating={review?.star}
                        className="d-flex m-auto justify-content-center my-3"
                        onChange={(newRating) =>
                          setReviewData({ ...reviewData, star: newRating })
                        }
                        starRatedColor="#E8EC28"
                        numberOfStars={5}
                        name="rating"
                        starDimension="35px"
                        starSpacing="2px"
                      />
                    </div>
                    <div className="testimonial_box-text">
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
                    <div className="testimonial_box-img">
                      <img
                        src={review?.image ? review?.image : ProfileLogo}
                        alt="profile"
                      />
                    </div>
                    <div className="testimonial_box-name">
                      <h4>{review.name}</h4>
                    </div>
                    {/* <div className="testimonial_box-job">
                      <p>{testimonial.position}</p>
                    </div> */}
                  </div>
                </div>
              ))}
            </Slider>

          </div>
        </Container>
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
                starRatedColor="#E8EC28"
                numberOfStars={5}
                name="rating"
                starDimension="35px"
                starSpacing="2px"
                changeRating={handleStarRatingChange} // Handle star rating change
              />
              {error && !reviewData.star && <small className="text-danger error_message ms-2"> Please Select Star</small>}
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
                      {error && !reviewData.message && <small className="text-danger error_message ms-2"> Please Enter Feedback</small>}
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
        <Footer />
      </section>
    </>
  );
}
