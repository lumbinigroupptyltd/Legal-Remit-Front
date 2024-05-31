import React, { useState, useRef, useMemo, useEffect } from "react";
import PageHeader from "../../../../../components/PageHeader";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './AddFAQContent.css'
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
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";

import ModalComponent from "../../../ModalComponent";
import Loader from "../../../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
// const validator = require("../../../../../assets/js/validator")

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


export default function AddFAQContent(props) {
  const [title, settitle] = useState("");
  const [id, setId] = useState(props.location.state);
  const [showHide, setshowHide] = useState(null);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);
  const [combinedContent, setCombinedContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);

  const editor = useRef("");
  const navigate = useNavigate();


  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setCombinedContent(editorState.getCurrentContent().getPlainText());
  };

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    if (/^[A-Za-z\s]+$/.test(inputValue) || inputValue === '') {
      settitle(inputValue);
    }
  };
  const getFaqById = async () => {
    try {
      const getData = await axios.post(CommonConstants.BASE_URL + '/getfaqbyid', { "id": id });
      if (getData.data.status == true) {
        const receiveData = getData.data.data;
        settitle(receiveData.question);
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(receiveData.answer))));
      }
    } catch (error) {
      console.log(error);
    }
  }
  const addFAQContent = () => {
    if (id) {
      const plainText = editorState.getCurrentContent().getPlainText();
      if (!title || !(combinedContent || plainText)) {
        setError(true);
      } else {
        const requsetData = {
          id: id,
          question: title,
          answer: combinedContent || plainText,
          sortorderNumber: sortOrder
        }
        axios.post(CommonConstants.BASE_URL + "/editfaqbyid", requsetData).then((responce) => {
          if (responce.data.status == true) {
            navigate("/faq-content");
          }
        }).catch(error => console.log(error));
      }
    } else {
      if (!title || !combinedContent) {
        setError(true);
      } else {
        const requsetData = {
          question: title,
          answer: combinedContent,
          sortorderNumber: sortOrder
        }
        axios.post(CommonConstants.BASE_URL + "/savefaq", requsetData).then((responce) => {
          if (responce.data.status == true) {
            setCombinedContent("");
            settitle("");
            navigate("/faq-content");
          }
        }).catch(error => console.log(error));
      }
    }

  };
  const getSortOrder = async () => {
    const getData = await axios.get(CommonConstants.BASE_URL + '/getmaxsortorderfaq');
    if (getData.data.status == true) {
      setSortOrder(getData.data.data);
    }
  }
  useEffect(() => {
    setshowHide(props.location.state);
    if (id) {
      getFaqById();
    }
    getSortOrder();
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
                {id ? "Update" : "Add"} FAQ
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Form id="notificationCheck">

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Question"
                      value={title}
                      onChange={(e) => settitle(e.target.value)} //handleTitleChange
                      className="required"
                    />
                    {error && !title && <small className="responsiveFontLarge  text-danger" >Please Enter Question</small>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Answer</Form.Label>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="email-editor-wrapper"
                      editorClassName="email-editor-content"
                      onEditorStateChange={handleEditorChange}
                      toolbar={toolbar} // Use the custom toolbar configuration
                    />
                    {error && !combinedContent && <small className="responsiveFontLarge  text-danger error_message ms-2 error" >Please Enter Answer</small>}
                  </Form.Group>

                  <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                    <Form.Label>Sort Order</Form.Label>
                    <Form.Control
                      type="tel"
                      maxLength="11"
                      minLength="6"
                      name="phoneNumber"
                      placeholder="Sort Order"
                      value={sortOrder}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "");
                        setSortOrder(numericValue)
                      }}
                      className="required"
                    />
                  </Form.Group>
                  <div className="row d-flex ms-auto mt-3">
                    <a
                      style={{ background: "#AA2AE1" }}
                      className="w-auto px-3 rounded btn text-white bolder"
                      onClick={addFAQContent}
                    >
                      {id ? "Update" : "Create"}
                    </a>
                    <a
                      className="w-auto px-3 btn btn-default ms-3 text-black bolder border 2"
                      onClick={() => navigate("/faq-content")}
                    > Cancel
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
