import React, { useState, useRef, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  ContentState,
  convertFromHTML,
} from "draft-js";
import {
  Form,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";
import ModalComponent from "../../../ModalComponent";
import Loader from "../../../../Loader/Loader";
import { useNavigate } from "react-router-dom";

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

export default function EditReviews(props) {
  const [title, settitle] = useState("");
  const [enabled, setenabled] = useState(false);
  const [id, setId] = useState(props.location.state);
  const [showHide, setshowHide] = useState(null);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);
  const [combinedContent, setCombinedContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState(false);
  const [logo, setLogo] = useState(null);
  const [source, setSource] = useState("");
  const [star, setStar] = useState(5);
  const [getLogo, setGetLogo] = useState();


  const editor = useRef("");
  const navigate = useNavigate();


  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setCombinedContent(editorState.getCurrentContent().getPlainText());
  };

  const getReviewById = async () => {
    try {
      const res = await axios.post(CommonConstants.BASE_URL + '/getreviewbyid', { "id": id });
      if (res.data.status == true) {
        const selectedData = res.data.data;
        settitle(selectedData.name);
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(selectedData.message))));
        setStar(selectedData.star);
        setSource(selectedData.source);
        setGetLogo(selectedData.image);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const hanndleSubmit = async () => {
    if (id) {
      const plainText = editorState.getCurrentContent().getPlainText();
      if (!title || !(combinedContent || plainText)) {
        setError(true);
      } else {
        const userId = localStorage.getItem("Id");
        const payload = new FormData();
        payload.append("data", JSON.stringify({
          "id": id,
          "message": combinedContent || plainText,
          "name": title,
          "star": star,
          "source": source,
          "createdBy": userId,
          "updatedBy": userId
        }));

        payload.append("image", logo); //updatereview
        await axios.post(CommonConstants.BASE_URL + "/updatereview", payload).then((responce) => {
          if (responce.data.status == true) {
            navigate("/reviews");
          }
        }).catch(Error => console.log(Error));
      }
    } else {
      if (!title || !combinedContent || !star || !source) {
        setError(true);
      } else {
        const userId = localStorage.getItem("Id");
        const payload = new FormData();
        payload.append("data", JSON.stringify({
          "name": title,
          "message": combinedContent,
          "star": star,
          "source": source,
          "createdBy": userId,
          "updatedBy": userId
        }));
        payload.append("image", logo)
        await axios.post(CommonConstants.BASE_URL + "/savereview", payload).then((responce) => {
          if (responce.data.status == true) {
            navigate("/reviews");
          }
        }).catch(Error => console.log(Error));
      }
    }
  };

  useEffect(() => {
    setshowHide(props.location.state);
    if (id) {
      getReviewById();
    }
  }, [id]);
  return (
    <div>
      <div>
        <div className="container-fluid" onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
          {loadervalue == true ? <Loader /> : ""}
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-black rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Reviews
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Form id="notificationCheck">
                  <Row>
                    <Form.Group
                      className="mb-3 row d-flex"
                      controlId="formBasicEmail"
                    >
                      <div className="col-lg-12">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          value={title}
                          className="required"
                          onChange={(e) => {
                            const alphabeticValue = e.target.value.replace(/[^A-Za-z\s]/g, "");
                            settitle(alphabeticValue);
                          }}
                        />
                        {error && !title && <small className="text-danger error_message ms-2"> Please Enter Name</small>}
                      </div>
                    </Form.Group>
                  </Row>
                  {(getLogo || logo) && <img src={logo ? URL.createObjectURL(logo) : getLogo} alt="" className="paymentImage mb-3 mt-3" />}
                  <Row className="mb-0 mt-3">
                    <Form.Group controlId="formGridCity" className="border-0">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control
                        type="file"
                        className="w-auto rounded-0 pt-2 border-0 required"
                        accept="image/*"
                        onChange={(e) => setLogo(e.target.files[0])}
                      />
                      {/* {error && !logo && <small className="text-danger error_message ms-2"> Please Select Logo</small>} */}
                    </Form.Group>
                  </Row>

                  <Row className="my-4 ">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Source</Form.Label>
                      <Form.Select value={source} onChange={(e) => setSource(e.target.value)} >
                        <option value="">Select Source</option>
                        <option value="AppStore">App Store</option>
                        <option value="PlayStore">Play Store</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Web">Web</option>
                      </Form.Select>
                      {error && !source && <small className="text-danger error_message ms-2"> Please Select Source</small>}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Star</Form.Label>
                      <Form.Select value={star} onChange={(e) => setStar(e.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Select>
                      {error && !star && <small className="text-danger error_message ms-2"> Please Select Start</small>}
                    </Form.Group>
                  </Row>

                  <Form.Group className="mt-4">
                    <Form.Label>Review</Form.Label>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="email-editor-wrapper"
                      editorClassName="email-editor-content"
                      onEditorStateChange={handleEditorChange}
                      toolbar={toolbar} // Use the custom toolbar configuration
                    />
                    {error && !combinedContent && <small className="text-danger error_message ms-2"> Please Enter Message</small>}
                  </Form.Group>

                  <div className="row d-flex ms-auto mt-3">
                    <a
                      style={{ background: "#AA2AE1" }}
                      className="w-auto px-3 rounded btn text-white bolder"
                      onClick={() => hanndleSubmit()}
                    >
                      {id ? "Update" : "Create"}
                    </a>

                    <a
                      className="w-auto px-3 btn btn-default ms-3 text-black bolder border 2"
                      onClick={() => navigate("/reviews")}
                    >
                      {" "}
                      Cancel
                    </a>
                  </div>
                </Form>
                <ModalComponent
                  show={modalShowEdit}
                  title1={"Notification Template updated successfully"}
                  onHide={() => setModalShowEdit(false)}
                />
                <ModalComponent
                  show={modalShowAdd}
                  title11={"Notification Template added successfully"}
                  onHide={() => setModalShowAdd(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
