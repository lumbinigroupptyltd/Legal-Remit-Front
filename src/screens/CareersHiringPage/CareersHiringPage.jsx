import React, { useEffect, useState } from "react";
import "./CareersHiringPage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Button, Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import flight from "../../assets/images/flight.svg";
import lumbi from "../../assets/images/notice.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import JobVector from '../../assets/images/man-search-hiring-job-online-from-laptop_1150-52728.png'
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";

export default function CareersHiringPage() {
  const navigate = useNavigate();
  const [Search, SetSearch] = React.useState("");
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [Page, SetPage] = React.useState(1);
  const [careerData, setCareerData] = useState([]);
  const [CountPage, SetCountPage] = React.useState(0);
  const [numItems, SetNumItems] = React.useState(0);

  const applyNow = (jobId) => {
    // const url = '/careers-form';
    // const newTab = window.open(url, '_blank');
    // newTab.focus();
    navigate({ pathname: "/careers-form", state: jobId });
  }

  const getAllCareerManagemnets = async () => {
    const payload = {
      "pageindex": Page,
      "pagesize": RowsPerPage,
      "searchdata": Search,
      "sortparam": "created_at",
      "sortorder": "DESC"
    }
    const getData = await axios.post(CommonConstants.BASE_URL + '/getallcareersmanagement', payload);
    if (getData.data.status == true) {
      setCareerData(getData.data.data);
      SetCountPage(getData.data.totalPageCount);
      SetNumItems(getData.data.recordCount);
    }
  }
  const handleSearch = (e) => {
    SetSearch(e.target.value);
  };
  useEffect(() => {
    getAllCareerManagemnets();
  }, [Search])
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5 my-3">
          <div className="innerAbtPage pbSt">
            <h2 className="bolder purpleText text-center pbSt">Easy Apply</h2>

            <img src={JobVector} height={300} width={500} className="img-fluid my-5 d-block m-auto" />
            <div>
              <p className="responsiveFontLarge text-justify first text-black fs-6">
                There will be four stages of the hiring process. We are transparent and clear on our process of hiring. We keep you updated on the entire process and the progress of your application. We wish you good luck.
              </p>

              <form className="search-container my-4">
                <div className="">
                  <input className="position-relative rounded-3 col-lg-4 d-flex ms-auto" type="text" id="search-bar" placeholder="Search Desired Job Title" onChange={handleSearch} />
                  <img className="img-fluid search-icon" height={50} width={50} src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" />
                </div>
              </form>

            </div>
            <div className="">
              <div className="d-flex justify-content-end my-2">
                <b className="pe-1 purpleText">{numItems}</b> Jobs found
              </div>
              <div className="border p-2 rounded-3">
                <div className="headerCareer px-2">
                  <div className="d-flex justify-content-between medium headerTableCareer my-2 border-bottom pb-2">
                    <div className="responsiveFontLarge jobTitle">
                      Job Title
                    </div>
                    <div className="responsiveFontLarge jobLocation1">
                      Location
                    </div>
                  </div>
                  {
                    careerData &&
                    careerData.map((row) => (
                      <div className="respoChildFooter dataTableCareer d-flex justify-content-between my-5 mt-4">
                        <div className="responsiveFontLarge jobTitle pointer">
                          {row.job_title}
                        </div>
                        <div className="responsiveFontLarge jobLocation pointer">
                          {row.countryName} ({row.location})
                          <Button className="btn btn-default purpleBackground medium  rounded-3 text-white w-auto px-3 mx-3 " onClick={() => applyNow(row.id)}>
                            Apply <i className="fa fa-external-link text-white pe-1"></i>
                          </Button>
                        </div>
                      </div>
                    ))
                  }
                  {/* <div className="respoChildFooter dataTableCareer d-flex justify-content-between my-5">
                    <div className="responsiveFontLarge jobTitle pointer">
                      Business Analyst
                    </div>
                    <div className="responsiveFontLarge jobLocation pointer">
                      Australia (Sydeny)
                      <Button className="btn btn-default purpleBackground medium  rounded-3 text-white w-auto px-3 mx-3 " target="_blank" onClick={applyNow}>
                        Apply <i className="fa fa-external-link text-white pe-1"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="respoChildFooter dataTableCareer d-flex justify-content-between my-5">
                    <div className="responsiveFontLarge jobTitle pointer">
                      Analyst
                    </div>
                    <div className="responsiveFontLarge jobLocation pointer">
                      Australia (Sydeny)
                      <Button className="btn btn-default purpleBackground medium  rounded-3 text-white w-auto px-3 mx-3 " target="_blank" onClick={applyNow}>
                        Apply <i className="fa fa-external-link text-white pe-1"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="respoChildFooter dataTableCareer d-flex justify-content-between my-5">
                    <div className="responsiveFontLarge jobTitle pointer">
                      Sales Analyst
                    </div>
                    <div className="responsiveFontLarge jobLocation pointer responsiveFontLarge">
                      Australia (Sydeny)
                      <Button className="btn btn-default purpleBackground medium  rounded-3 text-white w-auto px-3 mx-3 " target="_blank" onClick={applyNow}>
                        Apply <i className="fa fa-external-link text-white pe-1"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="respoChildFooter dataTableCareer d-flex justify-content-between my-5">
                    <div className="responsiveFontLarge jobTitle pointer">
                      QA Analyst
                    </div>
                    <div className="responsiveFontLarge jobLocation pointer">
                      Australia (Sydeny)
                      <Button className="btn btn-default purpleBackground medium  rounded-3 text-white w-auto px-3 mx-3 " target="_blank" onClick={applyNow}>
                        Apply <i className="fa fa-external-link text-white pe-1"></i>
                      </Button>
                    </div>
                  </div> */}
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
