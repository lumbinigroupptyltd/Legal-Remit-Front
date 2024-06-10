import React, { useState, useRef, useMemo, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './notification.css'
import { EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import JoditEditor from "jodit-react";
import axios from "axios";
import { CommonConstants } from "../../../Constants/common.constants";
import ModalComponent from "../ModalComponent";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
// const validator = require("../../../assets/js/validator")

const toolbar = {
  options: ["inline", "blockType", "list", "textAlign", "history", "fontFamily", "colorPicker", "emoji"],
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
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
      'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
      'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
      'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
  },
  emoji: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
      '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
      '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
      '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
      '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
      '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
      '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
      '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
      '✅', '❎', '💯',
    ],
  },
  list: {
    inDropdown: true,
    options: ["unordered", "ordered"],
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
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


export default function NotificationTemplateCreate(props) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [enabled, setenabled] = useState(false);
  const [id, setId] = useState(props.location.state);
  const [showHide, setshowHide] = useState(null);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);
  const [combinedContent, setCombinedContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [Category, setCategory] = useState({});
  const [isTransaction, setIsTransaction] = useState(false);
  const [isKyc, setIsKyc] = useState(false);
  const [pushBodyMessage, setPushBodyMessage] = useState("");

  const editorGeneratedHtml = '<span data-offset-key="1egf2-0-0"><br data-text="true"></span>';


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    let selectedCategoryData = event.target.value;
    getNotificationText(selectedCategoryData);
  };
  const getNotificationText = async (value) => {
    try {
      const data = {
        "category": value.toString()
      };
      const response = await axios.post(CommonConstants.BASE_URL + "/getnotificationbycategory", data);

      if (response?.data?.status === true && response?.data?.data) {
        setId(response.data.data.id);
        const { title, description } = response.data.data;
        settitle(title);
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(description))));
      } else {
        setId(null);
        settitle(null);
        setEditorState(EditorState.createEmpty());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editor = useRef("");
  const navigate = useNavigate();
  useEffect(() => {
    setshowHide(props.location.state);
    populateData();
    const applyFontFamily = (element, fontFamily) => {
      element.style.fontFamily = fontFamily;
    };
  }, []);
  const populateData = async () => {
    setloadervalue(true);
    const payload = {
      id: id,
    };
    await axios
      .post(`${CommonConstants.BASE_URL}/getnotificationbyid`, payload)
      .then((res) => {
        settitle(res.data.data.title);
        setSelectedCategory(res.data.data.category);
        setenabled(res.data.data.isEnabled);
        setIsTransaction(res.data.data.isTransaction);
        setIsKyc(res.data.data.isKyc);
        setloadervalue(false);
        const defaultDesc = res.data.data.description
        const defaultContent = convertFromRaw({
          entityMap: {},
          blocks: [
            {
              text: defaultDesc,
              type: 'unstyled',
              entityRanges: [],
            },
          ],
        });
        const defaultEditorState = EditorState.createWithContent(defaultContent);
        setEditorState(defaultEditorState);
        setCombinedContent(defaultEditorState.getCurrentContent().getPlainText());
      })
      .catch((err) => {
        console.log("err", err);
        setloadervalue(false);
      });


  };
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setCombinedContent(editorState.getCurrentContent().getPlainText());
  };

  // const addData = async () => {
  //   if (selectedCategory == undefined || selectedCategory == "") {
  //     setError(true);
  //   } else if (title == undefined) {
  //     setError(true);
  //   } else {
  //     setloadervalue(true);
  //     const plainText = editorState.getCurrentContent().getPlainText();
  //     const payload = {
  //       category: selectedCategory,
  //       title: title,
  //       description: combinedContent || plainText,
  //       enabled: enabled,
  //       isTransaction: isTransaction,
  //       isKyc: isKyc
  //     };
  //     await axios
  //       .post(`${CommonConstants.BASE_URL}/addnotificationtemplate`, payload)
  //       .then((res) => {
  //         setModalShowAdd(true);
  //         navigate("/notification-template")
  //       })
  //       .catch((err) => {
  //         console.log("err", err);
  //         setloadervalue(false);
  //       });
  //   }

  // };

  const addData = async () => {
    if (selectedCategory == undefined || selectedCategory == "") {
      setError(true);
    } else if (title == undefined) {
      setError(true);
    } else if (id) {
      // ID is present, it means data already exists, so call editData function
      editData();
    } else {
      setloadervalue(true);
      const plainText = editorState.getCurrentContent().getPlainText();
      const payload = {
        category: selectedCategory,
        title: title,
        description: combinedContent || plainText,
        enabled: enabled,
        isTransaction: isTransaction,
        isKyc: isKyc
      };
      await axios
        .post(`${CommonConstants.BASE_URL}/addnotificationtemplate`, payload)
        .then((res) => {
          setModalShowAdd(true);
          navigate("/notification-template");
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          setloadervalue(false);
        });
    }
  };


  const editData = async () => {
    // if (validator.error_input_validation("notificationCheck")) {

      setloadervalue(true);
      const plainText = editorState.getCurrentContent().getPlainText();
      const payload = {
        id: id,
        category: selectedCategory,
        title: title,
        description: combinedContent || plainText,
        enabled: enabled,
        isTransaction: isTransaction,
        isKyc: isKyc
      };
      await axios
        .post(`${CommonConstants.BASE_URL}/updatenotificationtemplates`, payload)
        .then((res) => {
          settitle(res.data.data.title);
          setdescription(res.data.data.description);
          setenabled(res.data.data.isEnabled);
          setModalShowAdd(true);
          navigate("/notification-template")
          setloadervalue(false);
        })
        .catch((err) => {
          console.log("err", err);
          setloadervalue(false);
        });
    // }
  };

  const isKycActive = (e) => {
    const value = e.target.checked;
    setIsKyc(value);
  };

  const isTransactionActive = (e) => {
    const value = e.target.checked;
    setIsTransaction(value);
  }
  const isActiveMark = (e) => {
    const value = e.target.checked;
    setenabled(value);
  }


  const category = [
    "Account Created",
    "Account Closed",
    "Account Deleted",
    "Send Otp",
    "Forgot Password",
    "Verified Email",
    "Register Email",
    "Transaction notify",
    "Transaction submitted",
    "Transaction refund",
    "Transaction cancel",
    "Additional Document request",
    "Report of Fraud",
    "Support",
    "Refund Request",
    "Birthday Notification",
    "Request Document",
    "Contact Us"
  ]
  return (
    <div onClick={() => {
      document.body.classList.remove("offcanvas-active");
    }}>
      <div>
        <div className="container-fluid">
          {loadervalue == true ? <Loader /> : ""}
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-black rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Notification Template
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Form id="notificationCheck">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={selectedCategory} onChange={handleCategoryChange} >
                      <option value="">Select an option</option>
                      {category.map((row, index) => (
                        <option key={index} value={row}>{row}</option>
                      ))}
                    </Form.Select>
                    {error && !selectedCategory && <small className="responsiveFontLarge  text-danger" >Please select category</small>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={title}
                      className="required"
                      onChange={(e) => {
                        const alphabeticValue = e.target.value.replace(/[^A-Za-z\s]/g, "");
                        settitle(alphabeticValue)
                      }}
                    />
                    {error && !title && <small className="responsiveFontLarge  text-danger" >Please enter title</small>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="email-editor-wrapper"
                      editorClassName="email-editor-content"
                      onEditorStateChange={handleEditorChange}
                      toolbar={toolbar} // Use the custom toolbar configuration
                    />
                    {/* {error && !combinedContent && <small className="responsiveFontLarge  text-danger error_message ms-2 error" >please enter description</small>} */}
                  </Form.Group>

                  <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                    <Form.Label>Push Body Message</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={pushBodyMessage}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const textOnly = inputValue.replace(/[^A-Za-z\s]/g, ''); // Remove non-text characters
                        setPushBodyMessage(textOnly);
                      }}
                    />
                    {/* {error && !title && <small className="responsiveFontLarge  text-danger" >Please enter title</small>} */}
                  </Form.Group>
                  <div className="mt-3 d-flex">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="isActive"
                      value="true"
                      className="main-radio requiredCheckBox"
                      onChange={isActiveMark}
                      checked={enabled}
                    />
                    <label for="vehicle1" className="ms-2">
                      Active
                    </label>
                  </div>

                  <div className="mt-3 d-flex">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="isTransaction"
                      value="true"
                      className="main-radio requiredCheckBox"
                      onChange={isTransactionActive}
                      checked={isTransaction}
                    />
                    <label for="vehicle1" className="ms-2">
                      Transaction
                    </label>
                  </div>

                  <div className="mt-3 d-flex">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="isKyc"
                      value="true"
                      className="main-radio requiredCheckBox"
                      onChange={isKycActive}
                      checked={isKyc}
                    />
                    <label for="vehicle1" className="ms-2">
                      KYC
                    </label>
                  </div>

                  {showHide == true ? (
                    <div className="d-flex my-3">

                      <div
                        onClick={() => {
                          addData();
                        }}
                        style={{ background: "#AA2AE1", width: "auto" }}
                        className="rounded btn text-white bolder px-3"
                      >
                        Create
                      </div>

                      <div className="">
                        <a
                          className="btn btn-default text-black bolder border 2 mx-2"
                          onClick={() => navigate("/notification-template")}
                        > Cancel
                        </a>
                      </div>
                    </div>
                    // </Col>
                  ) : (
                    <div className="row d-flex m-auto mt-3">
                      <div className="col-lg-2 pb-4 ps-0">
                        <div
                          onClick={() => {
                            editData();
                            setModalShowEdit(true);
                          }}
                          style={{ background: "#AA2AE1", width: "100%" }}
                          className="rounded btn text-white bolder"
                        >
                          Update
                        </div>
                      </div>
                      <div className="col-lg-2 pb-4 ps-0">
                        <a
                          // href="#!"
                          className="btn btn-default ms-3 text-black bolder border 2"
                          onClick={() => navigate("/notification-template")}
                        > Cancel
                        </a>
                      </div>
                    </div>
                  )}
                </Form>
                <ModalComponent
                  show={modalShowEdit}
                  title11={"Notification Template updated successfully"}
                  onHide={() => setModalShowEdit(false)}
                />
                <ModalComponent
                  show={modalShowAdd}
                  title1={"Notification Template added successfully"}
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
