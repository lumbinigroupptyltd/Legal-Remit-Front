import React, { useEffect, useState } from "react";
import "./BlogsDetailsPage.scss";
import NavBar from "../../Home/Navbar/Navbar";
import Footer from "../../Home/Footer/Footer";
import { Container, Row, Tab, Tabs, Col, Nav } from "react-bootstrap";
import mission from "../../../assets/images/mission.svg";
import vision from "../../../assets/images/vision.svg";
import objective from "../../../assets/images/objective.svg";
import flight from "../../../assets/images/flight.svg";
import lumbi from "../../../assets/images/notice.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CommonConstants } from "../../../Constants/common.constants";
import moment from "moment";

export default function BlogsDetailsPage(props) {
  const navigate = useNavigate();
  const [id, setId] = useState(props.location.state);
  const [blogData, setBlogData] = useState({});
  const blogsDetailsPage = () => {
    //navigating to Home
    navigate("/blogsdetailspage");
    window.scrollTo(0, 0);
  };
  const GetBlogDetils = async () => {
    const sendData = {
      "blogid": id,
      "userid": 0
    }
    const getData = await axios.post(CommonConstants.BASE_URL + '/getblogbyid', sendData);
    if (getData.data.status == true) {
      setBlogData(getData.data.data[0]);
    }
  }
  useEffect(() => {
    GetBlogDetils();
  }, [])
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage">
            <h2 className="bolder purpleText text-center">Blog Details</h2>

            <div className=" pt-1 container">
              <div className="mt-5 responsivePadding row">
                <div className="col-lg-12  col">
                  <div className="mt-0  card shadow-none">
                  <img
  src={blogData?.image}
  className="img-fluid rounded-1"
  
  alt="Blog Image" // Add an alt attribute for accessibility
/>
                    <div className="innerCardBlogsa py-4">
                      <span className="innerClipColor text-start pb-2 d-flex responsivePadding ms-auto justify-content-end">
                        <small className="px-1">
                          <small className="  ps-2 innerClipColor purpleText">
                            <i className="fa fa-eye  innerClipColor pe-1 purpleText" />{" "}
                            {blogData?.totalViewsCount}
                          </small>
                        </small>
                        <small className="px-1">
                          <small className="  ps-2 innerClipColor purpleText">
                            <i className="fa fa-calendar  innerClipColor pe-1 purpleText" />{" "}
                            {moment(blogData?.createdAt).format('MMMM DD, YYYY')}
                          </small>
                        </small>
                      </span>
                      <span />
                      <div className="bolder text-start py-3 pb-0 responsivePadding card-title h5">
                        <h4 className="purpleText">
                          {blogData?.title}
                        </h4>
                      </div>
                      <hr />
                      <section className="bg-white mainCursor">
                        <div className="container">
                          <div className="py-5 pt-0 responsivePadding row">
                            <div className="col-lg-12 responsivePadding px-0 col">
                              <div className="first">
                                <div className="imgBG d-flex " />
                                <div className="col-lg-12 px-0">
                                  <div className="col-lg-12 px-0">
                                    <div className="innerSecondSection mt-1 d-flex ">
                                      <h5 className="text-start">
                                        Introduction
                                      </h5>
                                    </div>
                                    <ol className="mt-2 px-0">
                                      <li>
                                        <div className=" d-flex justifyText normal">
                                          {blogData?.description}
                                        </div>
                                      </li>
                                      {/* <li className="mt-2">
                                        <div className=" d-flex justifyText normal">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit, sed do
                                          eiusmod tempor incididunt ut labore et
                                          dolore magna aliqua. Ut enim ad minim
                                          veniam, quis nostrud exercitation
                                          ullamco laboris nisi ut aliquip ex ea
                                          commodo consequat. Duis aute irure
                                          dolor in reprehenderit in voluptate
                                          velit esse cillum dolore eu fugiat
                                          nulla pariatur. Excepteur sint
                                          occaecat cupidatat non proident, sunt
                                          in culpa qui officia deserunt mollit
                                          anim id est laborum.
                                        </div>
                                      </li>
                                      <li className="mt-2">
                                        <div className=" d-flex  justifyText normal">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit, sed do
                                          eiusmod tempor incididunt ut labore et
                                          dolore magna aliqua. Ut enim ad minim
                                          veniam, quis nostrud exercitation
                                          ullamco laboris nisi ut aliquip ex ea
                                          commodo consequat. Duis aute irure
                                          dolor in reprehenderit in voluptate
                                          velit esse cillum dolore eu fugiat
                                          nulla pariatur. Excepteur sint
                                          occaecat cupidatat non proident, sunt
                                          in culpa qui officia deserunt mollit
                                          anim id est laborum.
                                        </div>
                                      </li>
                                      <li className="mt-2">
                                        <div className=" d-flex justifyText normal">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit, sed do
                                          eiusmod tempor incididunt ut labore et
                                          dolore magna aliqua. Ut enim ad minim
                                          veniam, quis nostrud exercitation
                                          ullamco laboris nisi ut aliquip ex ea
                                          commodo consequat. Duis aute irure
                                          dolor in reprehenderit in voluptate
                                          velit esse cillum dolore eu fugiat
                                          nulla pariatur. Excepteur sint
                                          occaecat cupidatat non proident, sunt
                                          in culpa qui officia deserunt mollit
                                          anim id est laborum.
                                        </div>
                                      </li> */}
                                    </ol>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <p />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <img src="https://img.freepik.com/free-vector/tiny-people-searching-business-opportunities_74855-19928.jpg" height={300} width={500} className="my-5 d-block m-auto" /> */}
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
