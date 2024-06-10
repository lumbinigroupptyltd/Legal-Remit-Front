import React from "react";
import "./AgentsPage.scss";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import searchMan from "../../assets/images/searchman.svg";
export default function AgentsPage() {
  return (
    <>
      <section className="abtPage statementSec responsiveMainForMobile">
      <NavBar></NavBar>
        <Container className="pb-5 mb-5 bg-white py-2 px-5 rounded-4">
          <div className="innerAbtPage pb-0">
            <h2 className="bolder purpleText text-center">Agents</h2>
          </div>

          <div className="filter-section py-4 pt-0">
            <Row className="my-4">
              <div className="">
                <div className="right-inner-addon input-container ">
                  <img src={searchMan} className="searchMain" />
                  <input
                    type="text"
                    className="form-control purpleTextV py-4"
                    placeholder="Search recipient"
                  />
                </div>
              </div>
            </Row>
          </div>
          <div className="tableContainer">
            <Table className="overflowYscrollResp">
              <thead>
                <tr>
                  <th className="customTh py-4 px-2 border-left">
                    Delivery Date
                  </th>
                  <th className="customTh py-4 px-2">Branch</th>
                  <th className="customTh py-4 px-2">Name</th>
                  <th className="customTh py-4 px-2"> City</th>
                  <th className="customTh py-4 px-2"> District</th>
                </tr>
              </thead>
              <tbody>
                <tr className="customTr">
                  <td className="text-center">SANPHEBAGAR</td>
                  <td className="text-center">
                    AGRICULTURAL DEVELOPMENT BANK LTD
                  </td>
                  <td className="text-center">SANPHEBAGAR ACHHAM</td>
                  <td className="text-center">Achham</td>
                  <td className="text-center">Achham</td>
                </tr>
                <tr className="customTr">
                  <td className="text-center">SANPHEBAGAR</td>
                  <td className="text-center">
                    AGRICULTURAL DEVELOPMENT BANK LTD
                  </td>
                  <td className="text-center">SANPHEBAGAR ACHHAM</td>
                  <td className="text-center">Achham</td>
                  <td className="text-center">Achham</td>
                </tr>

                <tr className="customTr">
                  <td className="text-center">SANPHEBAGAR</td>
                  <td className="text-center">
                    AGRICULTURAL DEVELOPMENT BANK LTD
                  </td>
                  <td className="text-center">SANPHEBAGAR ACHHAM</td>
                  <td className="text-center">Achham</td>
                  <td className="text-center">Achham</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Container>
      <Footer></Footer>
      </section>
    </>
  );
}
