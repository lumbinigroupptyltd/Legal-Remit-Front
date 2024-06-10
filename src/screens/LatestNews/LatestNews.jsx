import React, { useState, useEffect } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LatestNews.css";
import { CommonConstants } from "../../Constants/common.constants";
// import News1 from "../../../Assets/Images/News-1.png";
// import News2 from "../../../Assets/Images/News-2.png";
// import News3 from "../../../Assets/Images/News-3.png";

const apiKey = "71fc1cdfa4fcbfaece15ab70bc4ce4df";
const query = "business"; // You can customize the query based on your needs.
const url = `https://gnews.io/api/v4/search?q=${query}&token=${apiKey}&lang=en`;


export default function LatestNews() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [Page, SetPage] = React.useState(1);
  const [numItems, SetNumItems] = React.useState(0);
  const [Search, SetSearch] = React.useState("");
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );

  const fetchNews = async () => {
    try {
      const sendData = {
        "pageindex": Page,
        "pagesize": RowsPerPage,
        "searchdata": Search,
        "sortparam": "created_at",
        "sortorder": "DESC"
      }
      const response = await axios.post(CommonConstants.BASE_URL + '/getallnews', sendData);
      if (response.data.status == true) {
        setNewsArticles(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching news articles:", error);
    }
  };

  useEffect(() => {
    fetchNews();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  };

  const getSlidesToShow = () => {
    if (windowWidth <= 768) {
      return 1; // Number of slides to show for window widths less than or equal to 768px (mobile devices)
    } else if (windowWidth <= 1400) {
      return 2; // Number of slides to show for window widths less than or equal to 1400px (larger mobile devices/tablets)
    } else {
      return 3; // Number of slides to show for window widths greater than 1400px (desktop)
    }
  };

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      />
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" , color:"black"}}
        onClick={onClick}
      />
    );
  }

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    // arrows: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />

  };

  return (
    <div className="bg-white body pagepadding pt-4">
      <Container className="mb-2">
        <div className="normaldivpadding capitalize textColorInfo text-center ">
          <h2 className="h1AfterFAQ responsiveFontLargeMedium">Latest News</h2>

        </div>

        <Slider {...settings}>
          {newsArticles?.map((article, index) => (
            <div key={index} className="slider-item">
              <a
                href={article?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                <Card className="news shadow-none">
                  <Image src={article?.image} height="300" width="400" />
                  <span className="textColorInfo text-start px-3 mt-3 d-flex">
                    <small className="bolder">
                      <small className="NewsDate ps-2 text-black">
                        {new Date(article?.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </small>
                    </small>
                  </span>
                  <span></span>
                  <Card.Title className="bolder text-start px-3 py-3 purpleText">
                    {truncateString(article?.title, 50)}
                  </Card.Title>
                  <Card.Text className="textColorDefault text-start px-3">
                    <small className="normal fs-6">
                      {truncateString(
                        article?.description.replace(/<[^>]+>/g, ""),
                        100
                      )}
                    </small>
                  </Card.Text>
                </Card>
              </a>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
}
