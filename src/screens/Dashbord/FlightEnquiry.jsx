import React from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import {
  onPressSecuritySystem,
  onPressMainGate,
  onPressSwitchBordButton,
  onPressOutSwitchBordButton,
  onPressAppliencesSwitchBordButton,
  onPressSwitchBordDropDown,
  onPressOutdoorDropDown,
  onPressSwithOnAllOut,
  onPressAllOffLightOut,
  onPressSwithOnAllIn,
  onPressAllOffLightIn,
} from "../../redux/actions";

class FlightEnquiry extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const {
      isSecuritySystem,
      isMaingate,
      switchBoardSwitch,
      switchOutBoardSwitch,
      switchAppliencesBoardSwitch,
      isIndoorDropdown,
      isOutdoorDropdown,
    } = this.props;
    return (
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div>
            <div className="container-fluid">
              <PageHeader
                HeaderText=" Flight Enquiry"
                Breadcrumb={[
                  { name: "Dashboard", navigate: "" },
                  { name: "IoT Dashboard", navigate: "" },
                ]}
              />
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                  <div className="card">
                    <div className="body project_report">
                      <div className="table-responsive">
                        <div className="row"></div>
                        <div className="d-flex justify-content-between">
                          <div className="filter-row pb-2 ">
                            Show Entries &nbsp; &nbsp;
                            <select className="pl-2 pr-2 border-secondary">
                              <option value="0">1</option>
                              <option value="1">2</option>
                              <option value="2">3</option>
                            </select>
                          </div>
                          <div className="form-group d-flex align-items-center">
                            <label className="mb-0">Search: </label>{" "}
                            &nbsp;&nbsp;
                            <input
                              type="text"
                              className="form-control p-0"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <table className="table m-b-0 ">
                          <thead className="thead-light">
                            <tr>
                              <th>Name</th>
                              <th>Trip</th>
                              <th>Seats</th>
                              <th>Date</th>
                              <th>Recieved</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>John Doe</td>
                              <td className="project-title">
                                <h6>
                                  <a>hasil paudyal</a>
                                </h6>
                              </td>

                              <td>273492791</td>

                              <td>2022-11-26 03:28:52</td>
                              <td>2022-11-26 03:28:52</td>

                              <td className="project-actions">
                                  <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                    <i className="fa fa-edit "></i>
                                  </a>{" "}
                                  &nbsp;
                                  <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                    <i className="fa fa-trash" style={{ color: "red" }}></i>
                                  </a>
                                </td>
                            </tr>
                            <tr>
                              <td>maria Doe</td>
                              <td className="project-title">
                                <h6>
                                  <a>hasil paudyal</a>
                                </h6>
                              </td>

                              <td>273492791</td>
                              <td>Albert Street Auckland</td>
                              <td>Albert Street Auckland</td>


                              <td className="project-actions">
                                  <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                    <i className="fa fa-edit "></i>
                                  </a>{" "}
                                  &nbsp;
                                  <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                    <i className="fa fa-trash" style={{ color: "red" }}></i>
                                  </a>
                                </td>
                            </tr>
                            <tr>
                              <td>Alex Doe</td>
                              <td className="project-title">
                                <h6>
                                  <a>hasil paudyal</a>
                                </h6>
                              </td>

                              <td>273492791</td>
                              <td>Albert Street Auckland</td>
                              <td>Albert Street Auckland</td>


                              <td className="project-actions">
                                  <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                    <i className="fa fa-edit "></i>
                                  </a>{" "}
                                  &nbsp;
                                  <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                    <i className="fa fa-trash" style={{ color: "red" }}></i>
                                  </a>
                                </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-between pt-4 mr-4">
                          <div className="filter-row pt-2">
                            {/* Showing 1 to 51 of 184 entries */}
                          </div>
                          <div className="form-group d-flex align-items-center">
                            <ul id="pagination">
                              <li>
                                <a href="#">«</a>
                              </li>
                              <li>
                                <a href="#">1</a>
                              </li>
                              <li>
                                <a href="#" className="">
                                  2
                                </a>
                              </li>
                              <li>
                                <a href="#">3</a>
                              </li>
                              <li>
                                <a href="#">4</a>
                              </li>
                              <li>
                                <a href="#">5</a>
                              </li>
                              <li>
                                <a href="#">6</a>
                              </li>
                              <li>
                                <a href="#">7</a>
                              </li>
                              <li>
                                <a href="#">»</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, {
  onPressSecuritySystem,
  onPressMainGate,
  onPressSwitchBordButton,
  onPressOutSwitchBordButton,
  onPressAppliencesSwitchBordButton,
  onPressSwitchBordDropDown,
  onPressOutdoorDropDown,
  onPressSwithOnAllOut,
  onPressAllOffLightOut,
  onPressSwithOnAllIn,
  onPressAllOffLightIn,
})(FlightEnquiry);
