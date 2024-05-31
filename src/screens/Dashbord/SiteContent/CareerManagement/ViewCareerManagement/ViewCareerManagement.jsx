import React, { useState, useRef, useMemo, useEffect } from "react";
import PageHeader from "../../../../../components/PageHeader";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./ViewCareerManagement.scss";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  convertFromHTML,
} from "draft-js";
import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";

import Loader from "../../../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Grid,
  Chip,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

// const validator = require("../../../../../assets/js/validator");

const toolbar = {
  options: [
    "inline",
    "blockType",
    "list",
    "textAlign",
    "history",
    "fontFamily",
    "colorPicker",
    "emoji",
  ],
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  // blockType: {
  //   inDropdown: true,
  //   options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6",],
  // },
  colorPicker: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)",
    ],
  },
  emoji: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      "😀",
      "😁",
      "😂",
      "😃",
      "😉",
      "😋",
      "😎",
      "😍",
      "😗",
      "🤗",
      "🤔",
      "😣",
      "😫",
      "😴",
      "😌",
      "🤓",
      "😛",
      "😜",
      "😠",
      "😇",
      "😷",
      "😈",
      "👻",
      "😺",
      "😸",
      "😹",
      "😻",
      "😼",
      "😽",
      "🙀",
      "🙈",
      "🙉",
      "🙊",
      "👼",
      "👮",
      "🕵",
      "💂",
      "👳",
      "🎅",
      "👸",
      "👰",
      "👲",
      "🙍",
      "🙇",
      "🚶",
      "🏃",
      "💃",
      "⛷",
      "🏂",
      "🏌",
      "🏄",
      "🚣",
      "🏊",
      "⛹",
      "🏋",
      "🚴",
      "👫",
      "💪",
      "👈",
      "👉",
      "👉",
      "👆",
      "🖕",
      "👇",
      "🖖",
      "🤘",
      "🖐",
      "👌",
      "👍",
      "👎",
      "✊",
      "👊",
      "👏",
      "🙌",
      "🙏",
      "🐵",
      "🐶",
      "🐇",
      "🐥",
      "🐸",
      "🐌",
      "🐛",
      "🐜",
      "🐝",
      "🍉",
      "🍄",
      "🍔",
      "🍤",
      "🍨",
      "🍪",
      "🎂",
      "🍰",
      "🍾",
      "🍷",
      "🍸",
      "🍺",
      "🌍",
      "🚑",
      "⏰",
      "🌙",
      "🌝",
      "🌞",
      "⭐",
      "🌟",
      "🌠",
      "🌨",
      "🌩",
      "⛄",
      "🔥",
      "🎄",
      "🎈",
      "🎉",
      "🎊",
      "🎁",
      "🎗",
      "🏀",
      "🏈",
      "🎲",
      "🔇",
      "🔈",
      "📣",
      "🔔",
      "🎵",
      "🎷",
      "💰",
      "🖊",
      "📅",
      "✅",
      "❎",
      "💯",
    ],
  },
  list: {
    inDropdown: true,
    options: ["unordered", "ordered"],
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  textAlign: {
    inDropdown: true,
    options: ["left", "center", "right", "justify"],
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: false,
    defaultTargetOption: "_blank",
  },
  history: {
    inDropdown: false,
    options: ["undo", "redo"],
  },
};

export default function ViewCareerManagement(props) {

  const [id, setId] = useState(props.location.state);
  const [loadervalue, setloadervalue] = useState(false);
  const [activeTab, setActiveTab] = useState("pills-home");
  const [applicationData, setApplicationData] = useState([]);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const getAllApplications = async () => {
    const getData = await axios.post(CommonConstants.BASE_URL + '/getcareersapplicantsbycareerid', { "careerId": id });
    if (getData.data.status == true) {
      setApplicationData(getData.data.data);
    }
  }
  const handleDownloadClick = (resumeUrl) => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'resume.pdf'; // You can set the desired filename here
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    if (id) {
      getAllApplications();
    }
  }, [])
  return (
    <div>
      <div>
        <div className="container-fluid" onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
          {loadervalue == true ? <Loader /> : ""}
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-black rounded-2">
              <h3 className="text-black px-4 mx-1  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Business Analyst
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <div>
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li
                      className={`nav-item mb-1 py-2  pointer ${activeTab === 1 ? "active" : ""
                        }`}
                      id="pills-home-tab"
                      data-toggle="pill"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected={activeTab === "pills-home"}
                      onClick={() => handleTabClick("pills-home")}
                    >
                      <a
                        className={`nav-link mainPill  py-3  ${activeTab === 1 ? "mainPillActive active" : ""
                          }`}
                      >
                        <i className="fa fa-user mr-3" />
                        Applicants Info
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content px-0" id="pills-tabContent">
                    <div
                      className={`tab-pane fade show ${activeTab === "pills-home" ? "active" : ""
                        }`}
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <table className="table-responsive">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Resume</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            applicationData &&
                              applicationData.length > 0 ?
                              (applicationData.map((row) => (
                                <tr>
                                  <td>{row.firstName + " " + row.lastName}</td>
                                  <td>{row.email}</td>
                                  <td>{row.phone}</td>
                                  <td>
                                    <div className="pointer">
                                      <DownloadForOfflineIcon className="purpleText" title="Download Resume" onClick={() => handleDownloadClick(row.resume)} />
                                    </div>
                                  </td>
                                </tr>
                              )))
                              : <td colSpan={7}><p className="text-center mt-3">No Applicants Data Found</p></td>
                          }
                        </tbody>
                      </table>
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
