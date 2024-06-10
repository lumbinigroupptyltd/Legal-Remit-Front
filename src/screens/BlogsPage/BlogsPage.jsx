import React, { useEffect, useState } from "react";
import "./BlogsPage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row, Tab, Tabs, Col, Nav } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function BlogsPage() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loadervalue, setLoaderValue] = useState(false);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isTitleExpanded, setTitleExpanded] = useState(false);

  const navigate = useNavigate();

  const blogsDetailsPage = (id, title) => {

    navigate({ pathname: "/blogsdetailspage", state: id });
    window.scrollTo(0, 0);
  };

  const getAllblogs = async (isPopular) => {
    setLoaderValue(true);
    const getData = await axios.post(
      CommonConstants.BASE_URL + "/getallblogs",
      { isPopular: isPopular }
    );
    if (getData.data.status === true) {
      const blogs = Array.isArray(getData.data.data) ? getData.data.data : [getData.data.data];
      setAllBlogs(blogs);
      setLoaderValue(false);
    }
  };



  function truncateText(text, maxLength) {
    if (text?.length > maxLength && !isDescriptionExpanded) {
      return (
        <>
          {text.substring(0, maxLength)}
          <span
            className="read-more-link text-primary"
            onClick={() => setDescriptionExpanded(true)}
          >
            Read More
          </span>
        </>
      );
    } else if (isDescriptionExpanded) {
      return (
        <>
          {text}
          <span
            className="read-more-link text-primary"
            onClick={() => setDescriptionExpanded(false)}
          >
            Read Less
          </span>
        </>
      );
    }
    return text;
  }

  useEffect(() => {
    getAllblogs(2);
    setEqualCardHeights();

  }, []);

  const setEqualCardHeights = () => {
    const cardContainers = document.querySelectorAll(".card-container");

    cardContainers.forEach((container) => {
      const cardsInRow = container.querySelectorAll(".col-lg-4");
      let maxHeight = 0;

      cardsInRow.forEach((card) => {
        const cardHeight = card.clientHeight;
        if (cardHeight > maxHeight) {
          maxHeight = cardHeight;
        }
      });

      cardsInRow.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    });
  };

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage">
            <h2 className="bolder purpleText text-center">Blogs</h2>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row className="flex-column">
                <Col sm={12}>
                  <Nav
                    variant="pills"
                    className="d-flex justify-content-center mt-3 custom-nav11"
                  >
                    <Nav.Item>
                      <Nav.Link
                        className="custom-nav-link"
                        eventKey="first"
                        onClick={() => getAllblogs(2)}
                      >
                        Show All
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        className="custom-nav-link"
                        eventKey="second"
                        onClick={() => getAllblogs(1)}
                      >
                        Popular Blogs
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="d-none">
                      <Nav.Link className="custom-nav-link" eventKey="third">
                        Recent Blogs
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={12} className="mt-3">
                  <Tab.Content className="px-0">
                    <Tab.Pane eventKey="first">
                      <section className=" my-3">
                        <div className="row">
                          <div className="col-lg-12 d-flex flex-wrap">
                            {allBlogs &&
                              allBlogs.map((row) => (
                                <div className="col-lg-4">
                                  <div
                                    className="card-container pointer"
                                    onClick={() => blogsDetailsPage(row.id)}
                                  >
                                    <div className="card-image">
                                      <img
                                        src={CommonConstants.BASE_URL+row.image}
                                        height={300}
                                        width={400}
                                        className="d-block"
                                        alt="a brand new sports car"
                                      />
                                    </div>
                                    <div className="card-body p-3 pt-2">
                                      <span className="d-none card-badge card-badge-purple my-2 mx-2 ms-0">
                                        Car design
                                      </span>
                                      <div className="purpleText medium mx-2 fs-6 d-block w-100">
                                        {row.title}
                                      </div>
                                      <small className="card-subtitle mx-2 my-2">
                                        {truncateText(row.description, 100)}
                                      </small>
                                      <div className="d-flex align-items-center w-100">
                                        <div className="card-author">
                                          <img
                                            src={CommonConstants.BASE_URL+row.image}
                                            className="img-fluid"
                                            alt="author avatar"
                                          />
                                          <div className="author-info">
                                            <p className="author-name">
                                              {row.userName ? row.userName : "John Doe"}
                                            </p>
                                            <p className="post-timestamp">
                                              {moment(row.createdAt).format(
                                                "MMMM DD, YYYY"
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="d-flex ms-auto align-items-center">
                                          <i className="fa fa-eye purpleText"></i>
                                          <div className="ps-2 count">
                                            {row.totalViewsCount}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </section>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
                <Col sm={12} className="mt-3">
                  <Tab.Content className="px-0">
                    <Tab.Pane eventKey="second">
                      <section className=" my-3">
                        <div className="row">
                          <div className="col-lg-12 d-flex flex-wrap">
                            {allBlogs &&
                              allBlogs.map((row) => (
                                <div className="col-lg-4">
                                  <div
                                    className="card-container pointer"
                                    onClick={() => blogsDetailsPage(row.id)}
                                  >
                                    <div className="card-image">
                                      <img
                                        src={CommonConstants.BASE_URL+row.image}
                                        height={300}
                                        width={400}
                                        className="d-block"
                                        alt="a brand new sports car"
                                      />
                                    </div>
                                    <div className="card-body p-3 pt-2">
                                      <span className="d-none card-badge card-badge-purple my-2 mx-2 ms-0">
                                        Car design
                                      </span>
                                      <div className="purpleText medium mx-2 fs-6 d-block w-100">
                                        {row.title}
                                      </div>
                                      <small className="card-subtitle mx-2 my-2">
                                        {truncateText(row.description, 100)}
                                      </small>
                                      <div className="d-flex align-items-center w-100">
                                        <div className="card-author">
                                          <img
                                            src={CommonConstants.BASE_URL+row.image}
                                            className="img-fluid"
                                            alt="author avatar"
                                          />
                                          <div className="author-info">
                                            <p className="author-name">
                                              {row.userName ? row.userName : "John Doe"}
                                            </p>
                                            <p className="post-timestamp">
                                              {moment(row.createdAt).format(
                                                "MMMM DD, YYYY"
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="d-flex ms-auto align-items-center">
                                          <i className="fa fa-eye purpleText"></i>
                                          <div className="ps-2 count">
                                            {row.totalViewsCount}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </section>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
